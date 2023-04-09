import Slider from 'react-slick'
import {Link} from 'react-router-dom'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const TopRatedSlide = props => {
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
  const {TopRatedSliderMovie} = props
  return (
    <>
      <Slider {...settings} className="Top-Rated-slider-width">
        {TopRatedSliderMovie.map(each => (
          <li key={each.id} className="Top-least-container">
            <Link to={`/movies/${each.id}`}>
              <img
                src={each.posterPath}
                alt={each.title}
                key={each.id}
                className="Top-rated-slide-images"
              />
            </Link>
          </li>
        ))}
      </Slider>
    </>
  )
}

export default TopRatedSlide
