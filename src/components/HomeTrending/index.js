import {Link} from 'react-router-dom'

import './index.css'

const HomeTrendingList = props => {
  const {TrendingMoviesHome} = props
  const {backdropPath, overview, title, id} = TrendingMoviesHome

  return (
    <div>
      <li>
        <img src={backdropPath} alt={title} className="Trending-Home-list" />
        <div className="Home-div-container">
          <p className="Trending-Home-title">{title}</p>
          <p className="Trending-Home-OverView">{overview}</p>
          <Link to={`/movies/${id}`}>
            <button className="Home-button" type="button">
              Play
            </button>
          </Link>
        </div>
      </li>
    </div>
  )
}

export default HomeTrendingList
