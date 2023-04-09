import {Link} from 'react-router-dom'

import './index.css'

const PoplarPoster = props => {
  const {PopularPosterList} = props
  return (
    <>
      {PopularPosterList.map(each => (
        <li key={each.id}>
          <Link to={`/movies/${each.id}`}>
            <img
              src={each.posterPath}
              alt={each.title}
              className="poster-path-popular"
            />
          </Link>
        </li>
      ))}
    </>
  )
}

export default PoplarPoster
