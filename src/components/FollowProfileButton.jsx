import React from 'react'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth, useFollowAuthorMutation } from '../hooks'
import FollowButton from './FollowButton'

function FollowProfileButton({ profile }) {
  const { following, username } = profile
  const { isAuth } = useAuth()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const queryKey = `/profiles/${username}`

  const { mutate, isLoading } = useFollowAuthorMutation({
    /**
     *
     * This function will fire before the mutation function is fired and is passed
     * the same variables the mutation function would receive. The value returned from this function will be
     * passed to both the onError and onSettled functions in the event of a mutation failure and can be
     * useful for rolling back optimistic updates.
     */
    /**
     * use onMutate to optimistic update the data
     */
    onMutate: async () => {
      /**
       * getQueryData is a synchronous function that can be used to get an existing query's cached data.
       * If the query does not exist, undefined will be returned.
       */
      const previousProfile = queryClient.getQueryData(queryKey)

      if (isAuth) {
        /**
         * The cancelQueries method can be used to cancel outgoing queries based on their query keys or
         * any other functionally accessible property/state of the query.
         * This is most useful when performing optimistic updates since you will likely need to
         * cancel any outgoing query refetches so they don't clobber your optimistic update when they resolve.
         */
        await queryClient.cancelQueries(queryKey)

        /**
         * setQueryData is a synchronous function that can be used to immediately update a query's cached data.
         * If the query does not exist, it will be created.
         */
        queryClient.setQueryData(queryKey, ({ profile: currentProfile }) => ({
          profile: {
            ...currentProfile,
            following: !currentProfile.following,
          },
        }))
      } else {
        navigate('/login')
      }

      return { previousProfile }
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context.previousProfile)
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
      queryClient.invalidateQueries('/articles/feed')
    },
  })

  return (
    <>
      <FollowButton
        disabled={isLoading}
        following={following}
        onClick={() => mutate({ following, username })}
        username={username}
      />
    </>
  )
}

export default FollowProfileButton
