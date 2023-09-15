import { Link } from "react-router-dom";
import { useState } from 'react'

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
            <div className="companies-list">
                <p>{ msg }</p>
                <div className="companies">
                    { companies.map(function(company) {
                        return(
                            <div key={company.symbol} className="company">
                                <Link to={`/companies/${company.symbol}`}>
                                    <p>{ company.shortName }</p>
                                    <p>{ company.symbol }</p>
                                </Link>
                            </div>
                        )
                    })

                    }
                </div>
                
                

            </div>
        </>
    )

}

export default CompaniesList
