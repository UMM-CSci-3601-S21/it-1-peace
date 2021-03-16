import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WordList } from '../app/word-lists/word-list';
import { WordListService } from '../app/word-lists/word-list.service';

/**
 * A 'mock' version of the `WordListService` that can be used to test components
 * without having to create an actual service.
 */
@Injectable()
export class MockWordListService extends WordListService {
  static testWordLists: WordList[] = [
    {
      name: 'farm_animals',
      enabled: true,
      nouns: [
        { word: 'goat', forms: ['goat', 'goats'] },
        { word: 'sheep', forms: ['sheep'] },
        { word: 'cat', forms: ['cat', 'cats'] },
        { word: 'dog', forms: ['dog', 'dogs'] },
        { word: 'cow', forms: ['cow', 'cows'] },
        { word: 'pig', forms: ['pig', 'pigs'] },
        { word: 'chicken', forms: ['chicken', 'chickens'] },
        { word: 'duck', forms: ['duck', 'ducks'] },
        { word: 'llama', forms: ['llama', 'llamas'] }
      ],

      verbs: [
        { word: 'moo', forms: ['moo', 'moos', 'mooed', 'mooing'] },
        { word: 'oink', forms: ['oink', 'oinks', 'oinked', 'oinking'] },
        {
          word: 'cluck',
          forms: ['cluck', 'clucks', 'clucking', 'clucked']
        },
        { word: 'baa', forms: ['baa', 'baas', 'baaed', 'baaing'] },
        { word: 'meow', forms: ['meow', 'meows', 'meowing', 'meowed'] },
        { word: 'bark', forms: ['bark', 'barks', 'barked', 'barking'] }
      ],

      adjectives: [],

      misc: []
    },

    {
      name: 'farm_equipment',
      enabled: true,
      nouns: [
        { word: 'harrow', forms: ['harrow', 'harrows'] },
        { word: 'tractor', forms: ['tractor', 'tractors'] },
        {
          word: 'manure spreader',
          forms: ['manure spreader', 'manure spreaders']
        },
        { word: 'seed drill', forms: ['seed drill', 'seed drills'] },
        { word: 'baler', forms: ['baler', 'balers'] },
        { word: 'mower', forms: ['mower', 'mowers'] },
        { word: 'cultivator', forms: ['cultivator', 'cultivators'] },
        { word: 'plow', forms: ['plow', 'plows'] },
        { word: 'backhoe', forms: ['backhoe', 'backhoes'] },
        { word: 'loader', forms: ['loader', 'loaders'] },
        { word: 'sprayer', forms: ['sprayer', 'sprayers'] },
        { word: 'sickle', forms: ['sickle', 'sickles'] },
        { word: 'rake', forms: ['rake', 'rakes'] },
        { word: 'wagon', forms: ['wagon'] },
        { word: 'trailer', forms: ['trailer'] },
        { word: 'farm truck', forms: ['farm truck'] },
        { word: 'hoe', forms: ['hoe'] },
        { word: 'shovel', forms: ['shovel'] }
      ],

      verbs: [
        { word: 'farm', forms: ['farm', 'farms', 'farmed', 'farming'] },
        { word: 'grow', forms: ['grow', 'grows', 'grew', 'growing'] },
        { word: 'plow', forms: ['plow', 'plows', 'plowing', 'plowed'] }
      ],

      adjectives: [],
      misc: []
    }
  ];

  constructor() {
    super(null);
  }

  getWordLists(filters?: { enabled?: boolean; name?: string}): Observable<WordList[]> {
      return of(MockWordListService.testWordLists);
  }

}
