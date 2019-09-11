import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { endpoint } from '../config';
import { onError } from 'apollo-link-error';

// import withApollo from 'next-with-apollo';

// import ApolloClient from "apollo-boost";

const request = operation => {
  operation.setContext({
    fetchOptions: {
      credentials: 'include',
    },
    headers,
  });
};

const createClient = ({ headers }) => {
  return new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      // new HttpLink({
      //   uri: endpoint,
      //   credentials: "include",
      //   fetchOptions: {
      //     credentials: "include"
      //   },
      //   headers
      // })
      createUploadLink({
        uri: endpoint,
        credentials: 'include',
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      }),
    ]),
    // request: operation => {
    //   operation.setContext({
    //     fetchOptions: {
    //       credentials: "include"
    //     },
    //     headers
    //   });
    // },
    cache: new InMemoryCache(),
  });
};

const client = createClient({ headers: null });

// export default withApollo(createClient, {
//   getDataFromTree: 'ssr',
// });
export default client;
