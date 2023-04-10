import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import TrendingPoster from '../TrendingPoster'

import HomTreTopOrg from '../HomTreTopOrigHeading'

import ContactUs from '../ContactUs'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TrendingRoute extends Component {
  state = {
    TrendingMoviesList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getComponentTrending()
  }

  getComponentTrending = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const TreUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(TreUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const UpdatedResponse = data.results.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        TrendingMoviesList: UpdatedResponse,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  onClickButtonTrending = () => {
    this.getComponentTrending()
  }

  renderSuccessView = () => {
    const {TrendingMoviesList} = this.state
    return (
      <>
        <div className="kak">
          <ul className="Trending-movies-un-ordered-list">
            <TrendingPoster TrendingListPoster={TrendingMoviesList} />
          </ul>
        </div>
      </>
    )
  }

  renderLoaderView = () => (
    <div className="render-loader-Trending" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="Render-failure-view-Trending">
      <img
        src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679902480/alert-triangle_hemaln.png"
        alt="failure view"
      />
      <p className="Render-trending-paragraph">
        Something went wrong please try again
      </p>
      <button
        className="Render-button-Trending"
        type="button"
        onClick={this.onClickButtonTrending}
      >
        Try Again
      </button>
    </div>
  )

  renderTrendingSuccessView = () => {
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
        <HomTreTopOrg />
        <div className="Trending-list-render-return-container">
          <h1 className="Render-Trending">Trending</h1>
          {this.renderTrendingSuccessView()}
        </div>
        <div className="Jl">
          <ContactUs />
        </div>
      </>
    )
  }
}

export default TrendingRoute
