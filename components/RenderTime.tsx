import RenderItem from './RenderItem';
import { Item } from '../pages/index';
interface Props {
  time: string;
  items: any;
}
function RenderTime({ time, items }: Props) {
  return (
    <div className="mb-10 mt-2">
      <h3 className="lg:ml-8">{time}</h3>
      <div className="lg:ml-12">
        {items.map((item: Item) => (
          <RenderItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
export default RenderTime;
