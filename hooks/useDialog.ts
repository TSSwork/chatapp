import { create } from 'zustand'

type DialogStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

type ImageDialogStore = {
    hasImg: string | null;
    storeImg: (item: string | null) => void;
}

export const useChatImageDialog = create<DialogStore & ImageDialogStore>((set) => ({
    hasImg: null,
    storeImg: (item) => set(() => ({ hasImg: item })),
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export const useConfirmDialog = create<DialogStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));
