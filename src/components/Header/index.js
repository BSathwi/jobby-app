import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav>
      <div className="nav_container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="home_image"
            alt="website logo"
          />
        </Link>
        <div>
          <ul className="unlist_nav">
            <li className="li_nav">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="li_nav">
              <Link to="/jobs" className="nav-link">
                Jobs
              </Link>
            </li>
            <li className="li_nav1">
              <Link to="/" className="nav-link">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                  className="li_nav1_image"
                  alt="home icon"
                />
              </Link>
            </li>
            <li className="li_nav1">
              <Link to="/jobs" className="nav-link">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                  className="li_nav1_image"
                  alt="jobs icon"
                />
              </Link>
            </li>
            <li className="li_nav1" onClick={onClickLogout}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                className="li_nav1_image"
                alt="logout icon"
              />
            </li>
          </ul>
        </div>
        <button type="button" className="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
