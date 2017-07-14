import { BlankAndWhitePage } from './app.po';

describe('blank-and-white App', () => {
  let page: BlankAndWhitePage;

  beforeEach(() => {
    page = new BlankAndWhitePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
