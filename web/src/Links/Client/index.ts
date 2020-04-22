import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const Client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
    // TODO Mudar para o link da api @Bruno
  }),
});
