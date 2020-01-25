import data from './data.json';
export type Gender = 'female' | 'male' | 'other';
export interface Source {
  name: string;
  url: string;
}
export interface Item {
  id: number;
  name?: string;
  gender?: Gender;
  age?: number;
  location: string[];
  detail?: string;
  source: Source;
}
export interface Data {
  [date: string]: {
    [time: string]: Item[];
  };
}
// cast type
const d: Data = data as Data;
export default d;
