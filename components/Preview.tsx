import { len, flat, sortDataByDate } from '../pages/index';

import data from '../data';
import { newDataContext } from '../machines/dataMachine';
import Notification from './Notification';

interface Props {
  ctx: newDataContext;
  copy: (txt: string) => void;
  close: () => void;
  current: any;
}
function Preview({ ctx, copy, current, close }: Props) {
  const txt = `
  "${ctx.date}": {
    "${ctx.time}": [
      { 
        "id": ${len(flat(sortDataByDate(data))) + 1},
        "name": "${ctx.name}",
        "age": ${ctx.age},
        "gender": "${ctx.gender}",
        "detail": "${ctx.detail}",
        "location": ["${ctx.location[0]}", "${ctx.location[1]}", "${
    ctx.location[2]
  }"],
        "source": {
          "name": "${ctx.source.name}",
          "url": "${ctx.source.url}"
        },
      },
    ],
  },
  `;
  return (
    <aside>
      <textarea
        rows={10}
        cols={50}
        className="border flex-grow"
        disabled
        value={txt}
      ></textarea>
      <div>
        <button
          className="transition duration-200 bg-gray-800 text-white rounded px-4 py-2 hover:bg-gray-900"
          onClick={() => copy(txt)}
        >
          复制文本
        </button>
      </div>
      {current.matches({
        idle: 'copied'
      }) ? (
        <Notification msg="复制成功" close={close} />
      ) : (
        undefined
      )}
    </aside>
  );
}
export default Preview;
