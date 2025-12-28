import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/lib/api";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: usersApi.getAll,
  });
}

export function useUser(userId: number) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => usersApi.getById(userId),
    enabled: userId > 0,
  });
}

export function useSearchUsers(query: string) {
  return useQuery({
    queryKey: ["searchUsers", query],
    queryFn: () => usersApi.search(query),
    enabled: query.length > 0,
  });
}
