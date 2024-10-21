import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Privateroute = ({ element }) => {
    const { isAuthenticated, loading } = useSelector((state) => state.user);


    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }


    if (isAuthenticated) {
        return element;
    }

    return <Navigate to="/login" replace />;
};

export default Privateroute;