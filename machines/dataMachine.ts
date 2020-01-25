import { Machine, assign } from 'xstate';
import copy from 'clipboard-copy';
import { Gender, Source } from '../data';
export const events = {
  CHANGE_DATE: 'CHANGE_DATE',
  CHANGE_TIME: 'CHANGE_TIME',
  CHANGE_NAME: 'CHANGE_NAME',
  CHANGE_AGE: 'CHANGE_AGE',
  CHANGE_GENDER: 'CHANGE_GENDER',
  CHANGE_DETAIL: 'CHANGE_DETAIL',
  CHANGE_LOCATION: 'CHANGE_LOCATION',
  CHANGE_SOURCE: 'CHANGE_SOURCE',
  COPY: 'COPY',
  CLOSE: 'CLOSE'
};
export interface newDataContext {
  date: string;
  time: string;
  name: string;
  age: number;
  gender: Gender;
  detail: string;
  location: string[];
  source: Source;
}
export default Machine<newDataContext>({
  id: 'newData',
  initial: 'idle',
  context: {
    date: '',
    time: '',
    name: '',
    age: 100,
    gender: 'male',
    detail: '',
    location: ['中国', '湖北省', '武汉市'],
    source: {
      name: '',
      url: ''
    }
  },
  states: {
    idle: {
      initial: 'editing',
      states: {
        editing: {},
        copying: {
          invoke: {
            id: 'copytext',
            src: (ctx, evt) => copy(evt.txt),
            onDone: 'copied'
          }
        },
        copied: {
          after: {
            3000: {
              target: 'editing'
            }
          },
          on: {
            [events.CLOSE]: 'editing'
          }
        }
      },
      on: {
        [events.CHANGE_DATE]: {
          target: 'idle',
          actions: assign({
            date: (ctx, evt) => evt.date
          })
        },
        [events.CHANGE_TIME]: {
          actions: assign({
            time: (ctx, evt) => evt.time
          })
        },
        [events.CHANGE_NAME]: {
          actions: assign({
            name: (ctx, evt) => evt.name
          })
        },
        [events.CHANGE_AGE]: {
          actions: assign({
            age: (ctx, evt) => evt.age
          })
        },
        [events.CHANGE_GENDER]: {
          actions: assign({
            gender: (ctx, evt) => evt.gender
          })
        },
        [events.CHANGE_DETAIL]: {
          actions: assign({
            detail: (ctx, evt) => evt.detail
          })
        },
        [events.CHANGE_LOCATION]: {
          actions: assign({
            location: (ctx, evt) => evt.location
          })
        },
        [events.CHANGE_SOURCE]: {
          actions: assign({
            source: (ctx, evt) => evt.source
          })
        },
        [events.COPY]: {
          target: '.copying'
        }
      }
    }
  }
});
