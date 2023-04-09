import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsBoxArrowInUpRight} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import HeaderPage from '../HeaderSlide'

import HomeTrendingList from '../HomeTrending'

import TrendingSlider from '../TrendingSlide'

import TopRatedMovies from '../TopRatedSlide'

import OriginalSlider from '../OriginalSlide'

import ContactUs from '../ContactUs'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomePage extends Component {
  state = {
    HomeTrending: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getHomeTrendingList()
  }

  onClickFailureButton = () => {
    this.getHomeTrendingList()
  }

  getHomeTrendingList = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const TrendingUrl = ' https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(TrendingUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const fetchedData = data.results.length
      const randomPoster = data.results[Math.floor(Math.random() * fetchedData)]
      const updatedData = {
        id: randomPoster.id,
        backdropPath: randomPoster.backdrop_path,
        overview: randomPoster.overview,
        title: randomPoster.title,
      }
      this.setState({
        HomeTrending: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderLoaderView = () => (
    <div className="Render-loader-view">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="Render-failure-view-button">
      <img
        src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679902480/alert-triangle_hemaln.png"
        alt="danger"
      />
      <p className="Something-went-wrong-para">
        Something went wrong please try again
      </p>
      <button
        onClick={this.onClickFailureButton}
        className="render-failure-button-list"
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderHomeSliderSuccessView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderHomeTrending()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  renderHomeTrending = () => {
    const {HomeTrending} = this.state
    return (
      <ul className="Home-list-un-ordered-list">
        <HomeTrendingList TrendingMoviesHome={HomeTrending} />
      </ul>
    )
  }

  render() {
    return (
      <>
        <div className="Header-home-container">
          <HeaderPage />
        </div>
        <div className="Home-route-card-container">
          <div className="Home-card-container-Route">
            <div className="Home-list-card-Route">
              {this.renderHomeSliderSuccessView()}
            </div>
          </div>
          <div className="Trending-list-container-Route">
            <div className="Header-home-container">
              <h1 className="Heading-Trending-Route">Trending</h1>
              <Link to="/trending">
                <BsBoxArrowInUpRight className="Header-Bs-ox-Arrow" />
              </Link>
            </div>
            <TrendingSlider />
          </div>
          <div className="Trending-top-rated-container-Route">
            <div className="Top-rated-container">
              <h1 className="Top-rared-hading-Route">Top Rated</h1>
              <Link to="/topRated">
                <BsBoxArrowInUpRight className="Header-Bs-ox-Arrow-list" />
              </Link>
            </div>
            <TopRatedMovies />
          </div>
          <div className="Originals-movies-container-Route">
            <div className="Originals-container">
              <h1 className="Originals-route-Originals-Route">Originals</h1>
              <Link to="/original">
                <BsBoxArrowInUpRight className="Header-Bs-ox-Arrow-list-original" />
              </Link>
            </div>
            <OriginalSlider />
          </div>
          <div>
            <ContactUs />
          </div>
        </div>
      </>
    )
  }
}
export default HomePage
