import { useAuth } from '@/hooks/AuthContext';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ element: Component, ...rest }: any) => {
    const { isAuthenticated }: any = useAuth();

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
