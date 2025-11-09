![Logo](https://repository-images.githubusercontent.com/765200491/0b4162c0-8e67-4b8d-9d53-58b50c65c0f3)

### [DEMO](http://rsn.gruffix.ru/)

# React Simple Notify

A lightweight, flexible notification library for React applications.

## Features

- 🚀 **Lightweight** - Minimal bundle size
- 🎨 **Customizable** - Full control over styling and animations
- ⚡ **SSR Compatible** - Works with Next.js, Remix, and other SSR frameworks
- 📦 **TypeScript** - Full type safety out of the box
- 🎭 **Flexible Positioning** - 6 built-in positions
- ⏱️ **Auto-dismiss** - Configurable duration or persistent notifications

---

## Installation

```bash
npm install react-simple-notify
# or
yarn add react-simple-notify
# or
pnpm add react-simple-notify
```

---

## Quick Start

### Basic Usage

```jsx
import { notify, NotifyContainers } from 'react-simple-notify';

function App() {
  const showNotification = () => {
    notify.open({
      render: ({ onClose }) => (
        <div className="notification">
          <p>This is a notification!</p>
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

export default App;
```

---

## API Reference

### `notify.open(options)`

Opens a new notification.

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `render` | `Function` | Yes | - | Render function that returns notification content. Receives `NotifyRenderArgs` as argument. |
| `id` | `string` | No | Auto-generated | Unique identifier for the notification. |
| `duration` | `number` | No | `3500` | Time in milliseconds before auto-close. Set to `0` for persistent notifications. |
| `alignment` | `NotifyAlignment` | No | `bottomLeft` | Position on screen where notification appears. |
| `variant` | `string` | No | - | Custom variant identifier for styling purposes. |

#### Render Function Arguments (`NotifyRenderArgs`)

Your `render` function receives an object with:

```typescript
{
  id: string;              // Notification ID
  duration: number;        // Duration in ms
  alignment: NotifyAlignment; // Position
  variant?: string;        // Custom variant (if provided)
  onClose: () => void;     // Function to close this notification
}
```

#### Example

```jsx
notify.open({
  duration: 5000,
  alignment: NotifyAlignment.topRight,
  variant: 'success',
  render: ({ onClose, variant }) => (
    <div className={`notification ${variant}`}>
      <span>Operation completed successfully!</span>
      <button onClick={onClose}>✕</button>
    </div>
  ),
});
```

---

### `notify.close(id)`

Closes a specific notification by ID.

```jsx
const notificationId = 'my-notification';

notify.open({
  id: notificationId,
  render: () => <div>I can be closed programmatically</div>,
});

// Later...
notify.close(notificationId);
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

## Configuration API

### `config.set(props)`

Set global configuration for all notifications.

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `alignment` | `NotifyAlignment` | `bottomLeft` | Default position for all notifications. |
| `reverse` | `boolean` | `false` | If `true`, new notifications appear at the bottom of the stack. |
| `notifyComponent` | `React.ComponentType` | `Fragment` | Wrapper component for notification content. |
| `animationConfig` | `AnimationConfig` | Default animations | Custom enter/exit animations. |

#### Example: Global Configuration

```jsx
import { config, NotifyAlignment } from 'react-simple-notify';

config.set({
  alignment: NotifyAlignment.topRight,
  reverse: true,
});
```

#### Example: Custom Wrapper Component

```jsx
import { config } from 'react-simple-notify';

const NotificationWrapper = ({ children, variant }) => (
  <div className={`notification-wrapper ${variant}`}>
    {children}
  </div>
);

config.set({
  notifyComponent: NotificationWrapper,
});

// Now all notifications will be wrapped
notify.open({
  variant: 'error',
  render: () => <span>Error occurred!</span>,
});
// Renders: <NotificationWrapper variant="error"><span>Error occurred!</span></NotificationWrapper>
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

Customize container spacing using CSS variables:

```css
:root {
  --rsn-container-padding: 16px;  /* Space from screen edges */
  --rsn-container-gap: 12px;      /* Space between notifications */
}
```

### Styling Notifications

Style your notification content using regular CSS:

```jsx
// Component
notify.open({
  render: () => (
    <div className="my-notification">
      <span>Custom styled notification</span>
    </div>
  ),
});
```

```css
/* Styles */
.my-notification {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

---

## Custom Animations

### Animation Configuration

Override default animations using `animationConfig`:

```jsx
import { config } from 'react-simple-notify';

config.set({
  animationConfig: {
    enter: {
      duration: 300,
      easing: 'ease-out',
      keyframes: ({ alignment }) => [
        { opacity: 0, transform: 'translateY(-100%)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
    },
    exit: {
      duration: 200,
      easing: 'ease-in',
      keyframes: ({ node }) => [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0.8)' },
      ],
    },
  },
});
```

### Animation API

Each animation stage (`enter`/`exit`) accepts:

| Property | Type | Description |
|----------|------|-------------|
| `duration` | `number` | Animation duration in milliseconds. |
| `easing` | `string` | CSS easing function (e.g., `'ease-in-out'`, `'cubic-bezier(0.4, 0, 0.2, 1)'`). |
| `keyframes` | `Function` | Function returning array of keyframes. Receives `{ node, alignment }`. |

---

## Advanced Examples

### Persistent Notification

```jsx
notify.open({
  duration: 0, // Never auto-close
  render: ({ onClose }) => (
    <div className="important-alert">
      <h3>Action Required</h3>
      <p>Please review your settings.</p>
      <button onClick={onClose}>Dismiss</button>
    </div>
  ),
});
```

### Success/Error Variants

```jsx
const showSuccess = (message) => {
  notify.open({
    variant: 'success',
    render: () => (
      <div className="notification success">
        ✓ {message}
      </div>
    ),
  });
};

const showError = (message) => {
  notify.open({
    variant: 'error',
    duration: 0, // Errors stay until dismissed
    render: ({ onClose }) => (
      <div className="notification error">
        ✕ {message}
        <button onClick={onClose}>Close</button>
      </div>
    ),
  });
};
```

### Programmatic Control

```jsx
const notificationId = 'loading-notification';

// Show loading notification
notify.open({
  id: notificationId,
  duration: 0,
  render: () => <div>Loading...</div>,
});

// Later, close it and show success
fetch('/api/data')
  .then(() => {
    notify.close(notificationId);
    notify.open({
      render: () => <div>Data loaded successfully!</div>,
    });
  });
```

---

## TypeScript

Full TypeScript support is included. All types are exported:

```typescript
import type {
  NotifyRenderArgs,
  NotifyAlignment,
  AnimationConfig,
  ConfigProps
} from 'react-simple-notify';
```

---

## License

MIT © [GruFFix](mailto:GruFFix@yandex.ru)

## Links

- [Demo](http://rsn.gruffix.ru/)
- [GitHub](https://github.com/GruFFix/react-simple-notify)
