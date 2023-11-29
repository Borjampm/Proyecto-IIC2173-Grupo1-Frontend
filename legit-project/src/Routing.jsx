import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App'
import MyProfile from './user/MyProfile'
import MyStocks from './user/MyStocks'
import AvailableStocks from './stocks/AvailableStocks'
import LogIn from './user/LogIn';
import CompaniesList from './companies/CompaniesList';
import CompanyDetail from './companies/CompanyDetail';
import Validation from './transaction/validation';
import AdminValidation from './transaction/AdminValidation';
import MyPredictions from './user/MyPredictions';
import Prediction from './user/Prediction';
import ExternalApi from './ExternalApi';
import Admin from './admin/Admin';
import OfferedAuctions from './admin/OfferedAuctions';
import MyProposalAuctions from './admin/MyProposalAuctions';
import GroupStocks from './admin/GroupStocks';
import MyOffers from './admin/MyOffers';
import OfferDetail from './admin/OfferDetail';
import MakeProposal from './admin/MakeProposal';
import AllProposals from './admin/AllProposals';

function Routing() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/my-profile" element={<MyProfile />} />
                <Route path="/my-stocks" element={<MyStocks />} />
                <Route path="/availablestocks" element={<AvailableStocks />} />
                <Route path="/log-in" element={<LogIn />} />
                <Route path="/companies" element={<CompaniesList />} />
                <Route path="/companies/:companySymbol" element={<CompanyDetail />} />
                <Route path="/validate-transaction" element={<Validation />} />
                <Route path="/admin/validate-transaction" element={<AdminValidation />} />
                <Route path="/my-predictions" element={<MyPredictions />} />
                <Route path="/my-predictions/:predictionId" element={<Prediction />} />
                <Route path="/external-api" element={<ExternalApi />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/offers" element={<OfferedAuctions />} />
                <Route path="/admin/my-proposals" element={<MyProposalAuctions />} />
                <Route path="/group_stocks" element={<GroupStocks />} />
                <Route path="/admin/my-offers" element={<MyOffers />} />
                <Route path="/admin/offer/:offerId" element={<OfferDetail />} />
                <Route path="/admin/proposal/:auctionId" element={<MakeProposal />} />
                <Route path="/admin/all-my-proposals" element={<AllProposals />} />

            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing
