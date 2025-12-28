import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostsState {
  likedPosts: number[];
  likeCounts: Record<number, number>;
}

const initialState: PostsState = {
  likedPosts: [],
  likeCounts: {},
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      const isLiked = state.likedPosts.includes(postId);

      if (isLiked) {
        state.likedPosts = state.likedPosts.filter((id) => id !== postId);
        state.likeCounts[postId] = (state.likeCounts[postId] || 1) - 1;
      } else {
        state.likedPosts.push(postId);
        state.likeCounts[postId] = (state.likeCounts[postId] || 0) + 1;
      }
    },
    initializeLikeCount: (
      state,
      action: PayloadAction<{ postId: number; count: number }>
    ) => {
      const { postId, count } = action.payload;
      if (state.likeCounts[postId] === undefined) {
        state.likeCounts[postId] = count;
      }
    },
  },
});

export const { toggleLike, initializeLikeCount } = postsSlice.actions;
export default postsSlice.reducer;
