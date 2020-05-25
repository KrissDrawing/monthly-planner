import React from 'react';
import { connect } from 'react-redux';
import { DELETE_PAYMENT, MARK_AS_PAID } from '../../Actions/actions';
import styles from './ListItem.module.scss';
import { FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';
import { FaAt, FaWpforms } from 'react-icons/fa';
import { FiDollarSign } from 'react-icons/fi';
import { GiHealthNormal } from 'react-icons/gi';
import { RiBankLine } from 'react-icons/ri';
import cx from 'classnames';

const ListItem = ({
  name,
  date,
  price,
  type,
  id,
  isPaid,
  category,
  currentDate,
  deleteItem,
  payForItem,
}) => {
  const categoryIcons = {
    other: <FaWpforms />,
    health: <GiHealthNormal />,
    entertainment: <FaAt />,
    loans: <RiBankLine />,
  };

  const handlePay = () => {
    let manualPrice;
    if ((manualPrice = prompt('Set price'))) {
      console.log(manualPrice);
      if (manualPrice <= 0) {
        alert('price must be greater than zero');
      } else if (
        manualPrice !== '' &&
        manualPrice !== null &&
        !isNaN(manualPrice)
      ) {
        payForItem(id, +manualPrice);
      } else {
        alert('price must be a number');
      }
    }
  };
  return (
    <article
      className={cx('message', styles.bodyWrapper, {
        [styles.paymentOverdue]:
          type === 'manual' && !isPaid && +currentDate[1] >= +date[1],
      })}
    >
      <div className="message-header">
        <div class="dropdown is-hoverable">
          <div class="dropdown-trigger">
            <div
              className={styles.iconWrapper}
              aria-haspopup="true"
              aria-controls="dropdown-menu4"
            >
              {categoryIcons[category]}
            </div>
          </div>
          <div class="dropdown-menu" id="dropdown-menu4" role="menu">
            <div class={cx('dropdown-content', styles.dropdownWrapper)}>
              <div class="dropdown-item">
                <p>{category}</p>
              </div>
            </div>
          </div>
        </div>

        <p className={name.length > 8 ? styles.nameSmall : styles.nameRegular}>
          {name}
        </p>
        <button
          onClick={() => deleteItem(id)}
          className="delete"
          aria-label="delete"
        ></button>
      </div>
      <div className="message-body">
        <div className="columns">
          <div className="column">
            <FaCalendarAlt />
            &nbsp;{date.join('.')}
            {type === 'manual' && isPaid !== true && (
              <button onClick={handlePay} className="button">
                <FaMoneyBillWave />
                &nbsp; PAY
              </button>
            )}
          </div>
          {price && (
            <div className="column">
              <FiDollarSign />
              {price}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (id) => dispatch({ type: DELETE_PAYMENT, payload: { id } }),
    payForItem: (id, price) =>
      dispatch({ type: MARK_AS_PAID, payload: { id, price } }),
  };
};

const mapStateToProps = ({ currentDate }) => ({ currentDate });

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
