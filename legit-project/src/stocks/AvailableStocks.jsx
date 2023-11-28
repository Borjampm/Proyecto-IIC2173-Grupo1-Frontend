import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
// import amazon from './../assets/logos/AMZN.png'

function AvailableStocks() {
    const [apiResponse, setApiResponse] = useState(null)

    const [msg, setMsg] = useState("");
    const [page, setPage] = useState(1);

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

    const handleButtonClick = (StockId) => {
        // Add your logic for handling button click, e.g., navigate to another page
        console.log(`Button clicked for stock with ID ${StockId}`);
    };

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
                <th>Stock ID</th>
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
                    <button onClick={() => handleButtonClick(stock.stock_id)}>Select</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )

}

export default AvailableStocks
