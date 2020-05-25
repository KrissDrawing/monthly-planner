import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ADD_PAYMENT } from '../../Actions/actions';
import useForm from '../../Hooks/useForm';
import useDate, { getCurrentDate } from '../../Hooks/useDate';
import validate from './validateLogin';
import styles from './PaymentForm.module.scss';
import { categories } from '../../globals';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import cx from 'classnames';

const PaymentForm = ({ addItem, toggleModal }) => {
  const {
    handleChange,
    handleSubmit,
    handleDateChange,
    handleCategory,
    values,
    errors,
  } = useForm(submit, validate);

  function submit() {
    addItem({
      ...values,
      date: getCurrentDate(values.date),
    });
    toggleModal();
  }
  const ExampleCustomInput = ({ value, onClick }) => (
    <button
      type="button"
      className={cx('button', 'is-info', styles.datePickerButton)}
      onClick={onClick}
    >
      {value}
    </button>
  );

  return (
    <>
      <form className={styles.wrapper} noValidate onSubmit={handleSubmit}>
        <label className="label">Cattegory</label>
        <Dropdown
          className={styles.cattegoryWrapper}
          name="category"
          options={categories}
          onChange={handleCategory}
          value={values.category}
          placeholder="Select an option"
        />
        <label className="label">Date</label>
        <DatePicker
          selected={values.date}
          onChange={(date) => handleDateChange(date)}
          customInput={<ExampleCustomInput />}
        />
        <div className="control">
          <label className="radio">
            <input
              type="radio"
              onChange={handleChange}
              value="automatic"
              name="type"
              checked={values.type === 'automatic'}
            />
            Automatic
          </label>
          <label className="radio">
            <input
              type="radio"
              onChange={handleChange}
              value="manual"
              name="type"
              checked={values.type === 'manual'}
            />
            Manual
          </label>
        </div>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              onChange={handleChange}
              autoComplete="off"
              name="name"
              value={values.name}
              className={errors.name ? 'input is-danger' : 'input'}
              type="text"
              placeholder="spending name"
            />
            {errors.name && <p className="help is-danger">{errors.name}</p>}
          </div>
        </div>
        {values.type === 'automatic' && (
          <div className="field">
            <label className="label">Price</label>
            <div className="control">
              <input
                onChange={handleChange}
                autoComplete="off"
                name="price"
                value={values.price}
                className={errors.price ? 'input is-danger' : 'input'}
                type="number"
                placeholder="spending name"
                min="0"
              />
              {errors.price && <p class="help is-danger">{errors.price}</p>}
            </div>
          </div>
        )}
        <div className="control">
          <button type="submit" className="button is-link">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (newItem) => dispatch({ type: ADD_PAYMENT, payload: { newItem } }),
  };
};

export default connect(null, mapDispatchToProps)(PaymentForm);
