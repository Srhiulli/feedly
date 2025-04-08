import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "./components/ui/provider";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
  <StrictMode>
    <Provider>
     <App />
    </Provider>
    </StrictMode>
  </ApolloProvider>
); 
