import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Skill from '../Skills'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    similarData: [],
    originalData: {},
    skillData: [],
    lifeCompany: {},
    status: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({status: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const api = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(api, options)
      if (response.ok) {
        const data = await response.json()
        const originalData = {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          title: data.job_details.title,
        }
        const similarData = data.similar_jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          rating: each.rating,
          title: each.title,
        }))
        const skillData = data.job_details.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        }))
        const lifeCompany = {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        }
        this.setState({
          originalData,
          similarData,
          skillData,
          lifeCompany,
          status: apiStatusConstants.success,
        })
      } else {
        this.setState({status: apiStatusConstants.failure})
      }
    } catch (error) {
      this.setState({status: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getData()
  }

  renderSuccessView = () => {
    const {similarData, originalData, skillData, lifeCompany} = this.state
    return (
      <div className="JobDetails_main_container">
        <div className="JobDetails_main_container1">
          <div className="image_jobsection_container">
            <img
              src={originalData.companyLogoUrl}
              className="image_jobsection"
              alt="company logo"
            />
            <div className="image_jobsection_container2">
              <h1 className="image_jobsection_heading1">
                {originalData.title}
              </h1>
              <div className="image_jobsection_container1">
                <FaStar className="image_jobsection_star" />
                <p className="image_jobsection_heading" key="rating">
                  {originalData.rating}
                </p>
              </div>
            </div>
          </div>
          <div className="location_container">
            <div className="image_jobsection_container1">
              <div className="image_jobsection_container1">
                <IoLocationSharp className="location_icon_jobsection" />
                <p className="location_para_jobsection">
                  {originalData.location}
                </p>
              </div>
              <div className="image_jobsection_container1">
                <BsFillBriefcaseFill className="location_icon_jobsection" />
                <p className="location_para_jobsection">
                  {originalData.employmentType}
                </p>
              </div>
            </div>
            <p className="location_para_jobsection">
              {originalData.packagePerAnnum}
            </p>
          </div>
          <hr />
          <div className="descriptionDetails">
            <h1 className="jobs_heading1">Description</h1>
            <a
              href={originalData.companyWebsiteUrl}
              target="_blank"
              className="anchor_element"
              rel="noopener noreferrer"
            >
              Visit <BsBoxArrowUpRight />
            </a>
          </div>

          <p className="location_para_jobdetails">
            {originalData.jobDescription}
          </p>
          <h1 className="jobs_heading1">Skills</h1>
          <ul className="unlist_skills">
            {skillData.map(each => (
              <Skill each1={each} key={each.name} />
            ))}
          </ul>
          <h1 className="jobs_heading1">Life at Company</h1>
          <div className="life_at_company">
            <div className="life_at_company1">
              <p className="location_para_jobdetails">
                {lifeCompany.description}
              </p>
            </div>
            <div className="life_at_company2">
              <img
                src={lifeCompany.imageUrl}
                className="location_image_jobdetails"
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <div></div>
        <h1 className="jobs_heading1">Similar Jobs</h1>
        <ul className="similar_content">
          {similarData.map(each => (
            <SimilarJobs originalData={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure_view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="username_container_failure" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {status} = this.state
    switch (status) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default JobDetails
