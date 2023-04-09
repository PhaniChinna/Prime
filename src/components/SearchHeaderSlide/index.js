import {Link} from 'react-router-dom'

import './index.css'

const HeaderSearch = () => (
  <>
    <div className="Header-search">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679643790/Group_7399_bzo5kj.png"
          className="Header-search"
          alt="Logo "
        />
      </Link>
    </div>
  </>
)

export default HeaderSearch
