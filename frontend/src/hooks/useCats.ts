import { useMutation } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"

import {
  getMyCats,
  createCat,
  deleteCat,
} from "../api/cat.api"

/**
 * Query hook for fetching
 * all cats owned by the user.
 */
export const useMyCatsQuery = () => {
  return useQuery({
    queryKey: ["cats"],
    queryFn: getMyCats,
  })
}
/**
 * Mutation hook for creating
 * a cat.
 */
export const useCreateCatMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCat,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cats"],
      })
    },
  })
}
/**
 * Mutation hook for deleting
 * a cat.
 */
export const useDeleteCatMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCat,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cats"],
      })
    },
  })
}