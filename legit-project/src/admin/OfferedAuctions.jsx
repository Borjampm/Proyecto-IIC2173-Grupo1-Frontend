import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../config'
import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import { useParams, Link } from 'react-router-dom';
import { AdminContext } from './AdminContext';


const OfferedAuctions = () => {
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
            .get(`${API_URL}/auctions/offers`)
            .then((response) => {
                setApiResponse(response.data);
                setMsg("ofertas obtenidas correctamente");
                console.log(response.data)
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

  const handleButtonClick = (AuctionId, StockId, Quantity) => {
    // Add your logic for handling button click, e.g., navigate to another page
    console.log(`Button clicked for auction with ID ${AuctionId}`);
    axios
      .post(`${API_URL}/auctions/propose`, {
        auction_id: AuctionId,
        stock_id: StockId,
        quantity: Quantity,
      })
      .catch((error) => {
        console.log(error)
      })
  };


  return (
    <>
    {isAdmin ? (
    <>
      <h1>Offered Auctions</h1>
    <div>
      {msg && <p>{msg}</p>}
      {apiResponse && (
        <table>
          <thead>
            <tr>
              <th>Stock ID</th>
              <th>Quantity</th>
              <th>Group</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {apiResponse.map((offer) => (
              <tr key={offer.auction_id}>
                <td>{offer.stock_id}</td>
                <td>{offer.quantity}</td>
                <td>{offer.group_id}</td>
                <td>
                <Link key={offer.i} to={`/admin/proposal/${offer.auction_id}`}>
                    Make a proposal
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
</>);
};

export default OfferedAuctions;
