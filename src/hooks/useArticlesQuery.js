import { useQuery } from "react-query"
import { omit } from 'lodash-es'

function useArticlesQuery({ filters }, options) {
  console.log(`/articles${filters.feed ? '/feed' : ''}`)
  return useQuery([`/articles${filters.feed ? '/feed' : ''}`, { limit: 10, ...omit(filters, ['feed']) }], {
    placeholderData: {
      articles: [],
      articlesCount: null,
    },
    // better for pagination data
    // keepPreviousData: true,
    ...options,
  })
}

export default useArticlesQuery