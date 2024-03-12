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
