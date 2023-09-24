import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom';
import './CompanyDetail.css'
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../config'

function CompanyDetail() {
  const { user, isAuthenticated, context } = useAuth0();
  const { companySymbol } = useParams();
  const [page, setPage] = useState(1);
  const [msg, setMsg] = useState("");
  const [buymsg, setBuymsg] = useState("");
  const [stocksAdded, setStocksAdded] = useState(1)
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [apiResponse, setApiResponse] = useState(null)
  const [lastStockValue, setLastStockValue] = useState(null)

  function getDateComponents(dateString) {
    const date = new Date(dateString);

    const options = { month: 'long', weekday: 'long' };
    const names = date.toLocaleDateString(undefined, options);
  
    const year = date.getFullYear();
    const month = [date.getMonth() + 1, names.split(" ")[0]]; // Months are zero-based, so add 1
    const day = [date.getDate(), names.split(" ")[1]];
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
  
    return [year, month, day, hour, minute, second];
  }
    
  // Obtener todos los stocks de la empresa en la página seleccionada
  useEffect(() => {             
    axios
      .get(`${API_URL}/stocks/${companySymbol}?page=${page}`) 
      .then((response) => {
        setApiResponse(response.data.history);
        setMsg("Información obtenida correctamente");
      })
      .catch((error) => {
        console.log("error all stocks", error)
        setMsg(`Error al obtener la información de las empresas ${error.response.data.message}`)
      });
  }, [page]);

  // Obtener el valor del último stock de la empresa
  useEffect(() => {             
    axios
      .get(`${API_URL}/stocks/`) 
      .then((response) => {
        const lastStocksValues = response.data
        setLastStockValue(lastStocksValues[companySymbol]);
      })
      .catch((error) => {
        console.log("error last stock", error)
      });
  }, [page]);

  // Envía los datos al backend para hacer efectivo el registro
  const buyStock = async(e) => {
    e.preventDefault();

    axios
      .post(`${API_URL}/transactions/buy`, {
        Username: user.sub,
        Quantity: stocksAdded,
        Symbol: companySymbol,
        IPAddres: user.custom_metadata.ip_adress,
        Price: apiResponse.slice(-1)[0].price
      })
      .then((response) => {
        window.location.href = '/my-stocks';
        setMsg("Compradas, ve el estado de tus compras aqui")
      })
      .catch((error) => {
        setBuymsg("Error al comprar stocks")
      })
  }

  function handleStocksAdded(e) {
    if (e >= 1) {
        setStocksAdded(e)
    }
  }

  function handlePage(e) {
    if (e >= 1) {
        setPage(e)
    }
  }

  return (
    <>
      <div className='company-detail'>
        <h1>{ companySymbol }</h1>
        <h2>Actual price ${ lastStockValue }</h2>
        
        {
          user ? (
            <>
              <form id="buy-stock" className="form" onSubmit={buyStock}>
                <div className="field">
                  <label htmlFor="number">Select the number of stocks</label>  
                  <input type="number" name="number" id="number" value={stocksAdded} onChange={e => handleStocksAdded(e.target.value)} required />
                </div>

                <button type="submit" className="btn" >Buy Stocks</button>
              </form>
              <p>{buymsg}</p>
            </>
          ) : <p>¡Login to buy stocks!</p> 
        }
        <br/>

        <form id="change-page" className="form">
          <div className="field">
            <label htmlFor="number">Page</label>
            <input type="number" name="page" id="page" value={page} onChange={e => handlePage(e.target.value)} required />
          </div>
        </form>

        {
          apiResponse ? (
            apiResponse === [] ? (
              <></>
            ) : (
              apiResponse.map(function(stock, i) {
                const dateComponents = getDateComponents(stock.datetime)
                return(
                  <div key={i} className="stock">
                      <p>{dateComponents[2][1]} {dateComponents[2][0]} {dateComponents[1][1]} {dateComponents[0]}</p>
                      <p>{dateComponents[3]}:{dateComponents[4]}:{dateComponents[5]}</p>
                      <p>${stock.price} {stock.currency}</p>
                  </div>
                )
              })
            )
          ) : ( 
            <p>Loading stocks...</p>
          )
        }
      </div>
    </>
  )
}

export default CompanyDetail