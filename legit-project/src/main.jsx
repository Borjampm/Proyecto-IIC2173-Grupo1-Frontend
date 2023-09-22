import React from 'react'
import ReactDOM from 'react-dom/client'
import Routing from './Routing'
import Navbar from './common/Navbar'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(


  <Auth0Provider
      domain="dev-ju2sb7gpzdrwv31f.us.auth0.com"
      clientId="Ss50jxHUP31QbXzYJHn2NHOiDP5CFrOP"
      redirectUri={"http://localhost:5173/my-profile/"}
      scope="openid profile email logins_count"
    >
      <Navbar />
      {/* <Navbar /> */}
      <Routing />
    </Auth0Provider>


)
