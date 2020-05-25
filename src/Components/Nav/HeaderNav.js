import React, { useState } from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import styles from './HeaderNav.module.scss';
import { FaCog } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import { routes } from '../../Routes/routes';
import cx from 'classnames';

const HeaderNav = ({ total, limit }) => {
  const [burgerExpanse, setBurgerExpanse] = useState(false);

  const toLimit = limit - total;

  let location = useLocation();

  return (
    <nav className={styles.wrapper}>
      {console.log(location)}
      <Navbar />
      <div
        className={cx(styles.totalWrapper, {
          [styles.disappear]: location.pathname !== '/',
        })}
      >
        <p>{total}zł/</p>
        {toLimit >= 0 ? (
          <p className={styles.positiveLimit}>{toLimit}</p>
        ) : (
          <p className={styles.negativeLimit}>{toLimit}</p>
        )}
      </div>
      <NavLink
        className={styles.navItem}
        activeClassName={styles.navItemActive}
        to={routes.settings}
      >
        <FaCog />
      </NavLink>
    </nav>
  );
};

const mapStateToProps = ({ total, limit }) => ({ total, limit });

export default connect(mapStateToProps)(HeaderNav);
