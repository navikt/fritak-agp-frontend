export const MIN_ARBEIDSDAGER = 1;
export const MAX_ARBEIDSDAGER = 366;

export const MIN_FRAVAERSPERIODER = 1;
export const MAX_FRAVAERSPERIODER = 330;

/****
 * Krav om refusjon av AGP (§ 8-20) kan kun innfris for opptil tre måneder før den måneden da kravet ble satt.
 * Man teller da ikke fra dato-til-dato, men fra måned-til-måned.
 *
 * For krav fremsatt i mai 2021 innebærer dette at man kan innfri refusjon for sykefravær fra og med 01.02.21.
 *
 * Midlertidig satt veldig langt tilbake i tid for å kunne ta høyde for krav som er sendt inn etter endringer av
 * beregnet månedslønn
 */
export const MIN_GRAVID_DATO = new Date(1990, 0, 1);
export const MIN_KRONISK_DATO = new Date(1990, 0, 1);
