![Logo](https://repository-images.githubusercontent.com/765200491/0b4162c0-8e67-4b8d-9d53-58b50c65c0f3)
### [DEMO](http://rsn.gruffix.ru/)

# React Simple Notify

## Installation
Install React Notify using npm or yarn:

```bash
npm install react-simple-notify
# or
yarn add react-simple-notify
```

## Simple usage
```jsx
import { notify, NotifyContainers } from 'react-simple-notify';

function App() {
  const showNotification = () => {
    notify.open({
      render: ({ onClose }) => (
        <div>
          This is a notify!
          <button onClick={onClose}>Close</button>
        </div>
      ),
    });
  };

  return (
    <>
      <button onClick={showNotification}>Show Notify</button>
      <NotifyContainers />
    </>
  );
}

export default App;
```


## Notify API

### notify.open(options)
Opens a notification with customizable options.

| Parameter | Type                     | Description                                                                                            | Default Value            |
|----|--------------------------|--------------------------------------------------------------------------------------------------------|--------------------------|
|`id`|`string` (optional)|A unique identifier for the notification. If not provided, a random ID will be generated.|Random ID|
|`duration`|`number` (optional)|The time in milliseconds before the notification automatically closes. Set to 0 for persistent notifications.|`3500`|
|`alignment`|`NotifyAlignment` (optional)|The position on the screen where the notification will appear.|`NotifyAlignment.bottomLeft`|
|`variant`|`string` (optional)|Allows specifying a variant for custom styling or behavior.|-| 
|`render`|`Function`|A render function that returns the content of the notification. |-| 

### notify.close(id)
Closes the notification with the specified ID.

| Parameter | Type                  | Description                                                                                            |
|----|-----------------------|--------------------------------------------------------------------------------------------------------|
|`id`|`string`|The unique identifier of the notification to close.|

###  notify.closeAll()
Closes all currently open notifications. This function does not take any parameters.

## Config API

### config.set(props)
Sets the global configuration for notifications.

| Parameter | Type                                        | Description                                                                                            | Default Value                |
|----|---------------------------------------------|--------------------------------------------------------------------------------------------------------|------------------------------|
|`alignment`| `NotifyAlignment` (optional)                |Global default alignment for notifications.| `NotifyAlignment.bottomLeft` |
|`animationConfig`| `AnimationConfig` (optional)                |Configuration for the enter and exit animations of notifications.| -                            |
|`notifyComponent`| `React.ComponentType / ReactNode` (optional) |A custom React component or element that will wrap the notification content, allowing for custom layouts.| `Fragment`                   |
|`reverse`| `boolean` (optional)|Determines whether notifications stack in reverse order.| `false`                      |

### config.reset()
Resets the global configuration for notifications to their default values. This function does not take any parameters.


## Example of Custom AnimationConfig:
```javascript
{
  enter: {
    duration: 300,
    easing: "ease-out",
    keyframes: ({ alignment }) => {
      return [
        { opacity: 0, transform: "translateY(-100%)" },
        { opacity: 1, transform: "translateY(0)" }
      ];
    }
  },
  exit: {
    duration: 200,
    easing: "ease-in",
    keyframes: ({ node }) => {
      return [
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0, transform: "scale(0.5)" }
      ];
    }
  }
}

```
