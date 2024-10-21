import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserName extends Component {
  state = {profileData: {}, status: apiStatusConstants.initial}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      status: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const api = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(api, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedProfile = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileData: updatedProfile,
        status: apiStatusConstants.success,
      })
    } else {
      this.setState({
        status: apiStatusConstants.failure,
      })
    }
  }

  renderFailure = () => {
    return (
      <div className="username_container_failure">
        <button
          type="button"
          className="username_container_failure_button"
          onClick={this.getData}
        >
          Retry
        </button>
      </div>
    )
  }

  renderLoadingView = () => {
    return (
      <div className="username_container_failure" testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    )
  }

  renderSuccess() {
    const {profileData} = this.state
    console.log(profileData)
    return (
      <div className="username_container_jobsection1">
        <div>
          <img
            src={profileData.profileImageUrl}
            alt="profile"
            key="profile_image_url"
          />
          <h1 className="profile_heading">{profileData.name}</h1>
          <p className="profile_para">{profileData.shortBio}</p>
        </div>
      </div>
    )
  }

  render() {
    const {status} = this.state
    switch (status) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default UserName
