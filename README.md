# Lightspeed

A more functional new tab page for Chrome that lets you search across bookmarks, open tabs, and history.

From [captn3m0](https://github.com/captn3m0)'s [ideas repo](https://github.com/captn3m0/ideas#lightspeed-for-chrome).

## Install development version

1. Clone the repository

```shell
git clone https://github.com/tallpants/lightspeed.git
```

2. Install dependencies and build

```shell
cd lightspeed

# If you use Yarn
yarn
yarn build

# Or if you use npm
npm install
npm run build
```

3. Load the extension into Chrome

- Navigate to `chrome://extensions`
- Check the "Developer mode" checkbox
- Click "Load unpacked extension..."
- Select the `lightspeed` repo directory that you cloned
