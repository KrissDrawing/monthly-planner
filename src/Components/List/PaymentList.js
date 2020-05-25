import React, { useEffect } from 'react';
import ListItem from './ListItem';
import { connect } from 'react-redux';
import {
  UPDATE_TOTAL,
  AUTO_PAY,
  SET_CURRENT_DATE,
} from '../../Actions/actions';
import styles from './PaymentList.module.scss';
import { getCurrentDate } from '../../Hooks/useDate';

const PaymentList = ({
  payments = [],
  currentDate,
  updateTotal,
  autoPay,
  setCurrentDate,
}) => {
  useEffect(() => {
    setCurrentDate(getCurrentDate());
  }, []);

  useEffect(() => {
    updateTotal(currentDate[0]);
    autoPay(currentDate);
  }, [currentDate, payments.length]);

  const isPaidList = (isPaid) =>
    payments
      .filter((item) => +item.date[0] === +currentDate[0])
      .filter((item) => (isPaid ? item.isPaid : !item.isPaid));

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.payName}>TO PAY</h3>
      <div className={styles.innerWrapper}>
        {isPaidList(false).length === 0 ? (
          <h3 className="subtitle is-3">Add some payments</h3>
        ) : (
          isPaidList(false).map((item) => <ListItem key={item.id} {...item} />)
        )}
      </div>
      <h4 className={styles.payName}>PAYED</h4>
      <div className={styles.innerWrapper}>
        {isPaidList(true).length === 0 ? (
          <h3 className="subtitle is-3">There is nothing paid this month</h3>
        ) : (
          isPaidList(true).map((item) => <ListItem key={item.id} {...item} />)
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ payments, currentDate }) => ({
  payments,
  currentDate,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateTotal: (month) =>
      dispatch({ type: UPDATE_TOTAL, payload: { month } }),
    autoPay: (date) => dispatch({ type: AUTO_PAY, payload: { date } }),
    setCurrentDate: (currentDate) =>
      dispatch({ type: SET_CURRENT_DATE, payload: { currentDate } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentList);
