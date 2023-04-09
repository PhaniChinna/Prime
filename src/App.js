import {Switch, Route, Redirect} from 'react-router-dom'
import LoginPage from './components/LoginSlider'
import ProtuctedRoute from './components/ProtuctedSlide'
import OriginalRoute from './components/OriginalRoute'
import TopRatedRoute from './components/TopRatedRoute'
import MovieDetails from './components/MovieDetails'
import PopularSlider from './components/PopularSlide'
import AccountRoute from './components/AccountSlide'
import SearchRoute from './components/SearchSlide'
import NotFoundRoute from './components/NotFoundSlide'
import HomePage from './components/HomeSlider'

import TrendingRoute from './components/TrendingRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtuctedRoute exact path="/" component={HomePage} />
    <ProtuctedRoute exact path="/trending" component={TrendingRoute} />
    <ProtuctedRoute exact path="/original" component={OriginalRoute} />
    <ProtuctedRoute exact path="/topRated" component={TopRatedRoute} />
    <ProtuctedRoute exact path="/movies/:id" component={MovieDetails} />
    <ProtuctedRoute exact path="/popular" component={PopularSlider} />
    <ProtuctedRoute exact path="/account" component={AccountRoute} />
    <ProtuctedRoute exact path="/search" component={SearchRoute} />
    <Route path="/not-found" component={NotFoundRoute} />
    <Redirect to="/not-found" />
  </Switch>
)
export default App
