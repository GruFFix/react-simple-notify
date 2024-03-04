# React Simple Notify

## Introduction
React Simple Notify is a lightweight and easy-to-use notification library for React applications. It allows developers to effortlessly integrate customizable notifications into their web projects.

## Installation
Install React Notify using npm or yarn:

```bash
npm install react-simple-notify
# or
yarn add react-simple-notify
```

## Usage
```jsx
import React from 'react';
import { useNotify, NotifyContainers } from 'react-simple-notify';

function App() {
  const { notify } = useNotify();

  const showNotification = () => {
    notify.open({
      id: 'unique-id', // optional
      duration: 3000,
      alignment: 'top-right',
      render: ({ onClose }) => (
        <div>
          This is a notification!
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

## Animation Configuration
```jsx
const customAnimationConfig = {
  enter: {
    duration: 500,
    easing: 'ease-in-out',
    keyframes: {/* Custom keyframes for enter animation */},
  },
  exit: {
    duration: 200,
    easing: 'ease-in',
    keyframes: {/* Custom keyframes for exit animation */},
  },
};

<NotifyContainers animationConfig={customAnimationConfig} />;
```


## API
### useNotify

| Method     | Description                                           | Signature                                              |
|------------|-------------------------------------------------------|-------------------------------------------------------|
| `open`     | Opens a new notification with the specified options. | `(options: NotifyOptions) => void` |
| `close`    | Closes a notification with the specified ID.         | `(id: string) => void`                                 |
| `closeAll` | Closes all currently displayed notifications.        | `() => void`                                           |

### AnimationConfig
| Property | Description                                                        | Type                    |
|----------|--------------------------------------------------------------------|-------------------------|
| `enter`  | Configuration for the animation when a notification enters (appears). | `AnimationStageConfig` |
| `exit`   | Configuration for the animation when a notification exits (disappears). | `AnimationStageConfig` |

### AnimationStageConfig
| Property    | Description                                                                                                                                                    | Type                                                                                                        |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| `keyframes` | A function that generates an array of `Keyframe` objects for the animation. It receives an object with `node` and `alignment` to customize the animation.       | `({ node, alignment }: { node: Element \| HTMLElement; alignment: NotifyAlignment }) => Keyframe[]`         |
| `easing`    | Specifies the CSS easing function to use for the animation transition, such as `"ease-in"`, `"ease-out"`, `"linear"`, `"ease-in-out"`, etc.                    | `string`                                                                                                    |
| `duration`  | The duration of the animation in milliseconds. This controls how long the animation takes from start to finish.                                                 | `number`                                                                                                    |


