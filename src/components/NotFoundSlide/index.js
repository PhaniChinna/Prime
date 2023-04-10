import {Link} from 'react-router-dom'

import './index.css'

const NotFoundRoute = () => (
  <div className="Not-Found-container">
    <img
      src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679996181/snow-removal-machine-working-high-ski-slope-snowstorm_454047-2149_1_rghzpr.png"
      className="Image-snow-container"
      alt="not found"
    />
    <div className="Not-found-container">
      <h1 className="Not-found-heading">Lost Your Way ?</h1>
      <p className="Not-found-paragraph">
        we are sorry, the page you requested could not be found Please go back
        to the homepage.
      </p>
      <Link to="/login">
        <button className="Not-Found-button" type="button">
          Go to Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFoundRoute
