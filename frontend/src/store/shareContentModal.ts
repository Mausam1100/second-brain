import { create } from "zustand";

type ShareLinkType = {
    isOpen: boolean,
    openModal: () => void,
    closeModal: () => void
}

export const useShareContent = create<ShareLinkType>((set) => ({
    isOpen: false,
    openModal: () => {
        set({
            isOpen: true
        })
    },
    closeModal: () => {
        set({
            isOpen: false
        })
    }
}))