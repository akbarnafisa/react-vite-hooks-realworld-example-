import React from "react"

function Home() {
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
                {/* <li className="nav-item">
                  <button
                    type="button"
                    className={classNames('nav-link', {
                      active: !filters?.tag && !filters.feed,
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
                )} */}
                <li className="nav-item">
                  <button
                    type="button"
                    className="nav-link active"
                  >
                    Global Feed
                  </button>
                </li>
              </ul>
            </div>
            {/* <ArticleList filters={filters} /> */}
          </div>
          <div className="col-md-3">
            {/* <PopularTags onTagClick={onTagClick} /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
