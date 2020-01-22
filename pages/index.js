import { parse } from 'date-fns';
import data from '../data.json';
const results = Object.entries(data).sort(function([dateA], [dateB]) {
  return new Date(dateB) - new Date(dateA);
});
function RenderItems({ date, items }) {
  const formatString = 'yyyy-MM-dd HH:mm';
  const results = Object.entries(items).sort(function([timeA], [timeB]) {
    return (
      parse(`${date} ${timeB}`, formatString, new Date()) -
      parse(`${date} ${timeA}`, formatString, new Date())
    );
  });
  return results.map(([time, item]) => (
    <RenderItem time={time} item={item} key={time} />
  ));
}
function RenderItem({ time, item }) {
  return (
    <div>
      <h3
        style={{
          marginLeft: 100
        }}
      >
        {time}
      </h3>
      <div
        style={{
          marginLeft: 140
        }}
      >
        <strong>{item.name}</strong> {item.gender} {item.age} {item.location}
        <div>{item.detail}</div>
      </div>
    </div>
  );
}
function HomePage() {
  return (
    <>
      <h1>死亡线</h1>
      <div>
        {results.map(([date, items]) => (
          <div key={date}>
            <h2>{date}</h2>
            <RenderItems date={date} items={items} />
          </div>
        ))}
      </div>
    </>
  );
}
export default HomePage;
