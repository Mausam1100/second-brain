import { create } from 'zustand'

interface DeleteModalType {
  isOpen: boolean;
  noteId: string | null;

  openModal: (id: string) => void;
  closeModal: () => void;
}

export const useDeleteModal = create<DeleteModalType>((set) => ({
    isOpen: false,
    noteId: null,
    openModal: (id) => {
    set({
      isOpen: true,
      noteId: id,
    });
    },

    closeModal: () => {
        set({
        isOpen: false,
        noteId: null,
        });
    },
}))