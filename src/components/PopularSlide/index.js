import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import HeaderPage from '../HeaderSlide'

import PoplarPoster from '../PopularPoster'

import ContactUs from '../ContactUs'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class PopularSlider extends Component {
  state = {
    PopularMovies: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  onClickPopularMovies = () => {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const PopularApi = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(PopularApi, options)
    const data = await response.json()
    if (response.ok === true) {
      const UpdatedPopular = data.results.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        PopularMovies: UpdatedPopular,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {PopularMovies} = this.state
    return (
      <div>
        <ul className="Popular-movies-list">
          <PoplarPoster PopularPosterList={PopularMovies} />
        </ul>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="Popular-loader-view" testid="loader">
      <Loader
        type="TailSpin"
        color="#D81F26"
        height={50}
        width={50}
        className="Popular-Loader-view"
      />
    </div>
  )

  renderFailureView = () => (
    <div className="Render-failure-popular">
      <img
        src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679902480/alert-triangle_hemaln.png"
        className="Popular-alert-Triangle"
        alt="failure view"
      />
      <p className="Popular-render-pa">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="Render-failure-button-popular"
        onClick={this.onClickPopularMovies}
      >
        Try Again
      </button>
    </div>
  )

  renderPopularSuccessView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <HeaderPage />
        <div className="Popular-container">
          {this.renderPopularSuccessView()}
        </div>
        <div className="akj">
          <ContactUs />
        </div>
      </>
    )
  }
}

export default PopularSlider
