import { Word } from './word';

export interface WordList {
  _id: string;
  name: string;
  enabled: boolean;
  nouns: Word[];
  verbs: Word[];
  adjectives: Word[];
  misc: Word[];
}


