import { WordList } from "../word-lists/word-list";

export interface ContextPack {
  _id: string;
  $schema: string;
  name: string;
  icon: string;
  enabled: boolean;
  wordLists: WordList;
}


