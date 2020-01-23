import RenderItem from './RenderItem';
function RenderTime({ time, items }) {
  return (
    <div className="mb-4 mt-2">
      <h3 className="ml-10">{time}</h3>
      <div className="ml-20">
        {items.map(item => (
          <RenderItem item={item} time={time} key={item.name} />
        ))}
      </div>
    </div>
  );
}
export default RenderTime;
