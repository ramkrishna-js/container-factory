<div align="center">
  <br />
  <p>
    <a href="https://discord.js.org"><img src="https://discord.js.org/static/logo.svg" width="546" alt="discord.js" /></a>
  </p>
  <br />

  # 📦 Container Factory

  **A robust, lightweight utility for building Discord Components v2**

  [![NPM Version](https://img.shields.io/npm/v/container-factory?style=for-the-badge)](https://www.npmjs.com/package/container-factory)
  [![Downloads](https://img.shields.io/npm/dt/container-factory?style=for-the-badge)](https://www.npmjs.com/package/container-factory)
  [![License](https://img.shields.io/npm/l/container-factory?style=for-the-badge)](https://github.com/ramkrishna/container-factory/blob/master/LICENSE)
</div>

<div align="center">
  <h3>
    <a href="#-installation">Installation</a>
    <span> | </span>
    <a href="#-features">Features</a>
    <span> | </span>
    <a href="#-usage">Usage</a>
    <span> | </span>
    <a href="#-examples">Examples</a>
  </h3>
</div>

---

## 📖 About

**Container Factory** abstracts the complexity of Discord's new **Components v2** architecture (Containers, Sections, TextDisplay, etc.) into a fluent, type-safe API. Built on top of `discord.js`, it allows you to construct beautiful, rich interfaces for your bots with minimal boilerplate.

## ✨ Features

- 🧩 **Complete v2 Support**
  - Containers, Sections, Separators
  - Text Display Components
  - Media Galleries & Files
- 🎨 **Fluent API Design**
  - Intuitive helper functions for every component
  - Chainable builders
- 🖼️ **Media Galleries**
  - Create scrolling carousels with ease
- 🔘 **Interactive Components**
  - Buttons, Link Buttons, Labels
  - Advanced Select Menus (String, User, Role, Channel, Mentionable)
- 🪶 **Zero Dependencies**
  - Lightweight and focused purely on UI construction

## 📥 Installation

```bash
npm install container-factory
```
> **Note:** Requires `discord.js` v14.25.1 or newer.

## 🚀 Usage

```javascript
import { createText, buildContainer, createMessagePayload } from 'container-factory';

// 1. Create components
const helloProps = createText("👋 **Welcome to Container Factory!**");

// 2. Build the container
const container = buildContainer(helloProps);

// 3. Send it
await channel.send(createMessagePayload(container));
```

## 💡 Examples

### Rich Section with Accessories
```javascript
import { createSection, createButton, buildContainer } from 'container-factory';

const settingsBtn = createButton('settings', '⚙️');
const section = createSection("**User Settings**\nManage your preferences here.", settingsBtn);

await channel.send(createMessagePayload(buildContainer(section)));
```

### Media Gallery (Carousel)
```javascript
import { createMediaGallery, buildContainer } from 'container-factory';

const gallery = createMediaGallery([
    'https://example.com/slide1.png',
    'https://example.com/slide2.png'
], "Project Showcase");

await channel.send(createMessagePayload(buildContainer(gallery)));
```

## 🤝 Contributing

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/container-factory.git`
3. Create your feature branch: `git checkout -b my-new-feature`
4. Commit your changes: `git commit -am 'Add some feature'`
5. Push to the branch: `git push origin my-new-feature`
6. Submit a pull request

## 👤 Developer

**Ramkrishna**
- Github: [@ramkrishna](https://github.com/ramkrishna)

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

<div align="center">
  <br />
  <p>Made with ❤️ by <b>Ramkrishna</b></p>
</div>
