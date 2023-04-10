import {Link} from 'react-router-dom'

import './index.css'

const PoplarPoster = props => {
  const {PopularPosterList, id} = props
  return (
    <>
      {PopularPosterList.map(each => (
        <li key={each.id}>
          <Link to={`/movies/${id}`}>
            <img
              src={each.posterPath}
              alt={each.title}
              key="title"
              className="poster-path-popular"
            />
          </Link>
        </li>
      ))}
    </>
  )
}

export default PoplarPoster
