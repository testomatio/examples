import Page from '../pages/page';

describe('Basic tests', function () {
  const page = new Page();

  it('Should open the page in browser', () => {
    page.open('home');
  });

  it('Should able open the home page and see test', () => {
    page.open('home');

    const pageText = $('body').getText();
    const position = pageText.search('UI Test Automation');
    chai.expect(position).to.be.above(0);
  })
});
