import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App'
import Registration from './registration/Registration'

function Routing() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/registration" element={<Registration />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing