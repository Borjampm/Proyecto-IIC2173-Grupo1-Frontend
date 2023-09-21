import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import './MyProfile.css'
import axios from 'axios'

function MyProfile() {

    const API_URL = 'http://localhost:8000'    // URL de la API

    // const [userInformation, setUserInformation] = useState(null)    // Variable que almacena los datos de la API para utilizarlo después

    const [msg, setMsg] = useState("");     // Variable que almacena el mensaje de error
    const [moneyAdded, setMoneyAdded] = useState(0); 

    // const companies = [                   // Este es el formato en el que se tienen que recuperar los datos de la API
    //     {"shortName": "Apple Inc.", "symbol": "AAPL"},
    //     {"shortName": "Microsoft Corporation", "symbol": "MSFT"},
    //     {"shortName": "Amazon.com, Inc.", "symbol": "AMZN"}
    // ]

    const userId = 1
    const userInformation = {
          "username": "jose",
          "password": "1234",
          "money": 10000
      }

    const handleMoney = async(e) => {
            
        axios.post(`${API_URL}/users/add-money`, {
            userId: userId,
            amount: moneyAdded
        }).then((response) => {
            setMsg("Money added correctly")
        }).catch((error) => {
            setMsg("Error adding money")
        })
    }

    useEffect(() => {              // Envía los datos al backend para hacer efectivo el registro
        axios.get(`${API_URL}/users/${userId}`) 
          .then((response) => {
            setUserInformation(response.data);
            console.log(response.data, "user information")
            setMsg("Información de usuario obtenida correctamente");
          })
          .catch((error) => {
            setMsg(`Error al obtener información de usuario${error}`)
          });
    
      }, []);

    const handleMoneyAmount = (p) => {     // Revisa que la contraseña tenga al menos 8 caracteres

        setMoneyAdded(p)
    }

    


 
    return (
        <>
            <div className="user-container">
                <p>{ msg }</p>
                <h1>User {userId}</h1>
                        { userInformation ? (
                            <div className="user-information">
                                <p>Username: {userInformation.username}</p>
                                <p>Password: {userInformation.password}</p>
                                <p>Money: {userInformation.money}</p>
                                <form id="register-form" className="form" onSubmit={handleMoney}>
                                    <div className="field">
                                        <label htmlFor="money">Amount</label>
                                        <input type="money" name="money" id="money" value={moneyAdded} onChange={m => handleMoneyAmount(m.target.value)} required />
                                    </div>
                                    <button type="submit">Add Money</button>
                                </form>
                                <Link to="/my-stocks">
                                    <button className="btn">See my stocks
                                    </button>
                                </Link>
                            </div>
                           ) : (
                                <p>Loading user information...</p>
                            )
                        }
                </div>
                

        </>
    )

}

export default MyProfile