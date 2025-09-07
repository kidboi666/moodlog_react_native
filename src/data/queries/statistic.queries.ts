import { getTotalCount } from '@/src/data/services/statistic.service'
import { QueryKeys } from '@/src/shared/constants'
import { queryOptions } from '@tanstack/react-query'

export const StatisticQueries = {
  getTotalCount: () =>
    queryOptions({
      queryKey: QueryKeys.get.totalCount,
      queryFn: () => getTotalCount(),
    }),
}
