import {Link} from 'react-router-dom'

import './index.css'

const SimilarPoster = props => {
  const {SimilarPosterList} = props
  return (
    <>
      {SimilarPosterList.map(each => (
        <li key={each.id}>
          <Link to={`/movies/${each.id}`}>
            <img
              src={each.posterPath}
              alt={each.title}
              key="title"
              className="Each-similar-movies-list"
            />
          </Link>
        </li>
      ))}
    </>
  )
}

export default SimilarPoster
