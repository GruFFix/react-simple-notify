# React Simple Notify

[![npm version](https://img.shields.io/npm/v/react-simple-notify.svg)](https://www.npmjs.com/package/react-simple-notify)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/react-simple-notify)](https://bundlephobia.com/package/react-simple-notify)
[![License](https://img.shields.io/npm/l/react-simple-notify.svg)](https://github.com/GruFFix/react-simple-notify/blob/main/LICENSE)

A lightweight, performant notification library for React applications.

**[Live Demo →](http://rsn.gruffix.ru/)**

## Features

- ⚡ **Lightning Fast** - Optimized performance with minimal re-renders
- 📦 **Tiny Bundle** - Only ~3.5KB gzipped, zero dependencies
- 🎨 **Fully Customizable** - Complete control over styling and animations
- 🔧 **TypeScript First** - Built with TypeScript, full type safety
- 🌐 **SSR Compatible** - Works with Next.js, Remix, and other SSR frameworks
- ⏸️ **Pause on Hover** - Auto-dismiss timer pauses when users hover
- 🎯 **Smart Positioning** - 6 built-in positions with stack management

## Installation

```bash
npm install react-simple-notify
```

```bash
yarn add react-simple-notify
```

```bash
pnpm add react-simple-notify
```

## Quick Start

```jsx
import { notify, NotifyContainers } from 'react-simple-notify';

function App() {
  const showNotification = () => {
    notify.open({
      render: ({ onClose }) => (
        <div className="notification">
          <h4>Success!</h4>
          <p>Your changes have been saved</p>
          <button onClick={onClose}>Close</button>
        </div>
      ),
    });
  };

  return (
    <>
      <button onClick={showNotification}>Show Notification</button>
      <NotifyContainers />
    </>
  );
}
```

## API Reference

### `notify.open(options)`

Opens a new notification.

#### Options

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `render` | `(args: NotifyRenderArgs) => ReactNode` | Yes | - | Render function that returns notification content |
| `id` | `string` | No | Auto-generated | Unique identifier for the notification |
| `duration` | `number` | No | `3500` | Time in ms before auto-close. Set to `0` for persistent |
| `alignment` | `NotifyAlignment` | No | `bottomLeft` | Position where notification appears |
| `pauseOnHover` | `boolean` | No | `false` | Pause auto-dismiss timer on hover |
| `data` | `any` | No | `undefined` | Custom data passed to render function |
| `dataTestId` | `string` | No | `undefined` | Test ID for targeting in tests |

#### Render Function Arguments

```typescript
interface NotifyRenderArgs {
  id: string;                    // Notification ID
  duration: number;              // Duration in ms
  alignment: NotifyAlignment;    // Position
  onClose: () => void;           // Function to close this notification
  data?: any;                    // Custom data (if provided)
  timeRemaining: number;         // Time remaining until auto-close (in ms)
}
```

#### Example

```jsx
import { notify, NotifyAlignment } from 'react-simple-notify';

notify.open({
  alignment: NotifyAlignment.topRight,
  duration: 5000,
  pauseOnHover: true,
  render: ({ onClose }) => (
    <div className="notification success">
      <span>✓ Operation completed successfully!</span>
      <button onClick={onClose}>✕</button>
    </div>
  ),
});
```

---

### `notify.update(id, options)`

Updates an existing notification by ID.

```jsx
const id = notify.open({
  duration: 0,
  data: { progress: 0 },
  render: ({ data }) => (
    <div>Loading... {data.progress}%</div>
  ),
});

// Update progress
notify.update(id, { data: { progress: 50 } });

// Update to completion
notify.update(id, {
  duration: 3000,
  render: () => <div>✓ Complete!</div>,
});
```

---

### `notify.close(id)`

Closes a specific notification by ID.

```jsx
const id = notify.open({
  render: () => <div>I can be closed programmatically</div>,
});

// Later...
notify.close(id);
```

---

### `notify.closeAll()`

Closes all active notifications.

```jsx
notify.closeAll();
```

---

### `NotifyAlignment`

Available positioning options:

```typescript
enum NotifyAlignment {
  topLeft = 'top-left',
  topRight = 'top-right',
  topCenter = 'top-center',
  bottomLeft = 'bottom-left',
  bottomRight = 'bottom-right',
  bottomCenter = 'bottom-center',
}
```

**Usage:**

```jsx
import { notify, NotifyAlignment } from 'react-simple-notify';

notify.open({
  alignment: NotifyAlignment.topCenter,
  render: () => <div>Notification at top center</div>,
});
```

---

## Global Configuration

### `config.set(props)`

Set global configuration for all notifications.

#### Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `alignment` | `NotifyAlignment` | `bottomLeft` | Default position for all notifications |
| `reverse` | `boolean` | `false` | New notifications appear at bottom of stack |
| `notifyComponent` | `React.ComponentType` | `Fragment` | Wrapper component for notification content |
| `animationConfig` | `AnimationConfig` | Default animations | Custom enter/exit animations |
| `maxNotifications` | `number` | `0` | Maximum notifications per position (0 = unlimited) |
| `pauseOnHover` | `boolean` | `false` | Global pause on hover setting |

#### Example: Basic Configuration

```jsx
import { config, NotifyAlignment } from 'react-simple-notify';

config.set({
  alignment: NotifyAlignment.topRight,
  maxNotifications: 3,
  pauseOnHover: true,
});
```

#### Example: Custom Wrapper Component

```jsx
import { config } from 'react-simple-notify';

const NotificationWrapper = ({ children }) => (
  <div className="notification-wrapper">
    {children}
  </div>
);

config.set({
  notifyComponent: NotificationWrapper,
});
```

---

### `config.reset()`

Reset configuration to default values.

```jsx
config.reset();
```

---

## Styling

### CSS Custom Properties

Customize container spacing:

```css
:root {
  --rsn-container-padding: 16px;  /* Space from screen edges */
  --rsn-container-gap: 12px;      /* Space between notifications */
}
```

### Custom Styles

Style your notifications with regular CSS:

```jsx
notify.open({
  render: () => (
    <div className="my-notification">
      <span>Custom styled notification</span>
    </div>
  ),
});
```

```css
.my-notification {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

---

## Custom Animations

Override default animations:

```jsx
import { config } from 'react-simple-notify';

config.set({
  animationConfig: {
    enter: {
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      keyframes: ({ alignment }) => [
        { opacity: 0, transform: 'translateY(-20px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
    },
    exit: {
      duration: 200,
      easing: 'ease-in',
      keyframes: () => [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0.8)' },
      ],
    },
  },
});
```

### Animation Configuration

| Property | Type | Description |
|----------|------|-------------|
| `duration` | `number` | Animation duration in milliseconds |
| `easing` | `string` | CSS easing function |
| `keyframes` | `(args) => Keyframe[]` | Function returning keyframes array |

---

## Advanced Examples

### Progress Notification

```jsx
const showProgress = () => {
  let progress = 0;

  const id = notify.open({
    duration: 0,
    data: { progress: 0 },
    render: ({ data }) => (
      <div className="notification">
        <h4>Uploading...</h4>
        <div className="progress-bar">
          <div style={{ width: `${data.progress}%` }} />
        </div>
        <p>{data.progress}%</p>
      </div>
    ),
  });

  const interval = setInterval(() => {
    progress += 10;
    if (progress > 100) {
      clearInterval(interval);
      notify.update(id, {
        duration: 3000,
        render: () => (
          <div className="notification success">
            <h4>✓ Upload Complete!</h4>
          </div>
        ),
      });
    } else {
      notify.update(id, { data: { progress } });
    }
  }, 300);
};
```

### Persistent Notification

```jsx
notify.open({
  duration: 0, // Never auto-close
  pauseOnHover: false,
  render: ({ onClose }) => (
    <div className="notification warning">
      <h4>⚠ Action Required</h4>
      <p>Please review your settings</p>
      <button onClick={onClose}>Dismiss</button>
    </div>
  ),
});
```

### Progress Bar with Auto-Close

```jsx
notify.open({
  duration: 5000,
  pauseOnHover: true,
  render: ({ onClose, timeRemaining, duration }) => {
    const progress = ((duration - timeRemaining) / duration) * 100;

    return (
      <div className="notification">
        <h4>Auto-closing notification</h4>
        <p>This will close in {Math.ceil(timeRemaining / 1000)}s</p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <button onClick={onClose}>Close now</button>
      </div>
    );
  },
});
```

### Promise-based Notification

```jsx
const saveData = async () => {
  const id = notify.open({
    duration: 0,
    render: () => <div>Saving...</div>,
  });

  try {
    await fetch('/api/save', { method: 'POST' });
    notify.close(id);
    notify.open({
      render: () => <div>✓ Saved successfully!</div>,
    });
  } catch (error) {
    notify.update(id, {
      duration: 0,
      render: ({ onClose }) => (
        <div className="notification error">
          <span>✕ Failed to save</span>
          <button onClick={onClose}>Close</button>
        </div>
      ),
    });
  }
};
```

### Limit Maximum Notifications

```jsx
import { config } from 'react-simple-notify';

config.set({
  maxNotifications: 3, // Only 3 visible at once per position
});

// Older notifications are automatically removed
for (let i = 0; i < 10; i++) {
  notify.open({
    render: () => <div>Notification {i + 1}</div>,
  });
}
// Only the last 3 will be visible
```

---

## TypeScript

Full TypeScript support included. All types are exported:

```typescript
import type {
  NotifyRenderArgs,
  NotifyOptions,
  NotifyAlignment,
  AnimationConfig,
  ConfigProps,
} from 'react-simple-notify';
```

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## License

MIT © [GruFFix](mailto:GruFFix@yandex.ru)

---

## Links

- **[Live Demo](http://rsn.gruffix.ru/)**
- **[GitHub Repository](https://github.com/GruFFix/react-simple-notify)**
- **[NPM Package](https://www.npmjs.com/package/react-simple-notify)**
- **[Report Issues](https://github.com/GruFFix/react-simple-notify/issues)**
