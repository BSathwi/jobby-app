import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import AllJobs from './components/AllJobs'
import NotFound from './components/NotFound'
import JobDetails from './components/JobItemDetails'
import ProtectRoute from './components/ProtectedRoute'
import './App.css'
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectRoute exact path="/" component={Home} />
      <ProtectRoute exact path="/jobs" component={AllJobs} />
      <ProtectRoute exact path="/jobs/:id" component={JobDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
