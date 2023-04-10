import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import OriginalSliderList from '../OriginalSlider'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class OriginalSlider extends Component {
  state = {
    OriginalMovies: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getOriginalMovies()
  }

  getOriginalMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const OriginalUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(OriginalUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const OriginalMoviesData = data.results.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        OriginalMovies: OriginalMoviesData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {OriginalMovies} = this.state
    return (
      <>
        <div>
          <ul className="Original-slider">
            <OriginalSliderList OriginalSliderMovies={OriginalMovies} />
          </ul>
        </div>
      </>
    )
  }

  renderButtonClick = () => {
    this.getOriginalMovies()
  }

  renderLoaderView = () => (
    <div className="Render-loader-list-cars" testid="loader">
      <Loader
        type="TailSpin"
        color="#D81F26"
        height={50}
        width={50}
        className="Tail-rounding"
      />
    </div>
  )

  renderFailureView = () => (
    <div className="Render_loader-v">
      <img
        src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679902480/alert-triangle_hemaln.png"
        alt="failure view"
      />
      <p className="SomeThing-went-wrong">
        something went wrong please try again
      </p>
      <button
        className="Render-button-list-car"
        type="button"
        onClick={this.renderButtonClick}
      >
        Try Again
      </button>
    </div>
  )

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
    return <div>{this.renderOriginalSuccess()}</div>
  }
}
export default OriginalSlider
