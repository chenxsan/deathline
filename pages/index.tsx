import { NextPage } from 'next';
import Head from 'next/head';

import '../style.css';

import data from '../data.json';

import RenderDate from '../components/RenderDate';
import ScrollTop from '../components/ScrollTop';

export type Gender = 'female' | 'male';
export interface Item {
  name?: string;
  gender?: Gender;
  age?: number;
  location: string[];
  detail?: string;
  source: string;
}

interface Data {
  [date: string]: {
    [time: string]: Item[];
  };
}

type DateTurple = [
  string,
  {
    [time: string]: Item[];
  }
];
type SortedResults = DateTurple[];

function sortDataByDate(data: Data) {
  return Object.entries(data).sort(function([dateA], [dateB]) {
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });
}

function flat(arr: SortedResults): Item[] {
  return arr
    .reduce((acc, [_, cur]) => acc.concat(Object.values(cur)), [])
    .reduce((acc, cur) => acc.concat(cur), []);
}

function len(data: Item[]): number {
  return data.length;
}

// cast type
const d: Data = data as Data;

// sort data
const results: SortedResults = sortDataByDate(d);

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
        <h2 className="pb-4">
          目前已确认 {len(flat(results))} 例死亡；页面更新时间：
          {process.env.buildAt}
        </h2>
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
