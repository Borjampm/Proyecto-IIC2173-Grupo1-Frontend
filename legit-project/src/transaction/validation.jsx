import { useState, useContext } from 'react'
import axios from 'axios'
import { API_URL } from '../config'
import { useAuth0 } from '@auth0/auth0-react';
import { useSearchParams } from "react-router-dom";
import { AdminContext } from '../admin/AdminContext';

function Validation() {
    const { isAdmin } = useContext(AdminContext);
    const { user } = useAuth0();
    const [searchParams] = useSearchParams();
    const [buyStatus, setBuyStatus] = useState();
    const [msg, setMsg] = useState("");
    const [PDF, setPDF] = useState();
    const [transaction, setTransaction] = useState();

    const handleBuy = async(e) => {
        console.log("token", searchParams.get("token_ws"))
        console.log("user", user.sub)
        axios.post(`${API_URL}/transactions/webpay-result`, {
            Username: user.sub,
            Token: searchParams.get("token_ws")
        }).then((response) => {

            console.log(response);
            setBuyStatus(response.data);
            setTransaction(response.data)
            setMsg("Added to db")
        }).catch((error) => {
            setMsg("Not added to DB")
        })
    }

    const adminHandleBuy = async(e) => {
        console.log("token", searchParams.get("token_ws"))
        console.log("user", user.sub)
        axios.post(`${API_URL}/transactions/admin/webpay-result`, {
            Username: user.sub,
            Token: searchParams.get("token_ws")
        }).then((response) => {

            console.log(response);
            setBuyStatus(response.data);
            setTransaction(response.data)
            setMsg("Added to db")
        }).catch((error) => {
            setMsg("Not added to DB")
        })
    }

    const handlePDF = async(e) => {
        const requestData = {
            group: "1",
            user: user.email,
            companyId: transaction.CompanyId,
            quantity: transaction.Quantity,
            price: transaction.Price,
            totalAmount: transaction.TotalAmount,
            date: transaction.Date,
            userId: user.sub


        }

        console.log("rrr", requestData)

        axios.post(`${API_URL}/pdf-serverless-2-demo-lambda_handler`,requestData).then((response) => {
            console.log(response);
            setPDF(response.data.url)
            console.log("good pdf");
        }).catch((error) => {
            console.log(error)
            console.log("bad pdf");
        })
    }

    const openExternalSite = () => {
      window.open(PDF, '_blank');
    };
    // Token
    // Username

    // Ver si token es nulo para no hacer el post
    // Se hace e post, y segun eso sale compra exitosa o compra denegada

    return (
        <>

            {searchParams.get("token_ws") ? (
                <>
                    <p>Transacción realizada</p>
                    {
                        isAdmin ? (
                            <button onClick={() => adminHandleBuy()}>Confirmar estado</button>
                        ) : (
                            <button onClick={() => handleBuy()}>Confirmar estado</button>
                        )
                    }
                </>
            ) : (
                <p>Transacción anulada</p>
            )}

            {buyStatus ? (
                <>
                    <p>Compra exitosa</p>
                    <button onClick={() => handlePDF()}>Obtener comprobate de compra</button>
                </>
            ) : (
                <p>Compra pendiente...</p>
            )}

            {PDF ? (
                <>
                    <button onClick={openExternalSite}>Abrir PDF</button>
                </>
            ) : (
                <p>PDF pendiente...</p>
            )}

        </>
    )

}

export default Validation
