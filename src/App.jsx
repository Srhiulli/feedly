import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient'; 
import './App.css';
import Login from './pages/login';
import Signup from "./pages/Signup";
import Dashboard from "./pages/dashBoard";
import { PublicRoute } from "./routes/PublicRoute";
import { PrivateRoute } from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
      <BrowserRouter>
       <Routes>
          <Route path="/" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
        </Routes>
        </BrowserRouter>
        </AuthProvider>
    </ApolloProvider>
  );
}

export default App;