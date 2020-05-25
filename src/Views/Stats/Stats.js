import React from 'react';
import StatsChart from '../../Components/Charts/StatChart';
import CategoryChart from '../../Components/Charts/CategoryChart';
import styles from './Stats.module.scss';
const Stats = () => {
  return (
    <div class={styles.wrapper}>
      <StatsChart />
      <CategoryChart />
    </div>
  );
};

export default Stats;
