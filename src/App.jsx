import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient'; 
import './App.css';
import Login from './pages/login';
import Signup from "./pages/Signup";
import Dashboard from "./pages/dashBoard";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;