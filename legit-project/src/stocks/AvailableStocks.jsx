import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
// import amazon from './../assets/logos/AMZN.png'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAuth0 } from '@auth0/auth0-react';
import { jwtDecode } from "jwt-decode";



function AvailableStocks() {
    const [apiResponse, setApiResponse] = useState(null)
    const [showInput, setShowInput] = useState(false);
    const [selectedStockId, setSelectedStockId] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const { getAccessTokenSilently, user, getIdTokenClaims, isLoading, error, loginWithRedirect } = useAuth0();
    const [admin, setAdmin] = useState(false);


    const [msg, setMsg] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
      callSecureApi();
      }, []);

    useEffect(() => {
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
            auction_id: uuidv4(),
            proposal_id: "",
            stock_id: StockId,
            quantity: quantity,
            group_id: 1,
            type: "offer"
          })
          .catch((error) => {
            console.log(error)
          })
      };

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
        setMsg(error.message);
        }
    };

    const navigate = useNavigate();

    console.log(admin);


    if (!user) {
      return (
        <div className="companies-v-container">
          <h1>Stocks</h1>
          <p>Para ver las stocks disponibles, debes iniciar sesión.</p>
        </div>
      );
    } else if (user && !admin) {
      return (
      <div className="companies-v-container">
      { msg ? (
        <></>
      ): (
        <p>Error obteniendo las stocks, intenta más tarde.</p>
      )}
      <h1>Stocks</h1>
      <table>
        <thead>
          <tr>
            <th>Stock Symbol</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {apiResponse && apiResponse.map((stock) => (
            <tr key={stock.stock_id}>
              <td>{stock.stock_id}</td>
              <td>{stock.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}
    else if (user && admin) {
    return (
        <div className="companies-v-container">
          { msg ? (
            <></>
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

    )
                          }
}

export default AvailableStocks
