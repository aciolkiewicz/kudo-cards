# Kudo Cards CLI

A command-line tool for sending appreciation cards to team members through the Kudo Cards API.

## Features

- 🎯 **Simple CLI interface** - Send kudo cards with one command
- 🔧 **Configurable defaults** - Set your preferred sender name, colors, and titles
- 🎨 **Dynamic options** - Automatically fetches available card styles from API
- 🔄 **Fallback support** - Works offline with default options
- 🔑 **Secure authentication** - API key-based authentication
- 🎲 **Random selection** - Let the tool pick random colors and titles

## Installation

### From PyPI (recommended)

```bash
pip install kudo-cards-cli
```

### From source

```bash
git clone https://github.com/yourusername/kudo-cards.git
cd kudo-cards
pip install .
```

## Configuration

Create a configuration file at `~/.kudo-cards.ini`:

```ini
[api]
# Your API key (get this from your Kudo Cards server admin)
key = your_api_key_here

# Base URL of your Kudo Cards application
url = http://localhost:3000

[defaults]
# Default sender name (optional)
from = Your Name

# Default card color (optional, use "random" for random selection)
card_color = random

# Default card title (optional, use "random" for random selection)
card_title = random
```

## Usage

### Basic usage

```bash
# Send a kudo card with random color and title
kudo "John Doe" "Great work on the project!"

# Send with specific options
kudo "Jane Smith" "Thanks for your help" --from "Mike" -c jonquil -t theBest

# Use random selection explicitly
kudo "Team" "Amazing presentation!" --from "Manager" -c random -t random
```

### Advanced usage

```bash
# Use a custom config file
kudo "Alice" "Great debugging!" --config /path/to/custom-config.ini

# List available options (fetched from API)
kudo --list-options

# Get help
kudo --help
```

### Command-line options

- `to` - Recipient of the kudo card (required)
- `for` - Message/reason for the kudo card (required)
- `--from` - Sender name (optional, uses config default)
- `-c, --color` - Card color (optional, uses config default or "random")
- `-t, --title` - Card title (optional, uses config default or "random")
- `--config` - Path to config file (default: `~/.kudo-cards.ini`)
- `--list-options` - Show available card titles and colors

## Configuration Priority

The tool uses the following priority order for configuration:

1. **Command-line arguments** (highest priority)
2. **Config file defaults** (medium priority)
3. **Built-in defaults** (lowest priority)

## Available Options

### Card Titles
- `theBest` - "You're the best!"
- `congrats` - "Congrats!"
- `greatJob` - "Great job!"
- `manyThanks` - "Many Thanks!"
- `amazingWork` - "Amazing Work!"
- `awesome` - "You're awesome!"
- `impressive` - "Impressive!"
- `didIt` - "You did it!"

### Card Colors
- `jonquil`
- `giants-orange`
- `red-pantone`
- `rebecca-purple`
- `moon-stone`
- `rich-black`

*Note: Actual options are fetched from the API at runtime. The above are fallback defaults.*

## Error Handling

The tool provides clear error messages for common issues:

- ❌ **Missing config file** - Instructions for creating one
- ❌ **Invalid API key** - Check your authentication
- ❌ **Invalid options** - Lists available colors/titles
- ⚠️ **API unavailable** - Falls back to default options
- ✅ **Success** - Shows card ID and view URL

## Examples

```bash
# Quick kudo with defaults
kudo "Sarah" "Excellent presentation today!"

# Specific styling
kudo "Development Team" "Ship it! 🚀" --from "Product Manager" -c jonquil -t amazingWork

# Using config file for different environments
kudo "Alice" "Bug fix champion" --config ~/.kudo-cards-prod.ini

# See what options are available
kudo --list-options
```

## Development

### Setting up development environment

```bash
git clone https://github.com/yourusername/kudo-cards.git
cd kudo-cards
pip install -e .
```

### Running tests

```bash
python -m pytest
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
- 🐛 [Report bugs](https://github.com/yourusername/kudo-cards/issues)
- 📚 [Documentation](https://github.com/yourusername/kudo-cards#readme)
- 💬 [Discussions](https://github.com/yourusername/kudo-cards/discussions)