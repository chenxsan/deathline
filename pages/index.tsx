import Head from 'next/head';

import '../style.css';

import data from '../data.json';

import RenderDate from '../components/RenderDate';

const results = Object.entries(data).sort(function([dateA], [dateB]) {
  return new Date(dateB).getTime() - new Date(dateA).getTime();
});

type Gender = 'female' | 'male';
interface Item {
  name: string;
  gender: Gender;
  age: number;
  location: string;
  detail: string;
}

function HomePage() {
  return (
    <>
      <Head>
        <title>武汉肺炎</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold pt-4">武汉肺炎死亡时间线</h1>
        <h2 className="pb-4">
          目前已确认{' '}
          {
            results
              .reduce((acc, [_, cur]) => acc.concat(Object.values(cur)), [])
              .reduce((acc, cur) => acc.concat(cur), []).length
          }{' '}
          例死亡
        </h2>
        <div>
          {results.map(([date, items]) => (
            <div key={date} className="mb-10">
              <h2 className="text-xl bg-black text-white flex items-center sticky top-0">
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
    </>
  );
}
export default HomePage;
