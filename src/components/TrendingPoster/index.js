import {Link} from 'react-router-dom'

import './index.css'

const TrendingPoster = props => {
  const {TrendingListPoster} = props
  return (
    <>
      {TrendingListPoster.map(each => (
        <li key={each.id}>
          <Link to={`/movies/${each.id}`}>
            <img
              src={each.posterPath}
              alt={each.title}
              className="Trending-Poster-list"
            />
          </Link>
          <p className="Trending-list-paragraph">{each.title}</p>
        </li>
      ))}
    </>
  )
}

export default TrendingPoster
