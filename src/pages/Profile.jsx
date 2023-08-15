import classNames from 'classnames'
import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash-es'
import { ArticleList, FollowProfileButton } from '../components'
import { useAuth, useProfileQuery } from '../hooks'

function Profile() {
  const { data } = useProfileQuery()
  const { authUser } = useAuth()
  const { username, image, bio } = data.profile
  const canUpdateProfile = authUser?.username === username
  const [filters, setFilters] = React.useState({ author: username, favorited: null, offset: 0 })

  const firstRender = useRef(true);
  const [loaded, setLoaded] = React.useState(false)

  const onMyArticleClick = () => {
    setFilters({ author: username, favorited: null, offset: 0 })
  }

  const onFavoriteClick = () => {
    setFilters({ author: null, favorited: username, offset: 0 })
  }

  const onPaginationClick = (selectedPage) => {
    setFilters({
      ...filters,
      offset: selectedPage,
    })
  }

  const isProfileExist = () => isEmpty(data.profile)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setFilters({ author: username, favorited: null, offset: 0 })
    setLoaded(true)
  }, [username])

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              {isProfileExist() ? (
                <div>loading...</div>
              ) : (
                <>
                  <img src={image} className="user-img" />
                  <h4>{username}</h4>
                  <p>{bio}</p>
                  {canUpdateProfile ? (
                    <Link className="btn btn-sm btn-outline-secondary action-btn" to="/settings">
                      <i className="ion-gear-a" /> Edit Profile Settings
                    </Link>
                  ) : (
                    <FollowProfileButton profile={data.profile} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <button
                    onClick={() => onMyArticleClick()}
                    type="button"
                    className={classNames('nav-link', {
                      active: filters?.author,
                    })}
                  >
                    My Articles
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    onClick={() => onFavoriteClick()}
                    type="button"
                    className={classNames('nav-link', {
                      active: filters?.favorited,
                    })}
                  >
                    Favorited Articles
                  </button>
                </li>
              </ul>
            </div>

            <ArticleList filters={filters} onPaginationClick={onPaginationClick} isReadyToFetch={loaded} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
