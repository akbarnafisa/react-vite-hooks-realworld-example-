import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'
// import { ArticleList, FollowProfileButton } from '../components'
import { useAuth, useProfileQuery } from '../hooks'

function Profile() {
  const { data } = useProfileQuery()
  const { authUser } = useAuth()
  const { username, image, bio } = data.profile

  const canUpdateProfile = authUser?.username === username

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={image} className="user-img" />
              <h4>{username}</h4>
              <p>{bio}</p>
              {canUpdateProfile ? (
                <Link className="btn btn-sm btn-outline-secondary action-btn" to="/settings">
                  <i className="ion-gear-a" /> Edit Profile Settings
                </Link>
              ) : (
                // <FollowProfileButton />
                <div>follow</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
