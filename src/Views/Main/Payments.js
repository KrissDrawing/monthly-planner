import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { SET_CURRENT_DATE, SET_STATE } from '../../Actions/actions';
import PaymentList from '../../Components/List/PaymentList';
import PaymentForm from '../../Components/Form/PaymentForm';
import { useOutsideClick } from '../../Hooks/useOutsideClick';
import styles from './Payments.module.scss';
import { FaPlusCircle, FaArrowAltCircleRight } from 'react-icons/fa';
import cx from 'classnames';

const Payments = ({ store, currentDate, setDate, setInitialState }) => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [monthToggle, setMonthToggle] = useState(1);
  const modalRef = useRef(null);

  const toggleModal = () => {
    setModalVisibility(!isModalVisible);
  };

  const toggleDate = () => {
    setMonthToggle(-monthToggle);
    let dateToChange = [+currentDate[0], currentDate[1], currentDate[2]];
    if (monthToggle === 1 && +currentDate[0] === 12) {
      dateToChange[0] = 1;
      dateToChange[2] += monthToggle;
    } else if (monthToggle === -1 && +currentDate[0] === 1) {
      dateToChange[0] = 12;
      dateToChange[2] += monthToggle;
    } else {
      dateToChange[0] = dateToChange[0] + monthToggle;
    }

    setDate([dateToChange[0], dateToChange[1], dateToChange[2]]);
  };

  useOutsideClick(modalRef, toggleModal, isModalVisible);

  useEffect(() => {
    const data = localStorage.getItem('storage');
    if (data) {
      setInitialState(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    let newStore = {
      payments: store.payments,
      total: store.total,
      limit: store.limit,
    };
    localStorage.setItem('storage', JSON.stringify(newStore));
  }, [store]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.dateWrapper}>
        <div
          className={cx(styles.arrowButton, {
            [styles.arrowAnimation]: monthToggle !== 1,
          })}
          onClick={() => toggleDate()}
        >
          <FaArrowAltCircleRight />
        </div>
        <h1 className={styles.dateHeading}>{currentDate.join('.')}</h1>
      </div>
      <button className={cx(styles.buttonAdd)} onClick={toggleModal}>
        <FaPlusCircle className={styles.buttonAdd} />
      </button>
      <div className={cx('modal', { 'is-active': isModalVisible })}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div ref={modalRef} className={styles.paymentWrapper}>
            <PaymentForm toggleModal={toggleModal} />
          </div>
        </div>
        <button
          onClick={toggleModal}
          className="modal-close is-large"
          aria-label="close"
        ></button>
      </div>
      <PaymentList />
    </div>
  );
};

const mapStateToProps = (store) => ({
  store,
  currentDate: store.currentDate,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setDate: (currentDate) =>
      dispatch({ type: SET_CURRENT_DATE, payload: { currentDate } }),
    setInitialState: (store) =>
      dispatch({ type: SET_STATE, payload: { store } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
