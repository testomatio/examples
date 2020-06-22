import convertToGoatLatin from './goatLatin';

describe('Goat Latin', () => {
  test('It should return Goat Latin value', () => {
    expect(convertToGoatLatin('I speak Goat Latin')).toBe('Imaa peaksmaaa oatGmaaaa atinLmaaaaa');
    expect(convertToGoatLatin('The quick brown fox jumped over the lazy dog')).toBe('heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa');
  });
});
