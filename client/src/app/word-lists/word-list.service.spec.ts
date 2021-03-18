import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { WordList } from './word-list';
import { WordListService } from './word-list.service';

describe('Word list service: ', () => {
  const testWordLists: WordList[] = [
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
  let wordListService: WordListService;
  // These are used to mock the HTTP requests so that we (a) don't have to
  // have the server running and (b) we can check exactly which HTTP
  // requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    wordListService = new WordListService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('getWordLists() calls api/wordLists', () => {
    // Assert that the wordLists we get from this call to getWordLists()
    // should be our set of test wordLists. Because we're subscribing
    // to the result of getWordLists(), this won't actually get
    // checked until the mocked HTTP request 'returns' a response.
    // This happens when we call req.flush(testWordLists) a few lines
    // down.
    wordListService.getWordLists().subscribe(
      wordLists => expect(wordLists).toBe(testWordLists)
    );

    // Specify that (exactly) one request will be made to the specified URL.
    const req = httpTestingController.expectOne(wordListService.wordListUrl);
    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');
    // Specify the content of the response to that request. This
    // triggers the subscribe above, which leads to that check
    // actually being performed.
    req.flush(testWordLists);
  });

  it('getWordLists() calls api/wordLists with filter parameter \'name\'', () => {

    wordListService.getWordLists({ name: 'farm_equipment' }).subscribe(
      wordLists => expect(wordLists).toBe(testWordLists)
    );

    // Specify that (exactly) one request will be made to the specified URL with the role parameter.
    const req = httpTestingController.expectOne(
      (request) => request.url.startsWith(wordListService.wordListUrl) && request.params.has('name')
    );

    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');

    // Check that the role parameter was 'admin'
    expect(req.request.params.get('name')).toEqual('farm_equipment');

    req.flush(testWordLists);
  });

  it('getWordLists() calls api/wordLists with multiple filter parameters', () => {

    wordListService.getWordLists({ name: 'farm_equipment', enabled: true }).subscribe(
      wordLists => expect(wordLists).toBe(testWordLists)
    );

    // Specify that (exactly) one request will be made to the specified URL with the role parameter.
    const req = httpTestingController.expectOne(
      (request) => request.url.startsWith(wordListService.wordListUrl)
        && request.params.has('name') && request.params.has('enabled')
    );

    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');

    // Check that the role parameters are correct
    expect(req.request.params.get('name')).toEqual('farm_equipment');
    expect(req.request.params.get('enabled')).toEqual('true');
    req.flush(testWordLists);
  });

  it('filterWordLists() filters by name', () => {
    expect(testWordLists.length).toBe(2);
    const wordListName = 'farm_animals';
    expect(wordListService.filterWordLists(testWordLists, { name: wordListName }).length).toBe(1);
  });

  it('filterWordLists() filters by enabled', () => {
    expect(testWordLists.length).toBe(2);
    const wordListEnabled = false;
    expect(wordListService.filterWordLists(testWordLists, { enabled: wordListEnabled }).length).toBe(0);
  });

  it('filterWordLists() filters by name and enabled', () => {
    expect(testWordLists.length).toBe(2);
    const wordListName = 'farm_animals';
    const wordListEnabled = true;
    expect(wordListService.filterWordLists(testWordLists, { name: wordListName, enabled: wordListEnabled }).length).toBe(1);
  });
});
