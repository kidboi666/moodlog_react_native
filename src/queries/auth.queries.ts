import { useMutation } from '@tanstack/react-query'

export function useUpdateUserInfo() {
  return useMutation({
    mutationFn: () => {},
  })
}
