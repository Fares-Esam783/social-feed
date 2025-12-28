import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalComment } from "@/types";

interface CommentsState {
  localComments: Record<number, LocalComment[]>;
}

const initialState: CommentsState = {
  localComments: {},
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<LocalComment>) => {
      const { postId } = action.payload;
      if (!state.localComments[postId]) {
        state.localComments[postId] = [];
      }
      state.localComments[postId].unshift(action.payload);
    },
    removeComment: (
      state,
      action: PayloadAction<{ postId: number; commentId: string }>
    ) => {
      const { postId, commentId } = action.payload;
      if (state.localComments[postId]) {
        state.localComments[postId] = state.localComments[postId].filter(
          (comment) => comment.id !== commentId
        );
      }
    },
  },
});

export const { addComment, removeComment } = commentsSlice.actions;
export default commentsSlice.reducer;
