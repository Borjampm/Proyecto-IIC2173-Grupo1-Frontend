import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../config'
import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import { useParams, Link } from "react-router-dom";


const OfferDetail = () => {
  const [message, setMessage] = useState('');
  const [admin, setAdmin] = useState(false);
  const [apiResponse, setApiResponse] = useState(null)
  const [auctionInfo, setAuctionInfo] = useState(null)
  const [msg, setMsg] = useState("");
  const { offerId } = useParams();

  const serverUrl = API_URL;

  const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        callSecureApi();
    }, []);

    useEffect(() => {
        console.log(offerId)
        axios
            .get(`${API_URL}/auctions/proposals/${offerId}`)
            .then((response) => {
                setApiResponse(response.data);
                setMsg("propuestas obtenidas correctamente");
                console.log(response.data)
            })
            .catch((error) => {
                setMsg(`Error al obtener las empresas ${error}`)
            });
        }, [offerId]
    );
    useEffect(() => {
      console.log(offerId)
      axios
            .get(`${API_URL}/auctions/show/${offerId}`)
            .then((response) => {
                setAuctionInfo(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                setMsg(`Error al obtener las empresas ${error}`)
            });
      }, [offerId]
  );

  const handleButtonClick = (AuctionId, ProposalId, StockId, Quantity, groupId, State) => {
    // Add your logic for handling button click, e.g., navigate to another page
    console.log(`Button clicked for proposal with ID ${ProposalId}`);
    axios
      .post(`${API_URL}/auctions/send`, {
        auction_id: AuctionId,
        proposal_id: ProposalId,
        stock_id: StockId,
        quantity: Quantity,
        group_id: groupId,
        type: State
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
      setMessage(error.message);
    }
  };




  return (
    <>
    <h1>Offered Stocks </h1>
    {auctionInfo ? (
        <p>Stock: {auctionInfo.stock_id}, Amount: {auctionInfo.quantity}</p>
        ) : (<>Loading...</>)}
    <h1>Interchange proposals </h1>
    {apiResponse && (
        <table>
          <thead>
            <tr>
              <th>Stock ID</th>
              <th>Quantity</th>
              <th>Group</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {apiResponse.map((offer) => (
              <tr key={offer.proposal_id}>
                <td>{offer.offered_stock}</td>
                <td>{offer.offered_quantity}</td>
                <td>{offer.group_id}</td>
                <td>
                  <button onClick={() => handleButtonClick(offer.auction_id, offer.proposal_id, offer.stock_id, offer.quantity, offer.group_id, "acceptance")}>
                    Accept
                  </button>
                  <button onClick={() => handleButtonClick(offer.auction_id, offer.proposal_id, offer.stock_id, offer.quantity, offer.group_id, "rejection")}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
  </>);
};

export default OfferDetail;
