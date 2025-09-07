import { queryKeys } from '@/src/constants'
import { getTotalCount } from '@/src/services/statistic.service'
import { queryOptions } from '@tanstack/react-query'

export const StatisticQueries = {
  getTotalCount: () =>
    queryOptions({
      queryKey: queryKeys.get.totalCount,
      queryFn: () => getTotalCount(),
    }),
}
