import { FullConversationType } from '@/types';
import { Conversation, User } from '@prisma/client';
import { create } from 'zustand'

type SideBarStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

type ConversationStore = {
    hasData: Conversation & {
        users: User[]
    } | null;
    storeData: (item: Conversation & {
        users: User[]
    } | null) => void;
}

export const useChatDrawer = create<SideBarStore & ConversationStore>((set) => ({
    hasData: null,
    storeData: (item) => set(() => ({ hasData: item })),
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export const useSettingsDrawer = create<SideBarStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));