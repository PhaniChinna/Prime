import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import TrendingSlides from '../TrendingSlider'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TrendingSlider extends Component {
  state = {
    TrendingMovies: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getTrendingMoviesListDetails()
  }

  getTrendingMoviesListDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const TrendUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(TrendUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const TrendingMoviesDetail = data.results.map(each => ({
        id: each.id,
        title: each.title,
        posterPath: each.poster_path,
      }))
      this.setState({
        TrendingMovies: TrendingMoviesDetail,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderTrendingSlideSuccessView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderTrendingSuccessView()
      case apiStatusConstant.inProgress:
        return this.renderLoaderView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderTrendingSuccessView = () => {
    const {TrendingMovies} = this.state
    return (
      <>
        <div>
          <ul className="Trending-movie-slide">
            <TrendingSlides TrendingSlideMovie={TrendingMovies} key="name" />
          </ul>
        </div>
      </>
    )
  }

  renderLoaderView = () => (
    <div className="List-Loader-container" testid="loader">
      <Loader
        className="List-Loader"
        type="TailSpin"
        color="#D81F26"
        height="50"
        width="50"
      />
    </div>
  )

  onClickButtonRender = () => {
    this.getTrendingMoviesListDetails()
  }

  renderFailureView = () => (
    <div className="List-render-failure">
      <img
        src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679902480/alert-triangle_hemaln.png"
        alt="failure view"
        className="List-Render-danger-image"
      />
      <p className="List-render">Something went wrong. Please try again</p>
      <button
        className="List-button-container"
        type="button"
        onRetry={this.onClickButtonRender}
      >
        Try Again
      </button>
    </div>
  )

  render() {
    return <div className="R">{this.renderTrendingSlideSuccessView()}</div>
  }
}

export default TrendingSlider
