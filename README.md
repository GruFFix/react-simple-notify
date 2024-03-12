![Logo](https://repository-images.githubusercontent.com/765200491/61230139-c1ae-4440-a57f-bb404142d495)
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
import React from 'react';
import { notify, NotifyContainers } from 'react-simple-notify';

function App() {
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
