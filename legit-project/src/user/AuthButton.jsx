import { useAuth0 } from '@auth0/auth0-react';
import { useContext } from 'react';
import { AdminContext } from '../admin/AdminContext';

const AuthButton = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    const { logoutAdmin } = useContext(AdminContext);

    const handleLogout = () => {
      logout();
      logoutAdmin();
    };
  
    return (
      <div className='auth-btn'>
        {isAuthenticated ? (
          <button onClick={handleLogout}>Log Out</button>
        ) : (
          <button onClick={() => loginWithRedirect()}>Log In</button>
        )}
      </div>
    );
  };

export default AuthButton