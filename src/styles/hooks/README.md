# useDeviceLayout Hook

A custom React hook that provides responsive layout classes based on device state and screen orientation.

## Overview

`useDeviceLayout` manages responsive layout classes for different device states and screen orientations. It works in conjunction with the device state from the global store to provide appropriate CSS classes for content, header, and footer components.

## Usage

To use the `useDeviceLayout` hook, import it into your component and call it. The hook will return the appropriate classes for the content, header, and footer components based on the current device state.

```tsx
import { useDeviceLayout } from '@/styles/hooks/device-layout/useDeviceLayout';

const MyComponent = () => {
  const { contentClass, headerClass, footerClass } = useDeviceLayout();
  return (
    <div className={contentClass}>
      <header className={headerClass}>
        <h1>My Header</h1>
      </header>
      <footer className={footerClass}>
        <p>My Footer</p>
      </footer>
    </div>
  );
};
```
