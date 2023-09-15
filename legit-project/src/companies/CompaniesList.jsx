import { Link } from "react-router-dom";
import { useState } from 'react'
import './CompaniesList.css'

function CompaniesList() {

    // let companies;     // Variable que almacena los datos de la API para utilizarlo después

    const [msg, setMsg] = useState("");     // Variable que almacena el mensaje de error

    const companies = [                   // Este es el formato en el que se tienen que recuperar los datos de la API
        {"shortName": "Apple Inc.", "symbol": "AAPL"},
        {"shortName": "Microsoft Corporation", "symbol": "MSFT"},
        {"shortName": "Amazon.com, Inc.", "symbol": "AMZN"}
    ]

    // const getCompanies = async() => {      // Envía los datos al backend para hacer efectivo el registro
    //     axios.get(`${API_URL}/companies-names`, {
    //     }).then((response) => {
    //         companies = response.data.companies;
    //         setMsg("Empresas obtenidas correctamente");
    //     }).catch((error) => {
    //         setMsg(`Error al obtener las empresas ${error.response.data.message}`)
    //     })
    // }
    // getCompanies()                       // Tal vez sea necesario utilizar useEffect() para que se actualice la página  y que se muestre
 
    return (
        <>
            <div className="companies-v-container">
                <p>{ msg }</p>
                <h1>Companies</h1>
                    <div className="companies">
                        { companies.map(function(company) {
                            return(
                                <Link key={company.symbol} to={`/companies/${company.symbol}`}>
                                    <div className="company">
                                        <p>{ company.symbol }</p>
                                        <h3>{ company.shortName }</h3>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                

        </>
    )

}

export default CompaniesList
