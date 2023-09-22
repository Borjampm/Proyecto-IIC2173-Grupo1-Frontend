import NavbarItem from "./NavbarItem";
import { useState, useEffect } from 'react'
import './Navbar.css'
import { useAuth0 } from '@auth0/auth0-react';

function Navbar() {
    const { user, getIdTokenClaims, isLoading, error } = useAuth0();

    useEffect(() => {
      const fetchData = async () => {
        try {
          if (!isLoading) {
            const idToken = await getIdTokenClaims();
            console.log('User ID Token:', idToken);
            // You can use the ID token as needed.
          }
        } catch (err) {
          console.error('Error during silent authentication:', err);
        }
      };
  
      fetchData();
    }, [isLoading, getIdTokenClaims]);

    // if (isLoading) {
    //     return <div>Loading...</div>;
    //   }
    
    //   if (error) {
    //     return <div>Error: {error.message}</div>;
    //   }

    return (
        <header>
            <nav>
                <ul>
                    <NavbarItem text={"Home"} link={"/"}/>
                    <NavbarItem text={"Companies"} link={"/stocks"}/>
                    {/* <NavbarItem text={"Nosotros"} link={"/"} />   */}

                    <div className="right">
                        {/* <div className="dropdown">
                            <NavbarItem text={"Mi Sesión"} className={"dropbtn"} link={"/my-profile"}  /> */}
                            {/* <div className="dropdown-content">
                                {
                                    <NavbarItem text={"Registrarse"} link={"/registration"} />
                                }
                            </div> */}
                        {/* </div> */}
                        {user ? (
                            <NavbarItem text={"Mi Perfil"} className={"dropbtn"} link={"/my-profile"}  />
                        ) : (
                            <NavbarItem text={"Iniciar Sesión"} link={"/log-in/"} />)}
                    </div>
                </ul>
            </nav>
        </header>
    );
}

// Propuesta de navbar cuando se tenga un usuario logeado:
/*
function Navbar() {
    const { isLoged } = useContext(AuthContext);

    return (
        <header>
            <nav>
                <ul>
                    <li className="logonav">
                        <a href="/"> 
                            <h1>"Grupo 1"</h1>
                        </a>
                    </li>

                    <NavbarItem text={"Acerca de"} link={"/"}/>
                    <NavbarItem text={"Nosotros"} link={"/"} />  

                    <div className="right">
                        <div className="dropdown">
                            <NavbarItem text={"Mi Sesión"} className={"dropbtn"} />
                            <div className="dropdown-content">
                                {
                                    (isLoged) ? (
                                        <NavbarItem text={"Cerrar Sesión"} link={"/cerrar-sesion"} />
                                    ) : (
                                        <>
                                            <NavbarItem text={"Registrarse"} link={"/registrarse"} />
                                            <NavbarItem text={"Iniciar Sesión"} link={"/inicio-sesion"} />
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </ul>
            </nav>
        </header>
    );
}
*/

export default Navbar;