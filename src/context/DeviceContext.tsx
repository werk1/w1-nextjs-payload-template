import { createContext, JSX } from 'react'
import useDeviceInfo, { DeviceInfoType } from '../hooks/useDeviceInfo'

/**
 * DeviceContext provides a way to share the device type, orientation, width,
 * and height between components.
 * It uses the [useDeviceAndDimension](../hooks/useDeviceAndDimension.tsx) hook
 * to store the current device type and orientation.
 */

// const DeviceContext = createContext<DeviceAndDimensionType | null>(null);
const DeviceContext = createContext<DeviceInfoType>({} as DeviceInfoType)
interface DeviceProviderProps {
  children: React.ReactNode
}

/**
 * The DeviceProvider component provides a way to share the device type,
 * orientation, width, and height between components.
 * It uses the [useDeviceAndDimension](../hooks/useDeviceAndDimension.tsx) hook
 * to store the current device type and orientation.
 *
 * @param {DeviceProviderProps} props The props object.
 * @prop {React.ReactNode} children The children elements.
 * @returns {JSX.Element} The JSX element.
 */
const DeviceProvider = ({ children }: DeviceProviderProps): JSX.Element => {
  // const deviceValues = UseDeviceAndDimension();
  const deviceValues = useDeviceInfo()
  // Pass the device type, orientation, width, and height to the
  // DeviceContext.Provider component.
  return <DeviceContext.Provider value={deviceValues}>{children}</DeviceContext.Provider>
}

export { DeviceProvider, DeviceContext }
