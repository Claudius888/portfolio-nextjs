import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface initialAnimationType {
  isinitialAnimation: boolean | null;
  toggle: () => void;
  isAnimationComplete: boolean;
  toggleAnimateComplete: () => void;
}

export const useIntialAnimation = create<initialAnimationType>()((set) => ({
    isinitialAnimation: null,
    toggle: () => set((state) => {
        return ({isinitialAnimation: false});
        // if(typeof state.isinitialAnimation === 'boolean') {
        //     return ({isinitialAnimation: !state.isinitialAnimation})
        // } else {
        //     return ({isinitialAnimation: false});
        // }
    }),
    isAnimationComplete: false,
    toggleAnimateComplete: () => set((state) => ({isAnimationComplete: !state.isAnimationComplete}))
}))
