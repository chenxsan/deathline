import { NextPage } from 'next';
import Head from 'next/head';

import '../style.css';

import data from '../data';

import RenderDate from '../components/RenderDate';
import ScrollTop from '../components/ScrollTop';

import { Item, Data } from '../data';

type DateTurple = [
  string,
  {
    [time: string]: Item[];
  }
];
type SortedResults = DateTurple[];

export function sortDataByDate(data: Data) {
  return Object.entries(data).sort(function([dateA], [dateB]) {
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });
}

export function flat(arr: SortedResults): Item[] {
  return arr
    .reduce((acc, [_, cur]) => acc.concat(Object.values(cur)), [])
    .reduce((acc, cur) => acc.concat(cur), []);
}

export function len(data: Item[]): number {
  return data.length;
}

// sort data
const results: SortedResults = sortDataByDate(data);

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>武汉肺炎</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <h1 className="text-4xl font-bold py-4 sm:text-5xl">
          武汉肺炎死亡时间线
        </h1>
        <h2 className="">目前已确认 {len(flat(results))} 例死亡</h2>
        <h3 className="pb-4">
          页面更新于：
          {process.env.buildAt}
        </h3>
        <div>
          {results.map(([date, items]) => (
            <div key={date} className="mb-10">
              <h2 className="text-xl bg-black text-white flex items-center sticky top-0 py-2">
                {date}
                <span className="ml-auto mr-2">
                  共{Object.keys(items).length}例
                </span>
              </h2>
              <RenderDate date={date} items={items} />
            </div>
          ))}
        </div>
      </div>
      <ScrollTop />
    </>
  );
};
export default HomePage;
