import { queryKeys } from '@/constants'
import { getTotalCount } from '@/services/statistic.service'
import { queryOptions } from '@tanstack/react-query'

export const StatisticQueries = {
  getTotalCount: () =>
    queryOptions({
      queryKey: queryKeys.get.totalCount,
      queryFn: () => getTotalCount(),
    }),
}
