import { Word } from "./word";

export interface WordList {
  _id: string;
  $schema: string;
  name: string;
  icon: string;
  enabled: boolean;
  metadata: string;
  words: Word; //Will be a new type word
}


