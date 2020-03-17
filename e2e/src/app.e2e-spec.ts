import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
  describe('default screen', () => {
    beforeEach(() => {
      page.navigateTo('/Game');
    });
    it('should say Game', () => {
      expect(page.getParagraphText()).toContain('Game');
    });
  });
});
