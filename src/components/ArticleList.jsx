import React from 'react'
import { isEmpty } from 'lodash-es'
import { useArticlesQuery } from '../hooks'
import ArticlePreview from './ArticlePreview'

/**
 * @typedef {object} Filters
 * @property {string} [Filter.author]
 * @property {string} [Filter.favorited]
 * @property {string} [Filter.tag]
 * @property {number} [Filter.offset]
 * @property {boolean} [Filter.feed]
 */

/** @type {Filters} */
const initialFilters = { author: null, favorited: null, tag: null, offset: 0, feed: false }
const limit = 10

function ArticleList({ filters = initialFilters, onPaginationClick }) {
  // const [offset, setOffset] = React.useState(0)
  const { data, isFetching, isError, isSuccess } = useArticlesQuery({ filters })
  const pages = Math.ceil(data.articlesCount / limit)

  if (isFetching) return <p className="article-preview">Loading articles...</p>
  if (isError) return <p className="article-preview">Loading articles failed :(</p>
  if (isSuccess && isEmpty(data?.articles)) return <p className="article-preview">No articles are here... yet.</p>

  return (
    <>
      {data.articles.map((article) => (
        <ArticlePreview key={article.slug} article={article} />
      ))}
      {pages > 1 && (
        <nav>
          <ul className="pagination">
            {Array.from({ length: pages }, (_, i) => (
              <li className={filters.offset === i ? 'page-item active' : 'page-item'} key={i}>
                <button type="button" className="page-link" onClick={() => onPaginationClick(i)}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  )


}

export default ArticleList