import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../Routes/routes';
import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav>
      <NavLink
        exact
        className={styles.navItem}
        activeClassName={styles.navItemActive}
        to={routes.main}
      >
        Main
      </NavLink>
      <NavLink
        className={styles.navItem}
        activeClassName={styles.navItemActive}
        to={routes.stats}
      >
        Stats
      </NavLink>
    </nav>
  );
};
export default Navbar;
