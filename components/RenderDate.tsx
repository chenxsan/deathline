import { parse } from 'date-fns';
import RenderTime from './RenderTime';
function RenderDate({ date, items }) {
  const formatString = 'yyyy-MM-dd HH:mm';
  const results = Object.entries(items).sort(function([timeA], [timeB]) {
    return (
      parse(`${date} ${timeB}`, formatString, new Date()).getTime() -
      parse(`${date} ${timeA}`, formatString, new Date()).getTime()
    );
  });
  return (
    <div>
      {results.map(([time, items]) => (
        <RenderTime time={time} items={items} key={time} />
      ))}
    </div>
  );
}
export default RenderDate;
