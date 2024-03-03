# React Simple Notify

## Introduction
React Simple Notify is a lightweight, customizable notification library for React applications. It provides an easy way to manage and display notifications within your React application. Utilizing a context provider, React Notify allows for seamless integration and control over how and where your notifications appear on the screen.

## Installation
Install React Notify using npm or yarn:

```bash
npm install react-simple-notify
# or
yarn add react-simple-notify
```


## Use
```jsx
import { useNotify, NotifyContainers, NotifyAlignment, NotifyRenderArgs } from 'react-simple-notify'

export const App = () => {
  const { notify } =  useNotify()
    
  const handleOpen = () => {
    notify.open({
      index: 'notify',
      alignment: NotifyAlignment.bottomLeft,
      duration: 4500,
      render: () => <h1>Hello react-notify 🔥</h1>,
    })
  }  
    
  return (
    <>
      <button onClick={}></button>
      <NotifyContainers />
    </>
  )
}
```
