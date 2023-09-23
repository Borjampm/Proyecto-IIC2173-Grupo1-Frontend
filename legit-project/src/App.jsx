import './App.css'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';


function App() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <>
    <div className='welcome-home'>
    { user ? (
      <>
        <h2 className="welcome">Welcome {user.email}</h2>
        {/* <h2 className="welcome-email"></h2> */}
      </>
    ): (
      <h2 className="welcome">Welcome</h2>)}
      <h1>Legit Bussines</h1>
      <Link to="/stocks">
        <button className="btn">Get started</button>
      </Link>

      </div>
    </>
  )
}

export default App 
