import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { BsFillBriefcaseFill } from 'react-icons/bs';
import './index.css';

const JobSections = props => {
  const { each1 } = props;
  return (
    <Link to={`/jobs/${each1.id}`} className="each1_hyperlink_remove">
      <li className="JobSections_Container">
        <div className="JobSections_Container_card">
          <div className="image_jobsection_container">
            <img
              src={each1.companyLogoUrl}
              className="image_jobsection"
              alt="company logo"
              key="company_logo_url"
            />
            <div className="image_jobsection_container2">
              <h1 className="image_jobsection_heading1">{each1.title}</h1>
              <div className="image_jobsection_container1">
                <FaStar className="image_jobsection_star" />
                <h1 className="image_jobsection_heading">{each1.rating}</h1>
              </div>
              <p className="rating_paragraph">{each1.rating}</p>
            </div>
          </div>
          <div className="location_container">
            <div className="image_jobsection_container1">
              <div className="image_jobsection_container1">
                <IoLocationSharp className="location_icon_jobsection" />
                <p className="location_para_jobsection">{each1.location}</p>
              </div>
              <div className="image_jobsection_container1">
                <BsFillBriefcaseFill className="location_icon_jobsection" />
                <p className="location_para_jobsection">
                  {each1.employmentType}
                </p>
              </div>
            </div>
            <p className="location_para_jobsection">{each1.packagePerAnnum}</p>
          </div>
          <hr className="each1_hyperlink_remove1" />
          <h1 className="image_jobsection_heading1">Description</h1>
          <p className="location_para_jobsection">{each1.jobDescription}</p>
        </div>
      </li>
    </Link>
  );
};

export default JobSections;
