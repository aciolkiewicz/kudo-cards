#!/usr/bin/env python3
"""
Kudo Cards API Client

Send kudo cards via command line interface.
Configuration stored in ~/.kudo-cards.ini

Usage:
    kudo <TO> <FOR> --from ME -c jonquil -t theBest
"""

import argparse
import configparser
import json
import random
import sys
from datetime import datetime
from pathlib import Path
from typing import Optional

import requests
from dotenv import load_dotenv
import os

def _find_and_load_env():
    # Candidates in order: current working dir, repo (git) root, package parent, then fallback
    cwd = Path.cwd()
    candidates = [
        cwd / ".env.local",
        cwd / ".env",
    ]
    # look for git root
    p = cwd
    while p != p.parent:
        if (p / ".git").exists():
            candidates.append(p / ".env.local")
            candidates.append(p / ".env")
            break
        p = p.parent
    # package-relative fallbacks (when running installed package)
    pkg_parent = Path(__file__).resolve().parent.parent
    candidates.append(pkg_parent / ".env.local")
    candidates.append(pkg_parent / ".env")

    for c in candidates:
        if c.exists():
            load_dotenv(dotenv_path=c)
            print(f"✅ Loaded env from {c}")
            return c
    # fallback: let python-dotenv search default locations (may load site-packages .env)
    loaded = load_dotenv()
    print(f"⚠️  No project .env found in candidates; load_dotenv default returned {loaded}")
    return None

_find_and_load_env()

# try package import, fallback to local import when running script directly
try:
    from kudo_cards_cli.auth import obtain_bearer_token
except Exception:
    from .auth import obtain_bearer_token


# Default card options (fallback if API is unavailable)
DEFAULT_CARD_TITLES = [
    "theBest", "congrats", "greatJob", "manyThanks",
    "amazingWork", "awesome", "impressive", "didIt"
]

DEFAULT_CARD_COLORS = [
    "jonquil", "giants-orange", "red-pantone",
    "rebecca-purple", "moon-stone", "rich-black"
]


class KudoClient:
    def __init__(self, config_file: Optional[str] = None):
        if config_file:
            self.config_file = Path(config_file)
        else:
            self.config_file = Path.home() / ".kudo-cards.ini"
        # bearer token retrieved from auth module (Auth0 client-credentials)
        self.bearer_token = None
        self.base_url = None
        self.card_titles = DEFAULT_CARD_TITLES
        self.card_colors = DEFAULT_CARD_COLORS
        self._load_config()
        # If Auth0 settings were present, try to obtain bearer token
        if getattr(self, "auth0_domain", None):
            token = obtain_bearer_token(
                getattr(self, "auth0_domain", None),
                getattr(self, "client_id", None),
                getattr(self, "client_secret", None),
                getattr(self, "auth0_audience", None),
            )
            if token:
                self.bearer_token = token
                print("✅ Obtained bearer token from Auth0")
            else:
                print("❌ Failed to obtain bearer token from Auth0")
        self._fetch_api_config()

    def _load_config(self):
        """Load configuration from config file"""
        if not self.config_file.exists():
            print(f"Error: Configuration file {self.config_file} not found.")
            print("Please create it with the following format:")
            print("""
[api]
# provide only the API base URL here
url = http://localhost:3000

[defaults]
from = Your Name
card_color = random
card_title = random

# Auth0 (machine-to-machine) configuration - used to obtain bearer token
[auth0]
domain = your-tenant.auth0.com
audience = https://your-api-audience/
client_id = your_client_id
client_secret = your_client_secret
            """)
            sys.exit(1)

        config = configparser.ConfigParser()
        config.read(self.config_file)

        try:
            # static api key removed; we expect Auth0 settings to provide a bearer token
            self.base_url = config.get('api', 'url', fallback='http://localhost:3000')

            # Load default values
            self.default_from = config.get('defaults', 'from', fallback=None)
            self.default_card_color = config.get('defaults', 'card_color', fallback='random')
            self.default_card_title = config.get('defaults', 'card_title', fallback='random')
            # Auth0 optional settings
            self.auth0_domain = os.getenv('AUTH0_DOMAIN')
            self.auth0_audience = os.getenv('AUTH0_AUDIENCE')
            self.client_id = os.getenv('AUTH0_CLIENT_ID')
            self.client_secret = os.getenv('AUTH0_CLIENT_SECRET')
            # If neither Auth0 nor a static key is present, error out
            if not getattr(self, "auth0_domain", None):
                print("Error: No authentication configured. Please add an [auth0] section.")
                sys.exit(1)
        except (configparser.NoSectionError, configparser.NoOptionError) as e:
            print(f"Error reading config file: {e}")
            sys.exit(1)

    def _fetch_api_config(self):
        """Fetch card titles and colors from the API"""
        try:
            response = requests.get(
                f"{self.base_url}/api/config",
                timeout=10
            )

            if response.status_code == 200:
                config = response.json()
                self.card_titles = config.get('cardTitles', DEFAULT_CARD_TITLES)
                self.card_colors = config.get('cardColors', DEFAULT_CARD_COLORS)
                print(f"✅ Loaded {len(self.card_titles)} card titles and {len(self.card_colors)} colors from API")
            else:
                print(f"⚠️  Failed to fetch config from API (status {response.status_code}), using defaults")
        except requests.exceptions.RequestException:
            print("⚠️  Could not connect to API for config, using default options")

    def _get_random_choice(self, choices: list, choice_type: str) -> str:
        """Get a random choice from the given list"""
        choice = random.choice(choices)
        print(f"Randomly selected {choice_type}: {choice}")
        return choice

    def send_kudo(self, to: str, for_msg: str, from_user: Optional[str] = None, gif_url: Optional[str] = None,
                  card_color: Optional[str] = None, card_title: Optional[str] = None) -> bool:
        """Send a kudo card via the API"""

        # Use config defaults if not provided
        if from_user is None:
            from_user = self.default_from

        if gif_url is None:
            gif_url = ""

        if card_color is None:
            card_color = self.default_card_color

        if card_title is None:
            card_title = self.default_card_title

        # Handle random selections
        if card_color == "random":
            card_color = self._get_random_choice(self.card_colors, "card color")
        elif card_color not in self.card_colors:
            print(f"Error: Invalid card color '{card_color}'. Available colors: {', '.join(self.card_colors)}")
            return False

        if card_title == "random":
            card_title = self._get_random_choice(self.card_titles, "card title")
        elif card_title not in self.card_titles:
            print(f"Error: Invalid card title '{card_title}'. Available titles: {', '.join(self.card_titles)}")
            return False

        # Prepare the payload
        payload = {
            "cardTitle": card_title,
            "cardColor": card_color,
            "to": to,
            "for": for_msg,
            "from": from_user or "",
            "gifUrl": gif_url or "",
            "hearts": 0,
            "created": datetime.now().isoformat()
        }

        # Make the API request
        headers = {
            "Authorization": f"Bearer {self.bearer_token or ''}",
            "Content-Type": "application/json"
        }

        try:
            response = requests.post(
                f"{self.base_url}/api/kudo-cards",
                json=payload,
                headers=headers,
                timeout=30
            )

            if response.status_code == 201:
                result = response.json()
                print(f"✅ Kudo card sent successfully!")
                print(f"Card ID: {result.get('_id', 'N/A')}")
                if result.get('_id'):
                    print(f"View card: {self.base_url}/kudo-card/{result['_id']}")
                return True
            elif response.status_code == 401:
                print("❌ Error: Unauthorized. Check your API key in ~/.kudo-cards.ini")
            elif response.status_code == 400:
                error_data = response.json()
                print(f"❌ Error: Invalid data - {error_data.get('error', 'Unknown error')}")
                if 'details' in error_data:
                    for detail in error_data['details']:
                        print(f"  - {detail.get('message', detail)}")
            elif response.status_code == 503:
                print("❌ Error: API not configured on server")
            else:
                print(f"❌ Error: {response.status_code} - {response.text}")

        except requests.exceptions.RequestException as e:
            print(f"❌ Network error: {e}")

        return False


