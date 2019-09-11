import 'moment/locale/de';

import App from 'next/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import Layout from '../components/Layout';
import MenuContextProvider from '../components/contexts/MenuContextProvider';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MuiThemeProvider } from '@material-ui/core/styles';
import NextNProgress from '../components/NextNProgress';
import ThemeContextProvider from '../components/contexts/ThemeContext';
import getPageContext from '../lib/getPageContext';
import moment from 'moment';
import { withApollo } from '../lib/withApollo';

moment.locale('de');

class PROJECTNAMEApp extends App {
  constructor() {
    super();
    this.pageContext = getPageContext();
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, /*apollo,*/ pageProps } = this.props;

    return (
      <>
        <ThemeContextProvider>
          <Head>
            <title>PROJECTNAME</title>
          </Head>
          <MuiPickersUtilsProvider
            utils={MomentUtils}
            locale={'de'}
            moment={moment}>
            <MuiThemeProvider theme={this.pageContext.theme}>
              <MenuContextProvider>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />{' '}
                {/* Pass pageContext to the _document though the renderPage enhancer
            to render collected styles on server-side. */}
                <Layout>
                  <NextNProgress />
                  <Component pageContext={this.pageContext} {...pageProps} />
                </Layout>
              </MenuContextProvider>
            </MuiThemeProvider>
          </MuiPickersUtilsProvider>
          {/*<Page>
              <Component {...pageProps}/>
            </Page>*/}
          {/* </JssProvider> */}
        </ThemeContextProvider>
      </>
    );
  }
}

export default withApollo(PROJECTNAMEApp);
