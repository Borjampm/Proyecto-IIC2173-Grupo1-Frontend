import { useState, useEffect } from 'react';
import { AdminContext } from './AdminContext';
import { useAuth0 } from '@auth0/auth0-react';
import { jwtDecode } from "jwt-decode";

function AdminProvider({children}){
    const [ isAdmin, setIsAdmin ] = useState(false);

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        callSecureApi();
    }, []);

    const callSecureApi = async () => {
        try {
            const token = await getAccessTokenSilently();
            const decodedToken = jwtDecode(token);
            if (decodedToken.permissions[0] === "admin") {
                setIsAdmin(true)
            }
            console.log(decodedToken.permissions[0], "decodedToken")
        } catch (error) {
            console.log(error.message);
        }
    };

    function logoutAdmin(){
        setIsAdmin(false);
    }
    
    return (
        <AdminContext.Provider value={{isAdmin, setIsAdmin, logoutAdmin}}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminProvider;