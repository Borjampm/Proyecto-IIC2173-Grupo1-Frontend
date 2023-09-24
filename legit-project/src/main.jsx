import React from 'react'
import ReactDOM from 'react-dom/client'
import Routing from './Routing'
import Navbar from './common/Navbar'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import { DOMAIN, CLIENT_ID, REDIRECT_URI, SCOPE } from './config'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={DOMAIN}
    clientId={CLIENT_ID}
    redirectUri={REDIRECT_URI}
    scope={SCOPE}
  >
    <Navbar />
    <Routing />

  </Auth0Provider>
)
