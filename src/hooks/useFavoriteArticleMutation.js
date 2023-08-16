import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from 'react-query'
import axios from 'axios'
import useAuth from './useAuth'
import { isEmpty } from 'lodash-es'

function useFavoriteArticleMutation(slug) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isAuth } = useAuth()
  const queryKey = `/articles/${slug}`

  return useMutation(
    (/** @type {{favorited: boolean}} */ { favorited }) =>
      axios[favorited ? 'delete' : 'post'](`/articles/${slug}/favorite`),
    {
      onMutate: async () => {
        const previousArticle = queryClient.getQueryData(queryKey)

        if (isAuth) {
          await queryClient.cancelQueries(queryKey)

          queryClient.setQueryData(queryKey, (data) => {
            // TODO: revamp favorite logic
            if (isEmpty(data) || isEmpty(data.articles)) {
              return {}
            }
            const currentArticle = data.article
            const count = currentArticle.favoritesCount

            return {
              article: {
                ...currentArticle,
                favorited: !currentArticle.favorited,
                favoritesCount: currentArticle.favorited ? count - 1 : count + 1,
              },
            }
          })
        } else {
          navigate('/login')
        }

        return { previousArticle }
      },
      onError: (err, _, context) => {
        queryClient.setQueryData(queryKey, context.previousArticle)
      },
      onSettled: () => {
        // TODO: need to handle for /articles pagination
        queryClient.invalidateQueries(queryKey)
        queryClient.invalidateQueries('/articles')
        queryClient.invalidateQueries('/articles/feed')
      },
    }
  )
}

export default useFavoriteArticleMutation