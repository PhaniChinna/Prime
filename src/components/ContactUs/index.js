import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const ContactUs = () => (
  <>
    <div className="Render-contact-us-container">
      <div className="Render-contact-us-view">
        <FaGoogle className="Google-image" />
        <FaTwitter className="Twitter-image" />
        <FaInstagram className="Instagram-image" />
        <FaYoutube className="YouTube-Image" />
      </div>
      <p className="Contact-us-heading">contact Us</p>
    </div>
  </>
)

export default ContactUs
