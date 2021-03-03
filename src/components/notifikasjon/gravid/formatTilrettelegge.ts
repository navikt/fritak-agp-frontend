const formatTilrettelegge = (tilrettelegge: boolean) =>
  'Tilrettelegging av arbeidsdagen ' + (tilrettelegge ? 'er' : 'er ikke') + ' forsøkt';

export default formatTilrettelegge;
