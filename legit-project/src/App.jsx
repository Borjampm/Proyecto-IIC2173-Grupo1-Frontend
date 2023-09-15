import './App.css'
import { Link } from 'react-router-dom'

function App() {

  return (
    <>
      <h1>Legit Bussines</h1>
      <Link to="/registration">
        <button className="btn">Get started</button>
      </Link>


    </>
  )
}

export default App 
