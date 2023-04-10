import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
  }

  onChangeUser = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitSuccessData = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showError: true,
      errorMsg,
    })
  }

  onSubmitSuccess = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const UserDetails = {username, password}
    const LoginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(UserDetails),
    }
    const response = await fetch(LoginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccessData(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderLoinButton = () => (
    <div>
      <button type="submit" className="Login-button">
        Login
      </button>
    </div>
  )

  renderLoginButtonBack = () => (
    <div className="Render-login-container">
      <button type="submit" className="Login-button-back-color-red">
        Login
      </button>
    </div>
  )

  render() {
    const {username, password, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const PasswordLength = password.length >= 6
    if (PasswordLength) {
      this.renderLoinButton()
    } else {
      this.renderLoginButtonBack()
    }

    return (
      <div className="Login-page-container">
        <div className="Login-Page-Movies-card">
          <img
            src="https://res.cloudinary.com/dkwof0tuj/image/upload/v1679652587/Group_7399_2_x2dqea.png"
            className="Image-website-logo"
            alt="login website logo"
          />
        </div>
        <div className="Login-opacity-container">
          <div className="Login-container-page">
            <form
              className="Login-form-container"
              onSubmit={this.onSubmitSuccess}
            >
              <h1 className="Login-header-container">Login</h1>
              <label className="label-username" htmlFor="username">
                USERNAME
              </label>
              <input
                className="Input-label"
                id="username"
                onChange={this.onChangeUser}
                value={username}
                type="text"
                placeholder="Username"
              />
              <label className="label-password" htmlFor="Password">
                PASSWORD
              </label>
              <input
                className="Password-Input"
                type="password"
                value={password}
                onChange={this.onChangePassword}
                id="Password"
                placeholder="Password"
              />
              {showError && <p className="Error-login-msg">*{errorMsg}</p>}
              {PasswordLength
                ? this.renderLoinButton()
                : this.renderLoginButtonBack()}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage
