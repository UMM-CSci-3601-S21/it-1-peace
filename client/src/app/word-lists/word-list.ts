import { Word } from "./word";

export interface WordList {
  _id: string;
  $schema: string;
  name: string;
  enabled: boolean;
  words: Word[]; //Words
}


