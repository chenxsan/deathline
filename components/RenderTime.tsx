import RenderItem from './RenderItem';
import { Item } from '../data';
interface Props {
  time: string;
  items: any;
}
function RenderTime({ time, items }: Props) {
  return (
    <div className="mb-10 mt-2">
      <h3 className="lg:ml-8">
        <span className="border-2 border-l-0 border-t-0 border-r-0 border-black">
          {time}
        </span>
      </h3>
      <div className="lg:ml-12">
        {items.map((item: Item) => (
          <RenderItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
export default RenderTime;
