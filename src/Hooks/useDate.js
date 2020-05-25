import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { SET_CURRENT_DATE } from '../Actions/actions';

const useDate = ({ setCurrentDate }) => {
  const [date, setDate] = useState({ dd: '', mm: '', yyyy: '' });

  const setCurrDate = () => {
    var today = new Date();
    setDate({
      dd: String(today.getDate()),
      mm: String(today.getMonth() + 1),
      yyyy: today.getFullYear(),
    });
  };
  // const getCurrentDate = (today = new Date()) => {
  //   // var today = new Date();
  //   const heute =
  //     String(today.getMonth() + 1) +
  //     '.' +
  //     String(today.getDate()).padStart(2, '0') +
  //     '.' +
  //     today.getFullYear();

  //   return heute;
  // };

  const getCurrentDate = (today = new Date()) => {
    // var today = new Date();
    const heute = [
      String(today.getMonth() + 1),
      String(today.getDate()).padStart(2, '0'),
      today.getFullYear(),
    ];

    return heute;
  };

  useEffect(() => {
    console.log('DUPADUPA');
    setCurrDate();
    setCurrentDate(date);
  }, []);

  return {
    date,
    getCurrentDate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentDate: (currentDate) =>
      dispatch({ type: SET_CURRENT_DATE, payload: { currentDate } }),
  };
};

export const getCurrentDate = (today = new Date()) => {
  // var today = new Date();
  const heute = [
    String(today.getMonth() + 1),
    String(today.getDate()).padStart(2, '0'),
    today.getFullYear(),
  ];

  return heute;
};

export default connect(null, mapDispatchToProps)(useDate);
