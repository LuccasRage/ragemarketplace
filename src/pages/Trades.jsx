import { Navigate } from 'react-router-dom';

// Redirect /trades to /orders
const Trades = () => <Navigate to="/orders" replace />;

export default Trades;
