import {Link} from 'react-router-dom'
import './index.css'

const TopRatedPoster = props => {
  const {TopRatedListPoster} = props
  return (
    <>
      {TopRatedListPoster.map(each => (
        <li key={each.id}>
          <Link to={`/movies/${each.id}`}>
            <img
              src={each.posterPath}
              alt={each.title}
              className="TopRated-Poster-list"
            />
          </Link>
          <p className="TopRated-list-paragraph">{each.title}</p>
        </li>
      ))}
    </>
  )
}

export default TopRatedPoster
