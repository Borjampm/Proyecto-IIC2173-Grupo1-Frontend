import { useAuth0 } from '@auth0/auth0-react';

const AuthButton = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  
    return (
      <div>
        {isAuthenticated ? (
          <button onClick={() => logout()}>Log Out</button>
        ) : (
          <button onClick={() => loginWithRedirect()}>Log In</button>
        )}
      </div>
    );
  };

export default AuthButton