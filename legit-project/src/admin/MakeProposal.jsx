import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../config'
import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import { useParams, Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


const MakeProposal = () => {
  const [message, setMessage] = useState('');
  const [admin, setAdmin] = useState(false);
  const [apiResponse, setApiResponse] = useState(null)
  const [auctionInfo, setAuctionInfo] = useState(null)
  const [selectedStockId, setSelectedStockId] = useState(null);
  const [msg, setMsg] = useState("");
  const { auctionId } = useParams();
  const [quantity, setQuantity] = useState(0);
  

  const serverUrl = API_URL;

  const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        callSecureApi();
    }, []);

    useEffect(() => {
        console.log(auctionId);
        axios
            .get(`${API_URL}/availablestocks/all`)
            .then((response) => {
                setApiResponse(response.data);
                setMsg("Stocks obtenidas correctamente");
                console.log(response.data)
            })
            .catch((error) => {
                setMsg(`Error al obtener las stocks ${error}`)
            });
        }, []
    );

    const handleButtonClick = (StockId, quantity) => {
        // Add your logic for handling button click, e.g., navigate to another page
        console.log(`Button clicked for auction with ID ${StockId}`);
        console.log(quantity);
        axios
          .post(`${API_URL}/auctions/send`, {
            auction_id: auctionId,
            proposal_id: uuidv4(),
            stock_id: StockId,
            quantity: quantity,
            group_id: 1,
            type: "proposal"
          })
          .catch((error) => {
            console.log(error)
          })
      };

      useEffect(() => {
        console.log(auctionId, "console")
        axios
              .get(`${API_URL}/auctions/show/${auctionId}`)
              .then((response) => {
                  setAuctionInfo(response.data);
                  console.log("auction", response.data)
              })
              .catch((error) => {
                  setMsg(`Error al obtener las empresas ${error}`)
              });
        }, [auctionId]
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

//   const navigate = useNavigate();


  return (
    <>
    <h1>Make Proposal </h1>
    <div className="companies-v-container">
          { auctionInfo ? (
            <p>Stock: {auctionInfo.stock_id}, Amount: {auctionInfo.quantity}, Group: {auctionInfo.group_id}</p>
          ): (
            <p>Error obteniendo las stocks, intenta más tarde.</p>
          )}
          <h1>Stocks</h1>
          <table>
            <thead>
              <tr>
                <th>Stock Symbol</th>
                <th>Amount</th>
                <th>Offer</th>
              </tr>
            </thead>
            <tbody>
              {apiResponse && apiResponse.map((stock) => (
                <tr key={stock.stock_id}>
                  <td>{stock.stock_id}</td>
                  <td>{stock.amount}</td>
                <td>
                {selectedStockId === stock.stock_id ? (
                        <button onClick={() => handleButtonClick(stock.stock_id, quantity)} type="submit">Submit</button>
                    ) : (
                        <button onClick={() => setSelectedStockId(stock.stock_id)}>Select</button>
                    )}
                    {selectedStockId === stock.stock_id && (
                        <input 
                            type="number" 
                            min="0" 
                            max={stock.amount} 
                            onChange={e => {
                                const val = e.target.value;
                                if (val < 0) {
                                    e.target.value = 0;
                                } else if (val > stock.amount) {
                                    e.target.value = stock.amount;
                                } else if (!Number.isInteger(Number(val))) {
                                    e.target.value = Math.floor(val);
                                }
                                setQuantity(e.target.value);
                            }}
                        />
                    )}
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  </>);
};

export default MakeProposal;
