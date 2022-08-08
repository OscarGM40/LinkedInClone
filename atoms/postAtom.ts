import { atom } from "recoil";

export const handlePostState = atom<boolean>({
  key: "handlePostState",
  default: false,
});

export const getPostState = atom({
  key: "getPostState",
  default: {},
});

export const useSSRPostsState = atom<boolean>({
  key: "useSSRPostsState",
  default: true,
});
