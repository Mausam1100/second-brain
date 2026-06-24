import { create } from "zustand";

type LogOutModelType = {
    isOpen: boolean,
    openModal: () => void,
    closeModal: () => void
}

export const useLogOutModal = create<LogOutModelType>((set) => ({
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