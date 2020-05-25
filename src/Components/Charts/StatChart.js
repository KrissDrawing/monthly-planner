import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useDate from '../../Hooks/useDate';
import { Bar } from 'react-chartjs-2';
import { withRouter } from 'react-router';
import styles from './StatChart.module.scss';

const StatChart = ({ payments, limit, currentDate }) => {
  const [chartData, setChartData] = useState({});
  const [range, setRange] = useState(6);

  const monthRange = (currMonth, range) => {
    currMonth = +currMonth;
    const months = [currMonth];
    for (let i = 0; i < range - 1; i++) {
      currMonth--;
      if (currMonth <= 0) {
        currMonth = 12;
      }
      months.push(currMonth);
    }
    return months.reverse();
  };

  const filterPayment = (months) => {
    const totalAmount = [];
    for (let i = 0; i < months.length; i++) {
      let paymentsData = [0];
      payments.forEach((item) => {
        if (+item.date[0] === months[i]) {
          paymentsData.push(item.price);
        }
      });
      let sumTmp = paymentsData.reduce((sum, amount) => (amount += +sum));
      totalAmount.push(sumTmp);
    }
    return totalAmount;
  };

  const setLimit = (months, limit) => {
    const limitPlot = [];
    for (let i = 0; i < months.length; i++) {
      limitPlot.push(limit);
    }
    return limitPlot;
  };

  const chart = (month) => {
    setChartData({
      labels: monthRange(month, range),

      datasets: [
        {
          type: 'bar',
          label: 'expanses',
          labels: monthRange(month, range),
          data: filterPayment(monthRange(month, range)),
          barThickness: 20,
          borderWidth: 4,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
        {
          type: 'line',
          label: 'limit',
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          data: setLimit(monthRange(month, range), limit),
          pointRadius: 0,
        },
      ],
      fontColor: 'white',
    });
  };

  useEffect(() => {
    if (currentDate[0]) {
      chart(currentDate[0]);
    }
  }, [currentDate, range]);

  return (
    <div className={styles.wrapper}>
      <h3 class={styles.heading}>Monthly expenses</h3>
      <div class={styles.controlWrapper}>
        <button class="button" onClick={() => setRange(3)}>
          3
        </button>
        <button class="button" onClick={() => setRange(6)}>
          6
        </button>
        <button class="button" onClick={() => setRange(9)}>
          9
        </button>
      </div>
      <Bar
        data={chartData}
        options={{
          legend: {
            labels: {
              fontColor: 'white', //set your desired color
            },
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  fontColor: 'white',
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: 'white',
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

const mapStateToProps = ({ payments, limit, currentDate }) => ({
  payments,
  limit,
  currentDate,
});

export default connect(mapStateToProps)(StatChart);
