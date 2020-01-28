import { Suspense } from 'react';
import data from '../data';
import StackedBar from './StackedBar'
import useClient from '../hooks/useClient';
const dates = Object.keys(data).sort((a, b) => {
  return new Date(a).getTime() - new Date(b).getTime();
});
const males = dates
  .map(date => {
    return Object.values(data[date])
      .flat()
      .filter(item => item.gender === 'male');
  })
  .map(arr => arr.length);
const females = dates
  .map(date => {
    return Object.values(data[date])
      .flat()
      .filter(item => item.gender === 'female');
  })
  .map(arr => arr.length);
const statistic = dates.map(date => Object.values(data[date]).flat()).map(arr => arr.length)
function Chart() {
  const client = useClient();
  const data = {
    series: [
      {
        name: '死亡人数',
        data: statistic
      }
    ],
    xAxis: {
      categories: dates
    },
    title: ''
  };
  if (!client) return null;

  return (
    <Suspense fallback={<div>loading</div>}>
      <div className="mb-2 lg:mb-0 ml-2 lg:ml-2 sticky top-0">
        <StackedBar data={data} />
      </div>
    </Suspense>
  );
}
export default Chart;
