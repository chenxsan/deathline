import { Item, Gender } from '../data';
interface getGender {
  (gender: Gender): string;
}
const returnGenderInChinese: getGender = function(gender) {
  switch (gender) {
    case 'male':
      return '男';
    case 'female':
      return '女';
    default:
      return '未知';
  }
};
interface Props {
  item: Item;
}

function RenderItem({ item }: Props) {
  const { gender = 'other' } = item;
  return (
    <div className="ml-4">
      <div>
        <strong className="text-2xl">{item.name || '?'}</strong>{' '}
        {returnGenderInChinese(gender)} [{item.location.join('‧')}]
      </div>
      <div className="flex">
        <span className="font-bold flex-shrink-0">年龄：</span>
        {item.age || '?'}
      </div>
      <div className="flex">
        <span className="font-bold flex-shrink-0">详情：</span>
        {item.detail}
      </div>
      <div className="flex">
        <span className="font-bold flex-shrink-0">来源：</span>
        <a
          href={item.source.url}
          className="underline text-blue-700 hover:text-blue-800"
        >
          {item.source.name}
        </a>
      </div>
    </div>
  );
}
export default RenderItem;
