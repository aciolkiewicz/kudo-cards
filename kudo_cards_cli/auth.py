import requests
from typing import Optional


def obtain_bearer_token(domain: str, client_id: str, client_secret: str, audience: str,
                        timeout: int = 10) -> Optional[str]:
    """
    Obtain a machine-to-machine bearer token from Auth0 using client credentials.
    Returns the access_token string on success or None on failure.
    """
    if not all([domain, client_id, client_secret, audience]):
        return None

    token_url = f"https://{domain}/oauth/token"
    payload = {
        "grant_type": "client_credentials",
        "client_id": client_id,
        "client_secret": client_secret,
        "audience": audience
    }

    try:
        resp = requests.post(token_url, json=payload, timeout=timeout)
    except requests.exceptions.RequestException:
        return None

    if resp.status_code != 200:
        return None

    data = resp.json()
    return data.get("access_token")