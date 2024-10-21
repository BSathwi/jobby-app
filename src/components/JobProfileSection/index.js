import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import UserName from '../UserProfile'
import FilterData from '../FilterData'
import JobSections from '../JobSections'
import './index.css'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobProfileSection extends Component {
  state = {
    jobsData: [],
    radioData: '',
    selectedEmploymentTypes: [],
    status: apiStatusConstants.initial,
    searchInputText: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  updatedRadioFilter = id => {
    this.setState(
      {
        radioData: id,
      },
      this.getJobs,
    )
  }

  updatedCheckBoxFilter = (id, checked) => {
    this.setState(prevState => {
      const {selectedEmploymentTypes} = prevState
      if (checked) {
        return {
          selectedEmploymentTypes: [...selectedEmploymentTypes, {id, checked}],
        }
      } else {
        const updatedSelection = selectedEmploymentTypes.filter(
          item => item.id !== id,
        )
        return {
          selectedEmploymentTypes: updatedSelection,
        }
      }
    }, this.getJobs)
  }

  searchUpdate = event => {
    this.setState(
      {
        searchInputText: event.target.value,
      },
      this.getJobs,
    )
  }

  getJobs = async () => {
    const {radioData, selectedEmploymentTypes, searchInputText} = this.state
    this.setState({
      status: apiStatusConstants.inProgress,
    })
    const employmentTypes = selectedEmploymentTypes
      .map(item => item.id)
      .join(',')
    const jwtToken = Cookies.get('jwt_token')
    const api = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${radioData}&search=${searchInputText}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(api, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(product => ({
        companyLogoUrl: product.company_logo_url,
        employmentType: product.employment_type,
        jobDescription: product.job_description,
        id: product.id,
        location: product.location,
        packagePerAnnum: product.package_per_annum,
        rating: product.rating,
        title: product.title,
      }))
      this.setState({
        jobsData: updatedData,
        status: apiStatusConstants.success,
      })
    } else {
      this.setState({
        status: apiStatusConstants.failure,
      })
    }
  }

  static renderSuccess(jobsData) {
    return (
      <div>
        {jobsData.length !== 0 ? (
          <ul className="unlist_JobProfileSection">
            {jobsData.map(each => (
              <JobSections each1={each} key={each.id} />
            ))}
          </ul>
        ) : (
          <div className="failure_jobprofile_section11">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="failure_jobprofile_section"
            />
            <h1>No Jobs view image URL</h1>
          </div>
        )}
      </div>
    )
  }

  static renderLoadingView() {
    return (
      <div className="username_container_failure" data-testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    )
  }

  static renderFailure() {
    return (
      <div className="failure_jobprofile_section">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
      </div>
    )
  }

  render() {
    const {jobsData, status} = this.state
    return (
      <div className="JobProfileSection_container">
        <div className="JobProfileSection_card2">
          <UserName />
          <hr />
          <h1 className="JobProfileSection_card2_heading">
            Type of Employment
          </h1>
          <FilterData
            employmentTypesList1={employmentTypesList}
            salaryRangesList1={salaryRangesList}
            updatedRadioFilter1={this.updatedRadioFilter}
            updatedCheckBoxFilter1={this.updatedCheckBoxFilter}
          />
        </div>

        <div className="JobProfileSection_card1">
          <input
            type="search"
            className="login_input1 input_field_size_jobsection"
            placeholder="Search..."
            onChange={this.searchUpdate}
          />
          <button type="button" data-testid="searchButton">
            <BsSearch className="search-icon" />
          </button>
          {(() => {
            switch (status) {
              case apiStatusConstants.success:
                return JobProfileSection.renderSuccess(jobsData)
              case apiStatusConstants.failure:
                return JobProfileSection.renderFailure()
              case apiStatusConstants.inProgress:
                return JobProfileSection.renderLoadingView()
              default:
                return null
            }
          })()}
        </div>
      </div>
    )
  }
}

export default JobProfileSection
