import Slider from 'react-slick'

import {Link} from 'react-router-dom'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const OriginalSliderList = props => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }
  const {OriginalSliderMovies} = props
  return (
    <>
      <Slider {...settings} className="Original-slider-width">
        {OriginalSliderMovies.map(each => (
          <li key={each.id} className="Original-least-container">
            <Link to={`/movies/${each.id}`}>
              <img
                src={each.posterPath}
                alt={each.title}
                key={each.id}
                className="Original-rated-slide-images"
              />
            </Link>
          </li>
        ))}
      </Slider>
    </>
  )
}

export default OriginalSliderList
