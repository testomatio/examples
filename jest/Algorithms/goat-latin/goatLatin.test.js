import convertToGoatLatin from './goatLatin';

describe('Goat Latin @S34fab9ff', () => {
  test('It should return Goat Latin value @Teaa2a436', () => {
    expect(convertToGoatLatin('I speak Goat Latin')).toBe('Imaa peaksmaaa oatGmaaaa atinLmaaaaa');
    expect(convertToGoatLatin('The quick brown fox jumped over the lazy dog')).toBe('heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa');
  });
});
