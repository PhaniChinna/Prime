import {Link} from 'react-router-dom'

import './index.css'

const NotFoundRoute = () => (
  <div className="Not-Found-container">
    <img
      src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679996181/snow-removal-machine-working-high-ski-slope-snowstorm_454047-2149_1_rghzpr.png"
      className="Image-snow-container"
      alt="Snow"
    />
    <div className="Not-found-container">
      <h1 className="Not-found-heading">Lost Your Way ?</h1>
      <p className="Not-found-paragraph">
        We are sorry the page you requested <br className="Line-break" /> could
        not be found
      </p>
      <p className="Not-found-para">Please go back to home page</p>
      <Link to="/login">
        <button className="Not-Found-button" type="button">
          Go Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFoundRoute
