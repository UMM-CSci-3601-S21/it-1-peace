import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CtxPk } from './context-pack';
import { CtxPkService } from './context-pack.service';
import { WordList } from '../word-lists/word-list';
import { Word } from '../word-lists/word';

describe('Context pack service: ', () => {
  // A small collection of test users

  const testCtxPks: CtxPk[] = [
    {
      _id: 'birthday_id',
      name: 'Birthday Pack',
      schema: './schema/pack.schema.json',
      icon: 'birthday.png',
      enabled: true,
      wordLists: [{
        name: 'birthday_words',
        enabled: true,
        nouns: [{ word: 'cake', forms: ['cake', 'cakes']}],
        verbs: [{ word: 'dance', forms: ['dance', 'dancing']}],
        adjectives: [{ word: 'sweet', forms: ['sweet', 'sweetest']}],
        misc: [{ word: 'hooray', forms: ['hooray']}]
      }]
    },
    {
      _id: 'farm_id',
      name: 'farm',
      schema: './schema/pack.schema.json',
      icon: 'barn.jpg',
      enabled: true,
      wordLists: [{
        name: 'farm_words',
        enabled: true,
        nouns: [{ word: 'farm', forms: ['farm', 'farms']}],
        verbs: [{ word: 'till', forms: ['till', 'tilling']}],
        adjectives: [{ word: 'fresh', forms: ['fresh', 'freshest']}],
        misc: [{ word: 'aaahh', forms: ['aaahh']}]
      }]
    },
    {
      _id: 'jojo_id',
      name: 'Jojo Siwa',
      schema: './schema/pack.schema.json',
      icon: 'jojo.png',
      enabled: false,
      wordLists: [{
        name: 'jojos_words',
        enabled: false,
        nouns: [],
        verbs: [],
        adjectives: [],
        misc: []
      }]
    }
  ];
  let ctxPkService: CtxPkService;
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
    ctxPkService = new CtxPkService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('getCtxPks() calls api/ctxPks', () => {
    // Assert that the users we get from this call to getUsers()
    // should be our set of test users. Because we're subscribing
    // to the result of getUsers(), this won't actually get
    // checked until the mocked HTTP request 'returns' a response.
    // This happens when we call req.flush(testUsers) a few lines
    // down.
    ctxPkService.getCtxPks().subscribe(
      ctxPks => expect(ctxPks).toBe(testCtxPks)
    );

    // Specify that (exactly) one request will be made to the specified URL.
    const req = httpTestingController.expectOne(ctxPkService.ctxPkUrl);
    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');
    // Specify the content of the response to that request. This
    // triggers the subscribe above, which leads to that check
    // actually being performed.
    req.flush(testCtxPks);
  });

  it('getCtxPks() calls api/ctxPks with filter parameter \'name\'', () => {

    ctxPkService.getCtxPks({ name: 'birthday' }).subscribe(
      ctxPks => expect(ctxPks).toBe(testCtxPks)
    );

    // Specify that (exactly) one request will be made to the specified URL with the role parameter.
    const req = httpTestingController.expectOne(
      (request) => request.url.startsWith(ctxPkService.ctxPkUrl) && request.params.has('name')
    );

    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');

    // Check that the role parameter was 'admin'
    expect(req.request.params.get('name')).toEqual('birthday');

    req.flush(testCtxPks);
  });

  it('getCtxPks() calls api/ctxPks with filter parameter \'enabled\'', () => {

    ctxPkService.getCtxPks({ enabled: true }).subscribe(
      ctxPks => expect(ctxPks).toBe(testCtxPks)
    );

    // Specify that (exactly) one request will be made to the specified URL with the role parameter.
    const req = httpTestingController.expectOne(
      (request) => request.url.startsWith(ctxPkService.ctxPkUrl) && request.params.has('enabled')
    );

    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');

    // Check that the role parameter was 'admin'
    expect(req.request.params.get('enabled')).toEqual('true');

    req.flush(testCtxPks);
  });

  it('getCtxPks() calls api/ctxPks with multiple filter parameters', () => {

    ctxPkService.getCtxPks({ name: 'birthday', enabled: true }).subscribe(
      ctxPks => expect(ctxPks).toBe(testCtxPks)
    );

    // Specify that (exactly) one request will be made to the specified URL with the role parameter.
    const req = httpTestingController.expectOne(
      (request) => request.url.startsWith(ctxPkService.ctxPkUrl)
        && request.params.has('name') && request.params.has('enabled')
    );

    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');

    // Check that the role parameters are correct
    expect(req.request.params.get('name')).toEqual('birthday');
    expect(req.request.params.get('enabled')).toEqual('true');

    req.flush(testCtxPks);
  });

  it('getCtxPkById() calls api/ctxPks/id', () => {
    const targetCtxPk: CtxPk = testCtxPks[1];
    const targetId: string = targetCtxPk._id;
    ctxPkService.getCtxPkById(targetId).subscribe(
      ctxPk => expect(ctxPk).toBe(targetCtxPk)
    );

    const expectedUrl: string = ctxPkService.ctxPkUrl + '/' + targetId;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(targetCtxPk);
  });

  it('filterCtxPks() filters by name', () => {
    expect(testCtxPks.length).toBe(3);
    const ctxPkName = 'r';
    expect(ctxPkService.filterCtxPks(testCtxPks, { name: ctxPkName }).length).toBe(2);
  });

  it('filterCtxPks() filters by enabled', () => {
    expect(testCtxPks.length).toBe(3);
    const ctxPkEnabled = false;
    expect(ctxPkService.filterCtxPks(testCtxPks, { enabled: ctxPkEnabled }).length).toBe(1);
  });

  it('filterCtxPks() filters by name and enabled', () => {
    expect(testCtxPks.length).toBe(3);
    const ctxPkName = 'Jojo';
    const ctxPkEnabled = false;
    expect(ctxPkService.filterCtxPks(testCtxPks, { name: ctxPkName, enabled: ctxPkEnabled }).length).toBe(1);
  });

  /*
  it('addCtxPk() posts to api/context-packs', () => {

    ctxPkService.addCtxPk(testCtxPks[1]).subscribe(
      id => expect(id).toBe('testid')
    );

    const req = httpTestingController.expectOne(userService.userUrl);

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testUsers[1]);

    req.flush({id: 'testid'});
  });
  */
});
