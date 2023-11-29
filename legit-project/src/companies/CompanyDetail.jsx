import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom';
import './CompanyDetail.css'
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../config'
import { AdminContext } from '../admin/AdminContext';

function CompanyDetail() {
  const { isAdmin } = useContext(AdminContext);
  const { user, getIdTokenClaims, getAccessTokenSilently } = useAuth0();
  const { companySymbol } = useParams();
  const [page, setPage] = useState(1);
  const [msg, setMsg] = useState("");
  const [buymsg, setBuymsg] = useState("");
  const [stocksAdded, setStocksAdded] = useState(1)
  const [apiResponse, setApiResponse] = useState(null)
  const [lastStockValue, setLastStockValue] = useState(null);
  const [tbkUrl, setTbkUrl] = useState("")
  const [tbkToken, setTbkToken] = useState("")
  const [days, setDays] = useState(1)
  const [msgPrediction, setMsgPrediction] = useState("");
  const [stockAmount, setStockAmount] = useState(0);

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
        setMsg(`Error al obtener la información de las empresas ${error.response.data.message}`)
      });
  }, [page, companySymbol]);

  // Obtener el valor del último stock de la empresa
  useEffect(() => {
    axios
      .get(`${API_URL}/stocks/`)
      .then((response) => {
        const lastStocksValues = response.data
        setLastStockValue(lastStocksValues[companySymbol]);
      })
      .catch((error) => {
      });
  }, [page, tbkUrl, tbkToken, companySymbol]);

  // obtener cuantos stocks hay de la empresa
  useEffect(() => {
    axios
      .get(`${API_URL}/availablestocks/company/${companySymbol}`)
      .then((response) => {
        setStockAmount(response.data.amount);
      })
      .catch((error) => {
      });
  }, [companySymbol, stockAmount]);

  // Envía los datos al backend para hacer efectivo el registro
  const buyStock = async(e) => {
    e.preventDefault();
    const idToken = await getIdTokenClaims();
    const anotherToken = await getAccessTokenSilently();
    const tokenBearer = "Bearer " + anotherToken

    console.log("COMPRANDO USUARIO 0")

    axios
      .post(`${API_URL}/transactions/admin/buy`, {
        Username: user.sub,
        Quantity: stocksAdded,
        Symbol: companySymbol,
        IPAddres: user.custom_metadata.ip_adress,
        Price: Math.floor(apiResponse.slice(-1)[0].price)
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
         //TODO: esto solo debe redirecccionar si es que tenía plata
        setMsg("Compradas, ve el estado de tus compras aqui")
      })
      .catch((error) => {
        setBuymsg("Error al comprar stocks")
      })
  }

  const adminBuyStock = async(e) => {
    e.preventDefault();
    const idToken = await getIdTokenClaims();
    const anotherToken = await getAccessTokenSilently();
    const tokenBearer = "Bearer " + anotherToken

    console.log("COMPRANDO STOCKS ADMIN")

    axios
      .post(`${API_URL}/transactions/admin/buy`, {
        Username: user.sub,
        Quantity: stocksAdded,
        Symbol: companySymbol,
        IPAddres: user.custom_metadata.ip_adress,
        Price: apiResponse.slice(-1)[0].price
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
         //TODO: esto solo debe redirecccionar si es que tenía plata
        setMsg("Compradas, ve el estado de tus compras aqui")
      })
      .catch((error) => {
        setBuymsg("Error al comprar stocks")
      })
  }

  const userBuyStock = async(e) => {
    e.preventDefault();
    const idToken = await getIdTokenClaims();
    const anotherToken = await getAccessTokenSilently();
    const tokenBearer = "Bearer " + anotherToken

    console.log("COMPRANDO STOCKS ADMIN")
    axios
      .post(`${API_URL}/transactions/buy`, {
        Username: user.sub,
        Quantity: stocksAdded,
        Symbol: companySymbol,
        IPAddres: user.custom_metadata.ip_adress,
        Price: Math.floor(apiResponse.slice(-1)[0].price)
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
         //TODO: esto solo debe redirecccionar si es que tenía plata
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

  function sum(e) {
    setStocksAdded(stocksAdded + 1)
  }

  function less(e) {
    if (stocksAdded - 1 > 0) {
      setStocksAdded(stocksAdded - 1)
    }
  }

  function buy() {
    console.log("works");
  }

  function lessDays() {
    if (days - 1 > 0) {
      setDays(days - 1)
    }
  }

  function sumDays() {
      setDays(days + 1)
  }

  const handleFractionBuy = async(e, stock) => {
    e.preventDefault();
    const idToken = await getIdTokenClaims();
    const anotherToken = await getAccessTokenSilently();
    const tokenBearer = "Bearer " + anotherToken

    console.log("COMPRANDO USUARIO 0")

    axios
        .post(`${API_URL}/transactions/fraction/buy`, {
            Username: user.sub,
            Quantity: stocksAdded,
            Symbol: stock.company_symbol,
            IPAddres: user.custom_metadata.ip_adress,
            Price: stock.price
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
            //TODO: esto solo debe redirecccionar si es que tenía plata
            setMsg("Compradas, ve el estado de tus compras aqui")
        })
        .catch((error) => {
            setBuymsg("Error al comprar stocks")
        })
};


  const buyForm = () => {
    if (isAdmin) {
      return (
        <>
        <form id="buy-stock" className="form" onSubmit={adminBuyStock}>
          <div className="number-field">
          <label htmlFor="number">Select the number of stocks you want to buy to Group 1 [ADMIN]</label>
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
      )
    } else if (user) {
      return (
        <>
       <form id="buy-stock" className="form" onSubmit={userBuyStock}>
          <div className="number-field">
              <label htmlFor="number">Select the FRACTION of stocks you want to buy</label>
              <br></br>
              <>
              <input
                            type="number"
                            min="0"
                            max={stockAmount}
                            step="any"
                            onChange={e => {
                                const val = e.target.value;
                                if (val < 0) {
                                    e.target.value = 0;
                                } else if (val > stockAmount) {
                                    e.target.value = stockAmount;
                                }
                                setStocksAdded(e.target.value);
                            }}
                        />
              </>
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
      )
    } else {
      return (
        <p>¡Login to buy stocks!</p>
      )
    }
  }


  return (
    <>
      <div className='company-detail'>
        <h1>{ companySymbol }</h1>
        <h2>Actual price ${ lastStockValue }</h2>
        <h2>Available stocks { stockAmount }</h2>

        {buyForm()}
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
