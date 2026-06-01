import { useMutation } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"

import {
  getMyProfile,
  createProfile,
  updateProfile,
} from "../api/profile.api"

/**
 * Query hook for fetching
 * the authenticated user's profile.
 */
export const useMyProfileQuery = () => {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: getMyProfile,
  })
}

/**
 * Mutation hook for creating a user profile.
 */
export const useCreateProfileMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profiles"],
      })
    },
  })
}

/**
 * Mutation hook for updating
 * the authenticated user's profile.
 */
export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profiles"],
      })
    },
  })
}