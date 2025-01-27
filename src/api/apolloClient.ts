import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://earthstore.testpuzzle.ge:8081",
  cache: new InMemoryCache(),
});

export default client;
