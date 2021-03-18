import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CtxPk } from '../app/context-packs/context-pack';
import { CtxPkService } from '../app/context-packs/context-pack.service';

/**
 * A 'mock' version of the `CtxPkService` that can be used to test components
 * without having to create an actual service.
 */
@Injectable()
export class MockCtxPkService extends CtxPkService {
  static testCtxPks: CtxPk[] = [
    {
      _id: 'birthday_id',
      schema: './schema/pack.schema.json',
      name: 'Birthday Pack',
      icon: 'birthday.png',
      enabled: true,
      wordLists: [{
        name: 'birthday',
        enabled: true,

        nouns: [
          { word: 'cake', forms: ['cake', 'cakes'] },
          { word: 'candle', forms: ['candle', 'candles'] },
          { word: 'present', forms: ['present', 'presents'] },
          { word: 'food', forms: ['food', 'foods'] },
          { word: 'piñata', forms: ['piñata', 'piñatas'] },
          { word: 'game', forms: ['game', 'games'] },
          { word: 'birthday', forms: ['birthday'] },
          { word: 'hat', forms: ['hat', 'hats'] },
          { word: 'party', forms: ['party', 'parties'] },
          { word: 'friend', forms: ['friend', 'friends'] },
          { word: 'music', forms: ['music'] },
          { word: 'balloon', forms: ['balloon', 'balloons'] },
          { word: 'card', forms: ['card', 'cards'] },
          { word: 'cupcake', forms: ['cupcake', 'cupcakes'] },
          { word: 'confetti', forms: ['confetti'] },
          { word: 'candy', forms: ['candy', 'candies'] },
          { word: 'food', forms: ['food', 'foods'] },
          { word: 'ice cream', forms: ['ice cream'] },
          { word: 'invitation', forms: ['invitation', 'invitations'] },
          { word: 'pizza', forms: ['pizza', 'pizzas'] },
          { word: 'ribbon', forms: ['ribbon', 'ribbons'] },
          { word: 'year', forms: ['year', 'years'] },
          { word: 'decoration', forms: ['decoration', 'decorations'] },
          { word: 'laughter', forms: ['laughter'] },
          { word: 'parent', forms: ['parent', 'parents'] }
        ],

        verbs: [
          {
            word: 'blow',
            forms: ['blow', 'blows', 'blew', 'blown', 'blowing']
          },
          { word: 'out', forms: ['out'] },
          {
            word: 'celebrate',
            forms: ['celebrate', 'celebrates', 'celebrated', 'celebrating']
          },
          {
            word: 'give',
            forms: ['give', 'gives', 'gave', 'given', 'giving']
          },
          {
            word: 'invite',
            forms: ['invite', 'invites', 'invited', 'inviting']
          },
          { word: 'play', forms: ['play', 'plays', 'played', 'playing'] },
          {
            word: 'receive',
            forms: ['receive', 'receives', 'received', 'receiving']
          },
          {
            word: 'thank',
            forms: ['thank', 'thanks', 'thanked', 'thanking']
          },
          { word: 'wish', forms: ['wish', 'wishes', 'wished', 'wishing'] },
          { word: 'laugh', forms: ['laugh', 'laughs', 'laughed', 'laughing'] }
        ],

        adjectives: [
          { word: 'fun', forms: ['fun'] },
          { word: 'exciting', forms: ['exciting'] },
          { word: 'happy', forms: ['happy'] },
          { word: 'thankful', forms: ['thankful'] },
          { word: 'colorful', forms: ['colorful'] },
          { word: 'dazzling', forms: ['dazzling'] },
          { word: 'delightful', forms: ['delightful'] },
          { word: 'joyful', forms: ['joyful'] },
          { word: 'important', forms: ['important'] },
          { word: 'impressive', forms: ['impressive'] }
        ],

        misc: []
      }
      ]
    }
    ,
    {
      _id: 'farm_id',
      schema: './schema/pack.schema.json',
      name: 'farm',
      icon: 'barn.jpg',
      enabled: true,
      wordLists: [{
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
      }]
    },
    {
      _id: 'jojo_id',
      schema: './schema/pack.schema.json',
      name: 'Jojo Siwa',
      icon: 'jojo.png',
      enabled: true,
      wordLists: [{
        name: 'jojo',
        enabled: true,

        nouns: [
          { word: 'JoJo', forms: ['JoJo'] },
          { word: 'artist', forms: ['artist', 'artists'] },
          {
            word: 'boomerang',
            forms: ['boomerang', 'boomerangs', 'Boomerang']
          },
          { word: 'bow', forms: ['bow', 'bows', 'BowBow'] },
          { word: 'candy', forms: ['candy', 'candies'] },
          { word: 'competition', forms: ['competition', 'competitions'] },
          { word: 'confidence', forms: ['confidence'] },
          { word: 'dancer', forms: ['dancer', 'dancers'] },
          { word: 'drama', forms: ['drama'] },
          { word: 'fashion', forms: ['fashion', 'fashions'] },
          { word: 'girl', forms: ['girl', 'girls'] },
          { word: 'friendship', forms: ['friendship'] },
          { word: 'kid', forms: ['kid', 'kids'] },
          { word: 'kiss', forms: ['kisses'] },
          { word: 'mom', forms: ['mom', 'moms'] },
          { word: 'music', forms: ['music'] },
          { word: 'pageant', forms: ['pageant', 'pageants'] },
          { word: 'power', forms: ['power'] },
          { word: 'puppy', forms: ['puppy', 'puppies'] },
          { word: 'rainbow', forms: ['rainbow', 'rainbows'] },
          { word: 'show', forms: ['show', 'shows'] },
          { word: 'singer', forms: ['singer', 'singers'] },
          { word: 'song', forms: ['song', 'songs'] },
          { word: 'stage', forms: ['stage', 'stages'] },
          { word: 'store', forms: ['store', 'stores'] },
          { word: 'thing', forms: ['thing', 'things'] },
          { word: 'video', forms: ['video', 'videos'] },
          { word: 'vlog', forms: ['vlog', 'vlogs'] },
          { word: 'vlogger', forms: ['vlogger', 'vloggers'] },
          { word: 'word', forms: ['word', 'words'] }
        ],

        verbs: [
          { word: 'dance', forms: ['dance', 'dances', 'danced', 'dancing'] },
          {
            word: 'dream',
            forms: ['dream', 'dreams', 'dreamed', 'dreaming']
          },
          { word: 'get', forms: ['get', 'gets', 'got', 'getting'] },
          { word: 'hold', forms: ['hold', 'holds', 'held', 'holding'] },
          {
            word: 'laugh',
            forms: ['laugh', 'laughs', 'laughed', 'laughing']
          },
          { word: 'like', forms: ['like', 'likes', 'liked', 'liking'] },
          { word: 'love', forms: ['love', 'loves', 'loved', 'loving'] },
          { word: 'make', forms: ['make', 'makes', 'made', 'making'] },
          { word: 'play', forms: ['play', 'plays', 'played', 'playing'] },
          {
            word: 'sing',
            forms: ['sing', 'sings', 'sang', 'sung', 'singing']
          },
          {
            word: 'thank',
            forms: ['thank', 'thanks', 'thanked', 'thanking']
          },
          { word: 'win', forms: ['win', 'wins', 'won', 'winning'] }
        ],

        adjectives: [
          { word: 'best', forms: ['best'] },
          { word: 'colorful', forms: ['colorful'] },
          { word: 'confident', forms: ['confident'] },
          { word: 'dazzling', forms: ['dazzling'] },
          { word: 'delightful', forms: ['delightful'] },
          { word: 'exciting', forms: ['exciting'] },
          { word: 'fun', forms: ['fun'] },
          { word: 'good', forms: ['good'] },
          { word: 'happy', forms: ['happy', 'happier', 'happiest'] },
          { word: 'important', forms: ['important'] },
          { word: 'impressive', forms: ['impressive'] },
          { word: 'joyful', forms: ['joyful'] },
          { word: 'kind', forms: ['kind', 'kindest'] },
          { word: 'posh', forms: ['posh'] },
          { word: 'powerful', forms: ['powerful'] },
          { word: 'sweet', forms: ['sweet', 'sweeter', 'sweetest'] }
        ],

        misc: [
          { word: 'most', forms: ['most'] },
          { word: 'with', forms: ['with'] },
          { word: 'her', forms: ['her'] }
        ]
      }]
     }
  ];

  constructor() {
    super(null);
  }

  getCtxPks(filters: { name?: string; enabled?: boolean }): Observable<CtxPk[]> {
    // Just return the test users regardless of what filters are passed in
    return of(MockCtxPkService.testCtxPks);
  }

  getCtxPkById(id: string): Observable<CtxPk> {
    // If the specified ID is for the first test user,
    // return that user, otherwise return `null` so
    // we can test illegal user requests.
    if (id === MockCtxPkService.testCtxPks[0]._id) {
      return of(MockCtxPkService.testCtxPks[0]);
    } else {
      return of(null);
    }
  }

}
