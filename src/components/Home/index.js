import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const Home = () => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to='/login' />
  }
  return (
    <div>
      <Header />
      <div className='card11_container'>
        <div className='heading_text_container'>
          <h1 className='Header_heading'>Find The Job That Fits Your Life</h1>
          <p className='Header_paragraph'>
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to='/jobs'>
            <button className='Header_button'>Find Jobs</button>
          </Link>
        </div>
      </div>
      <Link to='/'>
        <div>Home</div>
      </Link>
    </div>
  )
}

export default Home
