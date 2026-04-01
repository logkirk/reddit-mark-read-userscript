# Reddit – Mark All Messages Read

A userscript that adds a **mark all as read** link to [old.reddit.com/message/unread](https://old.reddit.com/message/unread), letting you clear your inbox in one click.

## Features

- Adds a "mark all as read" link to the unread messages page
- Calls Reddit's own API (`/api/read_all_messages`) so messages are marked read server-side
- Visually clears the unread styling and orangered mail icon on the page
- Works only on `old.reddit.com`

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) (or [Violentmonkey](https://violentmonkey.github.io/)) in your browser
2. Click **[Install Script](reddit-mark-all-read.user.js)** or create a new script and paste the contents of `reddit-mark-all-read.user.js`
3. Navigate to [old.reddit.com/message/unread](https://old.reddit.com/message/unread) — the link appears in the menu area above your messages

## License

MIT
