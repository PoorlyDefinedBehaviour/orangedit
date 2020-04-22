import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import { GlobalStyles } from '../GlobalStyles';
import { Router } from '../Router';
import { Client } from '../../Links/Client';

export const App = () => {
  return (
    <ApolloProvider client={Client}>
      <GlobalStyles />
      <Router />
    </ApolloProvider>
  );
};
