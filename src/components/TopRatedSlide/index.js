import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

import TopRatedSlide from '../TopRatedSlider'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TopRatedMovies extends Component {
  state = {
    TopRatedMoviesList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getTopRatedMoviesList()
  }

  getTopRatedMoviesList = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const TopRatedUrl = 'https://apis.ccbp.in/movies-app/top-rated-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(TopRatedUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const UpdatedTopRatedDetails = data.results.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        TopRatedMoviesList: UpdatedTopRatedDetails,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  onClickTryButton = () => {
    const {TopRatedMoviesList} = this.state
    this.setState(
      {
        TopRatedMoviesList,
      },
      this.getTopRatedMoviesList(),
    )
  }

  renderSuccessView = () => {
    const {TopRatedMoviesList} = this.state
    return (
      <div>
        <ul className="Render-un-ordered-list">
          <TopRatedSlide TopRatedSliderMovie={TopRatedMoviesList} />
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="Render-failure-view-detail">
      <img
        src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679902480/alert-triangle_hemaln.png"
        alt="failure view"
      />
      <p className="Paragraph_list-something-list">
        Something Went Wrong Please try again
      </p>
      <button
        className="Render-button-try"
        type="button"
        onRetry={this.onClickTryButton}
      >
        Try Again
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="Render-loader-topRated-list" testid="loader">
      <Loader
        className="Render"
        type="TailSpin"
        color="#D81F26"
        height={50}
        width={50}
      />
    </div>
  )

  renderTotalSuccessView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.inProgress:
        return this.renderLoaderView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="render-div-container">
        {this.renderTotalSuccessView()}
      </div>
    )
  }
}
export default TopRatedMovies
