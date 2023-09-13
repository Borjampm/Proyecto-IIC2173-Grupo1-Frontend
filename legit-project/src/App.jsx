import CommonButton from './common/CommonButton'
import './App.css'
import { Link } from 'react-router-dom'

function App() {

  return (
    <>
      <h1>Legit Bussines</h1>
      <Link to="/registration">
        <CommonButton message="Get started" />
      </Link>


    </>
  )
}

export default App
