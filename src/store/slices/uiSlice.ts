import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isCreatePostModalOpen: boolean;
  isMobileMenuOpen: boolean;
  theme: "light" | "dark";
}

const initialState: UIState = {
  isCreatePostModalOpen: false,
  isMobileMenuOpen: false,
  theme: "dark",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openCreatePostModal: (state) => {
      state.isCreatePostModalOpen = true;
    },
    closeCreatePostModal: (state) => {
      state.isCreatePostModalOpen = false;
    },
    toggleCreatePostModal: (state) => {
      state.isCreatePostModalOpen = !state.isCreatePostModalOpen;
    },
    openMobileMenu: (state) => {
      state.isMobileMenuOpen = true;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const {
  openCreatePostModal,
  closeCreatePostModal,
  toggleCreatePostModal,
  openMobileMenu,
  closeMobileMenu,
  toggleMobileMenu,
  setTheme,
  toggleTheme,
} = uiSlice.actions;

export default uiSlice.reducer;
