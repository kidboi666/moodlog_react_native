import { QueryKeys } from '@/src/data/queries'
import { getTodayAiResponseStatus } from '@/src/data/services'
import { useQuery } from '@tanstack/react-query'

export function useAiUsageCheck(todayString: any) {
  const { data: aiStatus } = useQuery({
    queryKey: QueryKeys.get.aiResponseStatus(todayString),
    queryFn: () => getTodayAiResponseStatus(todayString),
  })

  return aiStatus?.hasAiResponse || false
}
