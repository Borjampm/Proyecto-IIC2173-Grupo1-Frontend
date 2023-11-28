import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import './CompanyDetail.css'
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../config'
import { AdminContext } from '../admin/AdminContext';

function CompanyDetail() {
  const { isAdmin } = useContext(AdminContext);

  const { user, getIdTokenClaims, getAccessTokenSilently } = useAuth0();
  const { companySymbol } = useParams();
  const [page, setPage] = useState(1);
  const [buymsg, setBuymsg] = useState("");
  const [stocksAdded, setStocksAdded] = useState(1)
  const [apiResponse, setApiResponse] = useState([])
  const [lastStockValue, setLastStockValue] = useState(null);
  const [tbkUrl, setTbkUrl] = useState("")
  const [tbkToken, setTbkToken] = useState("")

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, companySymbol]);

  // Obtener el valor del último stock de la empresa
  useEffect(() => {             
    axios
      .get(`${API_URL}/stocks/`) 
      .then((response) => {
        const lastStocksValues = response.data;
        setLastStockValue(lastStocksValues[companySymbol]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, tbkUrl, tbkToken, companySymbol]);

  // Envía los datos al backend para hacer efectivo el registro
  const buyStock = async(e) => {
    e.preventDefault();
    const idToken = await getIdTokenClaims();
    const anotherToken = await getAccessTokenSilently();
    const tokenBearer = "Bearer " + anotherToken

    let finalUrl = "";

    if (isAdmin) {
      finalUrl = `${API_URL}/transactions/buy/admin`;
    } else {
      finalUrl = `${API_URL}/transactions/buy`;
    }

    axios
      .post(finalUrl, {
          Username: user.sub,
          Quantity: stocksAdded,
          Symbol: companySymbol,
          IPAddres: user.custom_metadata.ip_adress,
          Price: apiResponse.slice(-1)[0]?.price
        },
        {
          headers: {
            Authorization: tokenBearer
          }
      })
      .then((response) => {
        console.log("tooken", response.data);
        setTbkToken(response.data.token);
        setTbkUrl(response.data.url);
        // TODO: esto solo debe redirecccionar si es que tenía plata
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

  function sum(e) {
    setStocksAdded(stocksAdded + 1)
  }

  function less(e) {
    if (stocksAdded - 1 > 0) {
      setStocksAdded(stocksAdded - 1)
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
                <div className="number-field">
                <label htmlFor="number">Select the number of stocks you want to buy</label>  
                  <br></br>
                  <p onClick={less}>-</p><input type="number" name="number" id="number" value={stocksAdded} onChange={e => handleStocksAdded(e.target.value)} required /><p  onClick={sum}>+</p>
                </div>    
                <p>Total amount: ${Math.round(stocksAdded * lastStockValue)}</p>  
                <button type="submit" className="btn" >Solicitar stocks</button>  
              </form>

              {tbkToken ? (
                <form method="post" action={tbkUrl}>
                  <input type="hidden" name="token_ws" value={tbkToken} />
                  <button type="submit" value="Ir a pagar">Ir a pagar</button>
                </form>
              ):(<></>)}

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
            apiResponse == [] ? (
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