def main():
    parser = argparse.ArgumentParser(
        description="Send kudo cards via command line",
        epilog=f"""
Default card titles: {', '.join(DEFAULT_CARD_TITLES)}
Default card colors: {', '.join(DEFAULT_CARD_COLORS)}
(Actual options will be fetched from API)

Examples:
  kudo "John Doe" "Great work on the project!"
  kudo "Jane Smith" "Thanks for your help" --from "Mike" -c jonquil -t theBest
  kudo "Jane Smith" "Thanks for your help" --from "Mike" --gif "http://example.com/cheers.gif"
  kudo "Team" "Amazing presentation!" --from "Manager" -c random -t random
  kudo "Alice" "Great debugging!" --config /path/to/custom-config.ini
        """,
        formatter_class=argparse.RawDescriptionHelpFormatter
    )

    parser.add_argument("to", nargs='?', help="Recipient of the kudo card")
    parser.add_argument("for", nargs='?', help="Message/reason for the kudo card")
    parser.add_argument("--from", dest="from_user", help="Sender name (optional)")
    parser.add_argument("--gif", dest="gif_url", help="Gif URL (optional)")
    parser.add_argument("-c", "--color", dest="card_color", default="random",
                        help="Card color (default: random)")
    parser.add_argument("-t", "--title", dest="card_title", default="random",
                        help="Card title (default: random)")
    parser.add_argument("--list-options", action="store_true",
                        help="List available card titles and colors")
    parser.add_argument("--config", dest="config_file",
                        help="Path to config file (default: ~/.kudo-cards.ini)")

    args = parser.parse_args()

    if args.list_options:
        # Initialize client to fetch options from API
        client = KudoClient(config_file=args.config_file)
        print("Available card titles:")
        for title in client.card_titles:
            print(f"  - {title}")
        print("\nAvailable card colors:")
        for color in client.card_colors:
            print(f"  - {color}")
        return

    if not args.to or not getattr(args, 'for'):
        parser.error("Both 'to' and 'for' arguments are required unless using --list-options")

    client = KudoClient(config_file=args.config_file)
    # Only pass CLI args if they were explicitly provided (not defaults)
    from_user = args.from_user if args.from_user else None
    gif_url = args.gif_url if args.gif_url else None
    card_color = args.card_color if args.card_color != "random" else None
    card_title = args.card_title if args.card_title != "random" else None

    success = client.send_kudo(
        to=args.to,
        for_msg=getattr(args, 'for'),
        from_user=from_user,
        gif_url=gif_url,
        card_color=card_color,
        card_title=card_title
    )

    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()