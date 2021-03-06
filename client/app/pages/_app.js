/**
 * _app.js
 *
 * Next.js uses the App component to initialize pages. You can override it and control the page initialization.
 *
 * For more info, check out
 * https://github.com/zeit/next.js#custom-app
 *
 */

/**
 * Module dependencies.
 */
import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import getPageContext from 'app-utils/getPageContext';
import globalStyles from 'app-styles/globalStyles';
import createStore from '../store/store';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }
    return { pageProps };
  }

  constructor() {
    super();
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        {/* Wrap every page in JSS and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            <Provider store={store}>
              {/* CssBaseline kick start an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {/* Pass pageContext to the _document though the renderPage enhancer
                    to render collected styles on server-side. */}
              <Component pageContext={this.pageContext} {...pageProps} />
            </Provider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}

export default withRedux(createStore)(
  withReduxSaga({ async: true })(withStyles(globalStyles)(MyApp))
);
