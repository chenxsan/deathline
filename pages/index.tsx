import { NextPage } from 'next';
import Head from 'next/head';

import '../style.css';

import data from '../data';

import RenderDate from '../components/RenderDate';
import ScrollTop from '../components/ScrollTop';
import Chart from '../components/Chart';

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
      <header>
        <h1 className="text-4xl font-bold py-4 sm:text-5xl">
          武汉肺炎死亡时间线
        </h1>
        <h2 className="">目前已确认 {len(flat(results))} 例死亡</h2>
        <h3 className="pb-4">
          数据更新至 2020-01-25；
          <a
            href="https://github.com/chenxsan/deathline"
            className="underline text-blue-700 hover:text-blue-800"
          >
            查看源代码
          </a>
        </h3>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
        <Head>
          <title>武汉肺炎</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <main className="order-last lg:order-first">
          <div>
            {results.map(([date, items]) => (
              <div key={date} className="mb-20">
                <h2 className="shadow text-xl border-4 border-l-0 border-r-0 border-b-0 bg-gray-100 border-black flex items-center sticky top-0 py-2">
                  {date}
                  <span className="ml-auto mr-2">
                    共{Object.keys(items).length}例
                  </span>
                </h2>
                <RenderDate date={date} items={items} />
              </div>
            ))}
          </div>
        </main>
        <aside className="order-first lg:order-last">
          <Chart />
        </aside>
      </div>
      <footer className="mb-10">
        <ScrollTop />
      </footer>
    </>
  );
};
export default HomePage;
