import { parse } from 'date-fns';
import RenderTime from './RenderTime';
import { Item } from '../data';

interface Props {
  date: string;
  items: any;
}

type TimeArr = [string, Item[]];

const formatString = 'yyyy-MM-dd HH:mm';

function RenderDate({ date, items }: Props) {
  const results = Object.entries(items).sort(function([timeA], [timeB]) {
    return (
      parse(`${date} ${timeB}`, formatString, new Date()).getTime() -
      parse(`${date} ${timeA}`, formatString, new Date()).getTime()
    );
  });
  return (
    <div>
      {results.map(([time, items]: TimeArr) => (
        <RenderTime time={time} items={items} key={time} />
      ))}
    </div>
  );
}
export default RenderDate;
