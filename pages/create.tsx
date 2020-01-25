import { NextPage } from 'next';
import Head from 'next/head';
import dataMachine, { events } from '../machines/dataMachine';
import { useMachine } from '@xstate/react';
import produce from 'immer';
import '../style.css';
import { ChangeEvent } from 'react';

import { Source } from '../data';
import Preview from '../components/Preview';

const CreatePage: NextPage = () => {
  const [current, send] = useMachine(dataMachine);
  function change(key: string, evt) {
    send(`CHANGE_${key.toUpperCase()}`, {
      [key]: evt.target.value
    });
  }
  function changeDate(e: ChangeEvent) {
    change('date', e);
  }
  function changeTime(e: ChangeEvent) {
    change('time', e);
  }
  function changeName(e: ChangeEvent) {
    change('name', e);
  }
  function changeAge(e: ChangeEvent) {
    change('age', e);
  }
  function changeGender(e: ChangeEvent) {
    change('gender', e);
  }
  function changeDetail(e: ChangeEvent) {
    change('detail', e);
  }
  function changeLocation(location: string[]) {
    send(events.CHANGE_LOCATION, {
      location
    });
  }
  function changeSource(source: Source) {
    send(events.CHANGE_SOURCE, {
      source
    });
  }
  function copy(txt: string) {
    send(events.COPY, {
      txt
    });
  }
  function close() {
    send(events.CLOSE);
  }
  return (
    <>
      <Head>
        <title>新增数据</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1 className="text-3xl font-bold py-4">新增数据</h1>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-grow">
          <div className="my-2">
            <label htmlFor="date" className="w-24 text-right inline-block">
              死亡日期：
            </label>
            <input
              id="date"
              type="text"
              placeholder="2020-01-02"
              className="border"
              value={current.context.date}
              onChange={changeDate}
            />
          </div>
          <div className="my-2">
            <label htmlFor="time" className="w-24 text-right inline-block">
              死亡时间：
            </label>
            <input
              id="time"
              type="text"
              placeholder="10:10"
              className="border"
              value={current.context.time}
              onChange={changeTime}
            />
          </div>
          <div className="my-2">
            <label htmlFor="name" className="w-24 text-right inline-block">
              姓名：
            </label>
            <input
              id="name"
              type="text"
              className="border"
              value={current.context.name}
              onChange={changeName}
            />
          </div>
          <div className="my-2">
            <label htmlFor="age" className="w-24 text-right inline-block">
              年龄：
            </label>
            <input
              id="age"
              type="number"
              min={0}
              max={150}
              step={1}
              className="border"
              value={current.context.age}
              onChange={changeAge}
            />
          </div>
          <div className="my-2">
            <label htmlFor="gender" className="w-24 text-right inline-block">
              性别：
            </label>
            <select onChange={changeGender} value={current.context.gender}>
              <option value="male">男</option>
              <option value="female">女</option>
              <option value="other">未知</option>
            </select>
          </div>
          <div className="my-2">
            <label className="w-24 text-right inline-block">地区：</label>
            <select
              value={current.context.location[0]}
              onChange={e => {
                const next = produce(current.context.location, draft => {
                  draft[0] = e.target.value;
                });
                changeLocation(next);
              }}
              className="mr-1"
            >
              <option value="中国">中国</option>
            </select>
            <select
              value={current.context.location[1]}
              onChange={e => {
                const next = produce(current.context.location, draft => {
                  draft[1] = e.target.value;
                });
                changeLocation(next);
              }}
              className="mr-1"
            >
              <option value="湖北省">湖北省</option>
              <option value="河北省">河北省</option>
              <option value="黑龙江省">黑龙江省</option>
            </select>
            <select
              value={current.context.location[2]}
              onChange={e => {
                const next = produce(current.context.location, draft => {
                  draft[2] = e.target.value;
                });
                changeLocation(next);
              }}
            >
              <option value="武汉市">武汉市</option>
            </select>
          </div>
          <div className="my-2">
            <label htmlFor="detail" className="w-24 text-right inline-block">
              详情：
            </label>
            <textarea
              id="detail"
              className="border"
              value={current.context.detail}
              onChange={changeDetail}
            />
          </div>
          <div className="my-2">
            <label className="w-24 text-right inline-block">来源：</label>
            <input
              type="text"
              className="border mr-2"
              placeholder="部门名称"
              value={current.context.source.name}
              onChange={e => {
                changeSource({
                  ...current.context.source,
                  name: e.target.value
                });
              }}
            />
            <input
              type="text"
              className="border"
              placeholder="url"
              value={current.context.source.url}
              onChange={e => {
                changeSource({
                  ...current.context.source,
                  url: e.target.value
                });
              }}
            />
          </div>
        </div>
        <Preview
          ctx={current.context}
          copy={copy}
          current={current}
          close={close}
        />
      </div>
    </>
  );
};
export default CreatePage;
