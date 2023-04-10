import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import OriginalPoster from '../OriginalPoster'

import HomTreTopOrg from '../HomTreTopOrigHeading'

import ContactUs from '../ContactUs'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class OriginalRoute extends Component {
  state = {
    OriginalMoviesList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getComponentOriginal()
  }

  getComponentOriginal = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const TreUrl = 'https://apis.ccbp.in/movies-app/originals'
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
        OriginalMoviesList: UpdatedResponse,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  onClickButtonOriginal = () => {
    this.getComponentOriginal()
  }

  renderLoaderView = () => (
    <div className="Render-loader-view" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="Render-failure-view">
      <img
        src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679902480/alert-triangle_hemaln.png"
        alt="failure view"
      />
      <p className="Render-trending-something-para">
        Something went wrong Please try again
      </p>
      <button
        type="button"
        className="renderButton-Trending"
        onClick={this.onClickButtonOriginal}
      >
        Try Again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {OriginalMoviesList} = this.state
    return (
      <>
        <div>
          <ul className="Original-movies-un-ordered-list">
            <OriginalPoster OriginalListPoster={OriginalMoviesList} />
          </ul>
        </div>
      </>
    )
  }

  renderOriginalSuccess = () => {
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
        <div className="Original-return-container">
          <h1 className="Originals-Route-list-crd">Originals</h1>
          {this.renderOriginalSuccess()}
        </div>
        <div className="Op">
          <ContactUs />
        </div>
      </>
    )
  }
}

export default OriginalRoute
