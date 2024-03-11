![Logo](https://repository-images.githubusercontent.com/765200491/61230139-c1ae-4440-a57f-bb404142d495)
# React Simple Notify

## [DEMO](http://rsn.gruffix.ru/)

## Installation
Install React Notify using npm or yarn:

```bash
npm install react-simple-notify
# or
yarn add react-simple-notify
```

## Simple usage
```jsx
import React from 'react';
import { useNotify, NotifyContainers } from 'react-simple-notify';

function App() {
  const { notify } = useNotify();

  const showNotification = () => {
    notify.open({
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
