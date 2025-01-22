# Device Info Store

A Zustand store module that manages device-specific information and responsive states across the application.

## Overview

The Device Info store module (`@/stores/device-info`) exports the following:

- `deviceInfoSlice` - Core Zustand slice for device state management
- `useDeviceInfo` - Hook for accessing device info state and updates
- `DeviceInfoTracker` - Component for initializing device tracking

## Exports

### deviceInfoSlice

The core Zustand slice that manages device state including:

- Device type detection (desktop/mobile/phone)
- Touch support detection
- Screen dimensions (width/height)
- Device orientation states:
  - Portrait/landscape detection
  - Landscape position (center/left/right)
- Scroll mode states for desktop
  - Content scroll
  - Page scroll

The slice provides:

- `device` - The current device state
- `setDevice` - A function to update the device state
- `resetDevice` - A function to reset the device state



## Features

- **Automatic Updates**: Responds to window resize and orientation changes
- **Touch Detection**: Identifies touch-capable devices
- **Scroll Mode Support**: Handles different scroll modes for desktop
- **Header Position States**: Manages different header positions for landscape mode
- **Dimension Tracking**: Keeps track of viewport dimensions

## Dependencies

- Zustand for state management
- React for hooks and components
- Device Agent utility for device detection

## Event Handling

The store automatically handles:
- Window resize events
- Device orientation changes
- Initial device detection

## Usage

To use the Device Info store, import the `deviceInfoSlice` slice and the `useDeviceInfo` hook into your component.

```tsx
import { deviceInfoSlice } from '@/stores/device-info';
import { useDeviceInfo } from '@/stores/device-info';
```

