import React, {useState, createContext, useContext} from 'react';

import { BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom';

import LoginPage from './screens/LoginPage';
import Dashboard from './screens/Dashboard';

export const authContext = createContext();
export const globalContext = createContext();

function RequireAuth({ children }) {
  const userID = useContext(authContext).userID;
  let location = useLocation();

  if (!userID) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  const [userID, setUserID] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);

  return (
    <div className="app-container">
      <authContext.Provider value={{userID, setUserID}}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={
              <RequireAuth>
                <globalContext.Provider value={{accounts, categories, transactions, setAccounts, setCategories, setTransactions}}>
                  <Dashboard />
                </globalContext.Provider>
              </RequireAuth>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </authContext.Provider>
    </div>
  );
};

export default App;
