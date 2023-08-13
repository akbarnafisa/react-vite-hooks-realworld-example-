/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/named */
import React from 'react'
import classNames from 'classnames'
import { ArticleList, PopularTags } from '../components'
// import { useAuth } from '../hooks'

const initialFilters = { tag: null, offset: 0, feed: false }

function Home() {
  // TODO: handle auth
  // const { isAuth } = useAuth()
  // const [filters, setFilters] = React.useState({ ...initialFilters, feed: isAuth })
  const [filters, setFilters] = React.useState({ ...initialFilters })

  function onTagClick(tag) {
    setFilters({
      ...initialFilters,
      tag,
    })
  }

  function onGlobalFeedClick() {
    setFilters(initialFilters)
  }

  function onPaginationClick(selectedPage) {
    setFilters({
      ...filters,
      offset: selectedPage,
    })
  }

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {/* {isAuth && (
                  <li className="nav-item">
                    <button
                      onClick={onFeedClick}
                      type="button"
                      className={classNames('nav-link', {
                        active: filters.feed,
                      })}
                    >
                      Your Feed
                    </button>
                  </li>
                )} */}
                {/*
                 */}

                <li className="nav-item">
                  <button
                    type="button"
                    className={classNames('nav-link', {
                      // active: !filters?.tag && !filters.feed,
                      active: !filters?.tag,
                    })}
                    onClick={onGlobalFeedClick}
                  >
                    Global Feed
                  </button>
                </li>

                {filters?.tag && (
                  <li className="nav-item">
                    <a className="nav-link active"># {filters?.tag}</a>
                  </li>
                )}
              </ul>
            </div>
            <ArticleList filters={filters} onPaginationClick={onPaginationClick} />
          </div>
          <div className="col-md-3">
            <PopularTags onTagClick={onTagClick} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
