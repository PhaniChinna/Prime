import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'

import HeaderSearch from '../SearchHeaderSlide'

import ContactUs from '../ContactUs'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SearchRoute extends Component {
  state = {
    searchMoviesData: [],
    searchInput: '',
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getSearchMovieDetails()
  }

  getSearchMovieDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const SearchUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(SearchUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const SearchInputData = data.results.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        searchMoviesData: SearchInputData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onEnterKey = event => {
    if (event.key === 'Enter') {
      this.getSearchMovieDetails()
    }
  }

  renderSuccessDataLIst = () => {
    const {searchMoviesData, searchInput} = this.state
    const jobsDisplay = searchMoviesData.length > 0
    return jobsDisplay ? (
      <div className="Search-screen-container">
        <ul className="Search-input-unOrdered-list">
          {searchMoviesData.map(each => (
            <li>
              <Link to={`/movies/${each.id}`} key={each.id}>
                <img
                  src={each.posterPath}
                  alt={each.title}
                  className="search-input-search"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div className="failure-container">
        <img
          src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1680503281/Group_7394_d3uobr.png"
          className="search-image-cont"
          alt="Ohno"
        />
        <p className="Search-did-not-matches">
          You are searched {searchInput} did not find any matches
        </p>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="Render-search-loader-view" testid="loader">
      <Loader
        type="TailSpin"
        color="#D81F26"
        height="50"
        width="50"
        className="Loader-view-list"
      />
    </div>
  )

  renderFailureView = () => (
    <div className="render-failure-view-container">
      <img
        src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679902480/alert-triangle_hemaln.png"
        className="Alert-search-input"
        alt="alert"
      />
      <p className="Search-input-something">
        Something went wrong please try again
      </p>
      <button className="Search-button-try-again" type="button">
        Try Again
      </button>
    </div>
  )

  renderEmptyView = () => {
    const {searchInput} = this.state
    const isEmpty = searchInput === ''
    return (
      <div>
        {isEmpty ? (
          <div className="Render-search-icon-container">
            <h1 className="Render-search-filter-paragraph">
              Search the movie,by clicking on the search Icon
            </h1>
          </div>
        ) : (
          this.renderSuccessDataLIst()
        )}
      </div>
    )
  }

  renderTotalSuccessViewDetail = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderEmptyView()
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
      <>
        <div className="Search-Header-container">
          <HeaderSearch />
        </div>
        <div className="Search-slider-container">
          <div className="Search-div-container">
            <input
              className="Slider-input-width"
              onChange={this.onChangeSearchInput}
              type="search"
              onKeyDown={this.onEnterKey}
            />
            <div className="Search-input-inside-container">
              <button
                className="Search-icon-button-slider"
                type="button"
                testid="searchButton"
                onClick={this.getSearchMovieDetails}
              >
                <HiOutlineSearch className="Gr-search-icon" />
              </button>
            </div>
          </div>
          <div>{this.renderTotalSuccessViewDetail()}</div>
          <div>
            <ContactUs />
          </div>
        </div>
      </>
    )
  }
}

export default SearchRoute
