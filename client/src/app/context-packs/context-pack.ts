import { WordList } from '../word-lists/word-list';

export interface CtxPk {
  _id: string;
  schema: string;
  name: string;
  icon: string;
  enabled: boolean;
  wordLists: WordList[];
}


