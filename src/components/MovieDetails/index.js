import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import HeaderPage from '../HeaderSlide'

import GeneresSlider from '../GenresSlide'

import SpokenLanguageSlide from '../SpokenLanguagesSlide'

import SimilarPoster from '../SimilarPoster'

import ContactUs from '../ContactUs'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieDetails extends Component {
  state = {
    movieDetailsList: {},
    genreDetailList: [],
    SpokenLanguage: [],
    SimilarDataList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getMovieDetailsList()
  }

  getMovieDetail = data => ({
    adult: data.adult,
    backdropPath: data.backdrop_path,
    budget: data.budget,
    id: data.id,
    overview: data.overview,
    releaseDate: data.release_date,
    runtime: data.runtime,
    title: data.title,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
  })

  onClickButton = () => {
    this.getMovieDetailsList()
  }

  getMovieDetailsList = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const movieDetailUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(movieDetailUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const MovieDetailsUpdatedResult = this.getMovieDetail(data.movie_details)
      const GenresDetailsList = data.movie_details.genres.map(each => ({
        id: each.id,
        name: each.name,
      }))
      const SpokenLanguageDetails = data.movie_details.spoken_languages.map(
        each => ({
          id: each.id,
          englishName: each.english_name,
        }),
      )
      const SimilarDetailsList = data.movie_details.similar_movies.map(
        each => ({
          id: each.id,
          posterPath: each.poster_path,
          title: each.title,
        }),
      )
      this.setState({
        movieDetailsList: MovieDetailsUpdatedResult,
        genreDetailList: GenresDetailsList,
        SpokenLanguage: SpokenLanguageDetails,
        SimilarDataList: SimilarDetailsList,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderLoaderView = () => (
    <div className="render-Loader-view-movie-details" testid="loader">
      <Loader
        className="Loader-movie-details"
        type="TailSpin"
        color="#D81F26"
        height={50}
        width={50}
      />
    </div>
  )

  renderFailureView = () => (
    <div className="Render-failure-movie-details">
      <img
        src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679902480/alert-triangle_hemaln.png"
        alt="failure view"
      />
      <p className="Movie-details-paragraph">
        Something went wrong. Please try again
      </p>
      <button
        className="Render-button-failure "
        type="button"
        onClick={this.onClickButton}
      >
        Try Again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {
      movieDetailsList,
      genreDetailList,
      SpokenLanguage,
      SimilarDataList,
    } = this.state
    const {
      adult,
      backdropPath,
      budget,
      overview,
      releaseDate,
      runtime,
      id,
      title,
      voteAverage,
      voteCount,
    } = movieDetailsList
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    const date = new Date(releaseDate)
    const releaseDateYear = date.getFullYear()
    const releaseDateMonth = date.getMonth()
    const releaseDateDay = date.getDay()

    return (
      <li key={id} className="List-Item">
        <img
          src={backdropPath}
          alt={title}
          className="Each-movieDetail-image"
        />
        <div className="Movie-hrs-OView-container">
          <h1 value="title" className="Movie-detail-title">
            {title}
          </h1>
          <div className="Movie-hrs-adu-yea-mon-date-container">
            <p className="Movie-hrs-minutes">{`${hours}h ${minutes}m`}</p>
            <p value="adult" className="Adult-movie-details">
              {adult ? 'A' : 'U / A'}
            </p>
            <p className="Rel-date-rel-mon-rel-year">{`${releaseDateDay}-${releaseDateMonth}-${releaseDateYear}`}</p>
          </div>
          <div className="Movie-overview-container">
            <p className="OverView-list-card">{overview}</p>
          </div>
          <button className="Movie-play-button" type="button">
            Play
          </button>
        </div>
        <div className="List-card">
          <h1 className="Genres-cont-heading">Genres</h1>
          <div className="Movie-details-row">
            <ul className="Movie-detail-unOrdered-list">
              {genreDetailList.map(each => (
                <GeneresSlider key={each.id} Generes={each} />
              ))}
            </ul>
            <div>
              <h1 className="Audio-Movie-Details-Route">Audio Available</h1>
              <div>
                <ul className="Movies-un-ordered-list-spoken">
                  {SpokenLanguage.map(each => (
                    <SpokenLanguageSlide key={each.id} SpokenLanguage={each} />
                  ))}
                </ul>
              </div>
            </div>
            <div className="Movie-details-Rating">
              <h1 className="MovieDetail-Rating">Rating Count</h1>
              <p className="Movie-Vote-Count">{voteCount}</p>
              <h1 className="Movie-Rat-Avg">Rating Average</h1>
              <p className="Voting-Average">{voteAverage}</p>
            </div>
            <div className="Movie-detail-budget-count">
              <h1 className="Movie-Budget-heading-list">Budget</h1>
              <p className="Movie-Budget">{budget}</p>
              <h1 className="Movie-Release-date">Release Date</h1>
              <p className="Movie-release-date-list">{releaseDate}</p>
            </div>
          </div>
          <div>
            <h1 className="More-Movies-like">More like this</h1>
            <ul className="Movie-detail-similar-movies">
              <SimilarPoster SimilarPosterList={SimilarDataList} />
            </ul>
          </div>
        </div>
      </li>
    )
  }

  renderTotalSuccessView = () => {
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
        <div className="Movie-details-route-container">
          {this.renderTotalSuccessView()}
        </div>
        <div>
          <ContactUs />
        </div>
      </>
    )
  }
}

export default MovieDetails
