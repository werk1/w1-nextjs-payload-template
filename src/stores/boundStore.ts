import { create } from 'zustand'
import { ScrollSlice, createScrollSlice } from './scroll-observer'
import { DeviceInfoSlice, createDeviceInfoSlice } from './device-info'
import { RemainingSpaceSlice, createRemainingSpaceSlice } from './remaining-space'
type BoundStore = ScrollSlice & DeviceInfoSlice & RemainingSpaceSlice

export const useBoundStore = create<BoundStore>()((...a) => ({
  ...createScrollSlice(...a),
  ...createDeviceInfoSlice(...a),
  ...createRemainingSpaceSlice(...a),
}))
