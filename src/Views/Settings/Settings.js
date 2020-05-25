import React, { useState } from 'react';
import { connect } from 'react-redux';
import { SET_LIMIT } from '../../Actions/actions';
import styles from './Settings.module.scss';

const Settings = ({ setLimitRed, rdLimit }) => {
  const [limit, setLimit] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setLimit(e.target.value);
  };

  return (
    <>
      <form
        className={styles.wrapper}
        onSubmit={() => {
          if (limit !== '') {
            setLimitRed(limit);
            setLimit('');
          } else {
            alert('limit must be a number');
          }
        }}
        autoComplete="off"
      >
        <p className="has-text-white">Limit: {rdLimit}</p>
        <div className="field">
          <label className="label">Payment Limit</label>
          <div className="control">
            <input
              className="input"
              type="number"
              min="0"
              onChange={handleChange}
              value={limit}
            />
          </div>

          <button className="button" type="submit">
            Set Limit
          </button>
        </div>
      </form>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLimitRed: (limit) => dispatch({ type: SET_LIMIT, payload: { limit } }),
  };
};

const mapStateToProps = ({ limit }) => ({ rdLimit: limit });

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
