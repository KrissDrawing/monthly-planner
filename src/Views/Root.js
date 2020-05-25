import React from 'react';
import { Provider } from 'react-redux';
import { routes } from '../Routes/routes';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Payments from './Main/Payments';
import Stats from './Stats/Stats';
import Settings from './Settings/Settings';
import { store } from '../store';
import HeaderNav from '../Components/Nav/HeaderNav';
import styles from './Root.module.scss';

function Root() {
  return (
    <Provider store={store}>
      <HashRouter basename="/">
        <div className={styles.wrapper}>
          <HeaderNav />
          <Switch>
            <Route exact path={routes.main} component={Payments} />
            <Route exact path={routes.stats} component={Stats} />
            <Route exact path={routes.settings} component={Settings} />
          </Switch>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default Root;
