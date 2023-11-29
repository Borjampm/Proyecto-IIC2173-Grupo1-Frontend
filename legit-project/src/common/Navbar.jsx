import NavbarItem from "./NavbarItem";
import { useState, useEffect } from 'react'
import './Navbar.css'
import { useAuth0 } from '@auth0/auth0-react';
import AuthButton from "./../user/AuthButton";

function Navbar() {
    const { user, getIdTokenClaims, isLoading, error } = useAuth0();

    useEffect(() => {
      const fetchData = async () => {
        try {
          if (!isLoading) {
            const idToken = await getIdTokenClaims();
          }
        } catch (err) {
          console.error('Error during silent authentication:', err);
        }
      };

      fetchData();
    }, [isLoading, getIdTokenClaims]);

    return (
        <header>
            <nav>
                <ul>
                    <NavbarItem text={"Home"} link={"/"}/>
                    <NavbarItem text={"Companies"} link={"/companies"}/>
                    {/* <NavbarItem text={"Group Stocks Fractions"} link={"/group_stocks"}/> */}
                    <NavbarItem text={"Group Stocks Auctions"} link={"/availableStocks"}/>

                    <div className="right">
                    {user ? (
                            <NavbarItem text={"Mi Perfil"} className={"dropbtn"} link={"/my-profile"}  />
                        ) : (
                            <></>)}
                        <li>
                            <AuthButton />
                        </li>

                    </div>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
