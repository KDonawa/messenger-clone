import { create, StateCreator } from "zustand";
import { BaseUser } from "../actions/getCurrentUser";

type SelectedUserSlice = {
  selectedUser: BaseUser | null;
  setSelectedUser: (selectedUser: BaseUser | null) => void;
  removeSelectedUser: () => void;
};

const createSelectedUserSlice: StateCreator<SelectedUserSlice> = (set) => ({
  selectedUser: null,
  setSelectedUser: (selectedUser) =>
    set(() => ({ selectedUser: selectedUser })),
  removeSelectedUser: () => set({ selectedUser: null }),
});

export const useStore = create<SelectedUserSlice>()((...a) => ({
  ...createSelectedUserSlice(...a),
}));
