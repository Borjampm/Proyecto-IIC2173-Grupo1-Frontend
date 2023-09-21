import NavbarItem from "./NavbarItem";
import './Navbar.css'

function Navbar() {
    return (
        <header>
            <nav>
                <ul>
                    <NavbarItem text={"Grupo 1"} link={"/"}/>
                    <NavbarItem text={"Acerca de"} link={"/"}/>
                    <NavbarItem text={"Nosotros"} link={"/"} />  

                    <div className="right">
                        <div className="dropdown">
                            <NavbarItem text={"Mi Sesión"} className={"dropbtn"} link={"/my-profile"}  />
                            {/* <div className="dropdown-content">
                                {
                                    <NavbarItem text={"Registrarse"} link={"/registration"} />
                                }
                            </div> */}
                        </div>
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