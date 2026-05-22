# Pomochan

A friendly Pomodoro timer desktop app. Built with [Tauri](https://tauri.app/) and React.

## Features

- 25-minute Pomodoro timer
- Sends a notification when timer ends
- Looks cute

## Installation

Binaries for macOS and Windows are available in the [Releases](https://github.com/nelsonr/pomochan/releases) page.

For Linux, you'll have to build it from source (see the steps below).

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [pnpm](https://pnpm.io/)
- [Rust](https://www.rust-lang.org/tools/install) (stable toolchain)
- Xcode Command Line Tools on macOS (`xcode-select --install`)

## Running in development

```bash
pnpm install
pnpm run tauri dev
```

This starts the Vite dev server and the Tauri window simultaneously, with hot reload.

## Building a release

```bash
pnpm run tauri build
```

Outputs are placed in `src-tauri/target/release/bundle/`. On macOS you'll find a `.dmg` and a `.app` bundle.

For a universal macOS binary (Intel + Apple Silicon):

```bash
pnpm run tauri build --target universal-apple-darwin
```

## macOS security warning when installing a release

When attempting to open the app for the first time, you might see a security warning.
This happens if the app has not been signed with a Developer certificate.

**To open the app anyway:**

1. Open **System Settings** and navigate down to **Security & Privacy**
2. Scroll down to the **Security** section
3. A message about the app being blocked should be visible
4. Click on the button **Open Anyway**

You only need to do this once — macOS will remember the exception.
