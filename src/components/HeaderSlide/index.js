import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'

import {Link} from 'react-router-dom'

import './index.css'

class HeaderPage extends Component {
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
              <Link to="/" className="Home-tre-org-link">
                Home
              </Link>
            </li>
            <li className="Home-heading-home-Home">
              <Link className="Home-tre-org-link" to="/popular">
                Popular
              </Link>
            </li>
            <li className="Home-heading-home-Home">
              <Link className="Home-tre-org-link" to="/search">
                Search
              </Link>
            </li>
            <button className="LOO" type="button" testid="searchButton">
              <HiOutlineSearch className="mk" />
            </button>
            <li className="Home-heading-home-Home">
              <Link className="Home-tre-org-link" to="/account">
                Account
              </Link>
            </li>
            <img
              src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679648297/Avatar_b1rb5n.png"
              alt="profile"
              className="l"
            />
          </ul>
        </div>
      </div>
    )
  }
}

export default HeaderPage
