import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../config'
import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import { Link } from "react-router-dom";
import { AdminContext } from './AdminContext';


const MyOffers = () => {
  const [message, setMessage] = useState('');
  const [admin, setAdmin] = useState(false);
  const [apiResponse, setApiResponse] = useState(null)
  const [msg, setMsg] = useState("");
  const { isAdmin } = useContext(AdminContext);


  const serverUrl = API_URL;

  const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        callSecureApi();
    }, []);

    useEffect(() => {
        axios
            .get(`${API_URL}/auctions/my-offers`)
            .then((response) => {
                setApiResponse(response.data);
                setMsg("ofertas obtenidas correctamente");
                console.log(response.data)
                console.log("admin:", isAdmin)
            })
            .catch((error) => {
                setMsg(`Error al obtener las empresas ${error}`)
            });
        }, []
    );

  const callSecureApi = async () => {
    try {
        const token = await getAccessTokenSilently();
        const decodedToken = jwtDecode(token);
        if (decodedToken.permissions[0] === "admin") {
            console.log("admin")
            setAdmin(true)
        }
        console.log(decodedToken.permissions[0], "decodedToken")
    } catch (error) {
      setMessage(error.message);
    }
  };




  return (
    <>
    {isAdmin ? (
          <>
              <h1>My Active Offers</h1>
              <div>
            {msg && <p>{msg}</p>}
            {apiResponse && (
              <table>
                <thead>
                  <tr>
                    <th>Stock ID</th>
                    <th>Quantity</th>
                    <th>See proposals for offer</th>
                  </tr>
                </thead>
                <tbody>
                  {apiResponse.map((offer, i) => (
                    <tr key={offer.auction_id}>
                      <td>{offer.stock_id}</td>
                      <td>{offer.quantity}</td>
                      <td>
                        <Link key={offer.i} to={`/admin/offer/${offer.auction_id}`}>
                          Ver ofertas para esta oferta
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
      </>
      ) : (
          <h1>You dont have acces, you are not an Admin</h1>
        )}
  </>
  )
};

export default MyOffers;
