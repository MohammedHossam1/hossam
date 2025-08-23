import { create } from "zustand";

interface NavbarState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}

export const useNavbarStore = create<NavbarState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
interface ProfileState {
    isOpenProfile: boolean;
    openProfile: () => void;
    closeProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
    isOpenProfile: false,
    openProfile: () => set({ isOpenProfile: true }),
    closeProfile: () => set({ isOpenProfile: false }),
}));
