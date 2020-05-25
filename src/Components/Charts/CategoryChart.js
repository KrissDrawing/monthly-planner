import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { categories } from '../../globals';
import { Pie } from 'react-chartjs-2';
import styles from './CategoryChart.module.scss';

const CategoryChart = ({ payments, currentDate, limit }) => {
  const [chartData, setChartData] = useState({});
  const [range, setRange] = useState(6);

  const populateData = () => {
    const categoryValue = [];
    categories.forEach((item) =>
      categoryValue.push(
        payments
          .map((fitem) => (fitem.category === item ? +fitem.price : 0))
          .reduce((a, b) => a + b),
      ),
    );
    return categoryValue;
  };

  const chart = () => {
    setChartData({
      labels: categories,

      datasets: [
        {
          type: 'pie',
          label: 'expanses',
          data: populateData(),

          borderWidth: 4,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
        },
      ],
    });
  };
  let options = () => ({
    legend: {
      labels: {
        fontColor: 'white', //set your desired color
      },
    },
  });

  useEffect(() => {
    if (currentDate[0]) {
      chart(currentDate[0]);
    }
  }, [currentDate, range]);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>This Month</h3>
      <Pie
        data={chartData}
        options={{
          legend: {
            labels: {
              fontColor: 'white', //set your desired color
            },
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

export default connect(mapStateToProps)(CategoryChart);
