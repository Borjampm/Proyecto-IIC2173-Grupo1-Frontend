import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../config'
import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import { AdminContext } from './AdminContext';


const AllProposals = () => {
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
            .get(`${API_URL}/auctions/my-proposals/history`)
            .then((response) => {
                setApiResponse(response.data);
                setMsg("porposals obtenidas correctamente");
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
    <div>
      <h1>All my proposals</h1>
      {msg && <p>{msg}</p>}
      {apiResponse && (
        <table>
          <thead>
            <tr>
              <th>Stock ID</th>
              <th>Quantity</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {apiResponse.map((offer, i) => (
              <tr key={i}>
                <td>{offer.offered_stock}</td>
                <td>{offer.offered_quantity}</td>
                <td>{offer.state}</td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    ) : (
      <h1>You dont have acces, you are not an Admin</h1>
    )}
</>
  );
};

export default AllProposals;
