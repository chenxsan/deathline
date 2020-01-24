import { Item, Gender } from '../pages/index';
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
  return (
    <div className="ml-4">
      <div>
        <strong className="text-2xl">{item.name || '?'}</strong>{' '}
        {returnGenderInChinese(item.gender)} [{item.location.join('‧')}]
      </div>
      <div>年龄：{item.age || '?'}</div>
      <div>{item.detail}</div>
      <div>
        <a
          href={item.source}
          className="underline text-blue-700 hover:text-blue-800"
        >
          source
        </a>
      </div>
    </div>
  );
}
export default RenderItem;
