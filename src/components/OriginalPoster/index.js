import {Link} from 'react-router-dom'
import './index.css'

const OriginalPoster = props => {
  const {OriginalListPoster} = props
  return (
    <>
      {OriginalListPoster.map(each => (
        <li key={each.id}>
          <Link to={`/movies/${each.id}`}>
            <img
              src={each.posterPath}
              alt={each.title}
              key="title"
              className="Original-Poster-list"
            />
          </Link>
          <p className="Original-list-paragraph">{each.title}</p>
        </li>
      ))}
    </>
  )
}

export default OriginalPoster
