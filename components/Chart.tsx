import { Suspense } from 'react';
import data, { Item } from '../data';
import StackedBar from './StackedBar';
import useClient from '../hooks/useClient';
const dates: string[] = Object.keys(data).sort((a, b) => {
  return new Date(a).getTime() - new Date(b).getTime();
});

const statistic: number[] = dates
  .map(date => Object.values(data[date]).reduce((acc, cur) => acc.concat(cur)))
  .map(arr => arr.length);

const itemContainer: Item[] = [];
const acc: {
  [key: string]: Item[];
} = {
  '0-9': itemContainer,
  '10-19': itemContainer,
  '20-29': itemContainer,
  '30-39': itemContainer,
  '40-49': itemContainer,
  '50-59': itemContainer,
  '60-69': itemContainer,
  '70-79': itemContainer,
  '80-89': itemContainer,
  '90-99': itemContainer,
  unknown: itemContainer
};
const groupDataByGender = dates
  .map(date => Object.values(data[date]).reduce((acc, cur) => acc.concat(cur)))
  .reduce((acc, cur) => acc.concat(cur))
  .reduce((acc, cur) => {
    if (!cur.age) {
      acc['unknown'] = acc['unknown'].concat([cur]);
      return acc;
    }
    switch (true) {
      case cur.age >= 0 && cur.age < 10:
        acc['0-9'] = acc['0-9'].concat([cur]);
        break;
      case cur.age >= 10 && cur.age < 20:
        acc['10-19'] = acc['10-19'].concat([cur]);
        break;
      case cur.age >= 20 && cur.age < 30:
        acc['20-29'] = acc['20-29'].concat([cur]);
        break;
      case cur.age >= 30 && cur.age < 40:
        acc['30-39'] = acc['30-39'].concat([cur]);
        break;
      case cur.age >= 40 && cur.age < 50:
        acc['40-49'] = acc['40-49'].concat([cur]);
        break;
      case cur.age >= 50 && cur.age < 60:
        acc['50-59'] = acc['50-59'].concat([cur]);
        break;
      case cur.age >= 60 && cur.age < 70:
        acc['60-69'] = acc['60-69'].concat([cur]);
        break;
      case cur.age >= 70 && cur.age < 80:
        acc['70-79'] = acc['70-79'].concat([cur]);
        break;
      case cur.age >= 80 && cur.age < 90:
        acc['80-89'] = acc['80-89'].concat([cur]);
        break;
      case cur.age >= 90 && cur.age < 100:
        acc['90-99'] = acc['90-99'].concat([cur]);
        break;

      default:
    }
    return acc;
  }, acc);
function Chart() {
  const client = useClient();

  if (!client) return null;

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
  const keys: string[] = Object.keys(groupDataByGender).sort(
    (a, b) => Number(a.substr(0, 1)) * 1 - Number(b.substr(0, 1)) * 1
  );
  const d = {
    series: [
      {
        name: '各年龄段死亡人数',
        data: keys.map((k: string) => groupDataByGender[k]).map(v => v.length)
      }
    ],
    xAxis: {
      categories: keys
    },
    title: ''
  };

  return (
    <Suspense fallback={<div>loading</div>}>
      <div className="mb-2 lg:mb-0 ml-2 lg:ml-2 sticky top-0">
        {/* <StackedBar data={data} /> */}
        <StackedBar data={d} />
      </div>
    </Suspense>
  );
}
export default Chart;
