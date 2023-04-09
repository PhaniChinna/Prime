import {Component} from 'react'
import Cookies from 'js-cookie'

import HeaderPage from '../HeaderSlide'

import PoplarPoster from '../PopularPoster'

import ContactUs from '../ContactUs'

import './index.css'

class PopularSlider extends Component {
  state = {
    PopularMovies: [],
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
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

  render() {
    return (
      <>
        <HeaderPage />
        <div className="Popular-container">{this.renderSuccessView()}</div>
        <div className="akj">
          <ContactUs />
        </div>
      </>
    )
  }
}

export default PopularSlider
