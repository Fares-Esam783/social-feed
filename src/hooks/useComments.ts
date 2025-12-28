import { useQuery } from "@tanstack/react-query";
import { commentsApi } from "@/lib/api";

export function useComments(postId: number) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => commentsApi.getByPostId(postId),
    enabled: postId > 0,
  });
}
