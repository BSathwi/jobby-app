import JobProfileSection from '../JobProfileSection'
import Header from '../Header'
import './index.css'
const AllJobs = () => {
  return (
    <div>
      <Header />
      <div className="alljobs_container">
        <JobProfileSection />
      </div>
    </div>
  )
}
export default AllJobs
