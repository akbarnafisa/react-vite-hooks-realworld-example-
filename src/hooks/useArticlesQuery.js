import { useQuery } from "react-query"
import { omit } from 'lodash-es'

function useArticlesQuery({ filters }) {
  return useQuery([`/articles${filters.feed ? '/feed' : ''}`, { limit: 10, ...omit(filters, ['feed']) }], {
    placeholderData: {
      articles: [],
      articlesCount: null,
    },
    // better for pagination data
    keepPreviousData: true,
  })
}

export default useArticlesQuery