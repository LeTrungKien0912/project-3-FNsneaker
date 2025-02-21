import { createContext, useContext, useState } from 'react';
import { useQuery } from 'react-query';

// @ts-ignore
const AuthContext = createContext();

export const AuthProvider = ({ children }: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            return userData;
        }
        return null;
    };

    const { isLoading } = useQuery('user', fetchUser, {
        onSuccess: (data) => {
            if (data) {
                setIsAuthenticated(true);
                setUser(data);
            }
        }
    });

    const login = (userData: any) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
    };

    if (isLoading) {
        return <div>Loading...</div>; // Hoặc một spinner/loading indicator
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
