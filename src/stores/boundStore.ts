import { create } from 'zustand'
import { ScrollSlice, createScrollSlice } from './scroll-observer'
import { DeviceInfoSlice, createDeviceInfoSlice } from './device-info'
import { RemainingSpaceSlice, createRemainingSpaceSlice } from './remaining-space'
import { ScrollDirectionSlice, createScrollDirectionSlice } from './scroll-direction'

type BoundStore = ScrollSlice & DeviceInfoSlice & RemainingSpaceSlice & ScrollDirectionSlice

export const useBoundStore = create<BoundStore>()((...a) => ({
  ...createScrollSlice(...a),
  ...createDeviceInfoSlice(...a),
  ...createRemainingSpaceSlice(...a),
  ...createScrollDirectionSlice(...a),

}))
