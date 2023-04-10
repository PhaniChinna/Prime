import {Component} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

class HomTreTopOrg extends Component {
  render() {
    return (
      <div className="HomeTreOrg-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679652587/Group_7399_2_x2dqea.png"
            className="Home-Tr-Or-image"
            alt="website logo"
          />
        </Link>
        <div className="Home-tre-org-card-container">
          <ul className="Home-tre-org-un-Ordered">
            <li className="Home-heading-home-Home">
              <Link to="/trending" className="Home-tre-org-link">
                Trending
              </Link>
            </li>
            <li className="Home-heading-home-Home">
              <Link className="Home-tre-org-link" to="/original">
                Original
              </Link>
            </li>
            <li className="Home-heading-home-Home">
              <Link className="Home-tre-org-link" to="/topRated">
                TopRated
              </Link>
            </li>
            <li className="Home-heading-home-Home">
              <Link className="Home-tre-org-link" to="/account">
                {' '}
                Account
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default HomTreTopOrg
