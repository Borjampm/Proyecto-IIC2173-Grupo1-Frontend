import React from 'react'
import ReactDOM from 'react-dom/client'
import Routing from './Routing'
import Navbar from './common/Navbar'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import { DOMAIN, CLIENT_ID, REDIRECT_URI, SCOPE, AUTH0_AUDIENCE } from './config'
import AdminProvider from './admin/AdminProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={DOMAIN}
    clientId={CLIENT_ID}
    
    authorizationParams={{
      audience:AUTH0_AUDIENCE, // taken from your API in Auth0
      redirectUri:REDIRECT_URI
    }}
    scope={SCOPE}
  >
    <AdminProvider>
      <Navbar />
      <Routing />
    </AdminProvider>
  </Auth0Provider>
)
