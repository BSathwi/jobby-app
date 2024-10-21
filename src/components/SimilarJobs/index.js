import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
const SimilarJobs = props => {
  const {originalData} = props
  return (
    <li className="similar_content_li">
      <div className="image_jobsection_container">
        <img
          src={originalData.companyLogoUrl}
          alt="company logo"
          className="image_jobsection"
        />
        <div className="image_jobsection_container2">
          <h1 className="image_jobsection_heading1">{originalData.title}</h1>
          <div className="image_jobsection_container1">
            <FaStar className="image_jobsection_star" />
            <h1 className="image_jobsection_heading">{originalData.rating}</h1>
          </div>
        </div>
      </div>
      <h1 className="image_jobsection_heading1">Description</h1>
      <p className="location_para_jobsection">{originalData.jobDescription}</p>
      <div className="image_jobsection_container1">
        <div className="image_jobsection_container1">
          <IoLocationSharp className="location_icon_jobsection" />
          <p className="location_para_jobsection">{originalData.location}</p>
        </div>
        <div className="image_jobsection_container1">
          <BsFillBriefcaseFill className="location_icon_jobsection" />
          <p className="location_para_jobsection">
            {originalData.employmentType}
          </p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
