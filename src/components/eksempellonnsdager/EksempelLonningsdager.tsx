import React, { useEffect } from 'react';
import './EksempelLonningsdager.scss';
import eksempel1 from '../../static/eksempel1.png';
import eksempel2 from '../../static/eksempel2.png';
import eksempel3 from '../../static/eksempel3.png';
import eksempel4 from '../../static/eksempel4.png';
import eksempel5 from '../../static/eksempel5.png';
import eksempel6 from '../../static/eksempel6.png';
import { Accordion, BodyLong } from '@navikt/ds-react';
import Side from '../felles/Side/Side';
const EksempelLonningsdager = () => {
  useEffect(() => {
    document.title = 'Eksempler på hvordan du kan fylle ut dager det betales lønn - nav.no';
  }, []);

  return (
    <Side
      bedriftsmeny={false}
      className='eksempel-lonningsdager'
      sidetittel='Eksempler på skjemautfylling'
      title='Søknad om at NAV dekker sykepenger i arbeidsgiverperioden - nav.no'
      subtitle='Eksempler på hvordan du kan fylle ut kravet'
    >
      <Accordion>
        <Accordion.Item>
          <Accordion.Header>Turnus/rotasjon f.eks offshore med lønn 365 dager i året</Accordion.Header>

          <Accordion.Content>
            <BodyLong>
              <ul className='ekspander-liste'>
                <li>Beregnet månedslønn, for eksempel kr 50 000.</li>
                <li>Oppgi 365 dager med lønn.</li>
                <li>Krev refusjon for alle dagene i arbeidsgiverperioden inkludert lørdag og søndag.</li>
              </ul>
            </BodyLong>
            <img src={eksempel1} alt='Utfyllt eksempelskjema for turnus/rotasjon' className='ekspander-bilde' />
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>20% fast stilling pluss ekstravakter. Har jobbet totalt 80%</Accordion.Header>
          <Accordion.Content>
            <BodyLong>
              <ul className='ekspander-liste'>
                <li>Beregnet månedslønn, for eksempel kr 40 000.</li>
                <li>Oppgi 208 dager med lønn (tilsvarer 80% stilling).</li>
                <li>Krev refusjon for de dagene den ansatte skulle jobbet i arbeidsgiverperioden.</li>
              </ul>
            </BodyLong>
            <img
              src={eksempel2}
              alt='Utfyllt eksempelskjema for 20% fast stilling pluss ekstravakter. Har jobbet totalt 80%'
              className='ekspander-bilde'
            />
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item>
          <Accordion.Header>
            Tilkallingsvikar, jobbet 40% siste 3 måneder. Planlagt fulltid 3 uker fram i tid
          </Accordion.Header>
          <Accordion.Content>
            <BodyLong>
              <ul className='ekspander-liste'>
                <li>Beregnet månedslønn, for eksempel kr 20 000.</li>
                <li>Det er planlagt vakter mandag-fredag 3 uker fram i tid fra første fraværsdag.</li>
                <li>Oppgi 104 dager med lønn (tilsvarer 40% stilling).</li>
                <li>Krev refusjon for dagene mandag-fredag i hele arbeidsgiverperioden.</li>
              </ul>
            </BodyLong>
            <img
              src={eksempel3}
              alt='Utfyllt eksempelskjema for tilkallingsvikar, jobbet 40% siste 3 måneder. Planlagt fulltid 3 uker fram i tid'
              className='ekspander-bilde'
            />
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>Tilkallingsvikar, jobbet 40% siste 3 måneder. Ingen planlagte vakter</Accordion.Header>
          <Accordion.Content>
            <BodyLong>
              <ul className='ekspander-liste'>
                <li>Beregnet månedslønn, for eksempel kr 20 000.</li>
                <li>Ingen planlagte vakter i arbeidsgiverperioden.</li>
                <li>Oppholdet mellom vaktene som har vært, er ikke lengre enn 14 dager.</li>
                <li>Oppgi 104 dager med lønn (tilsvarer 40% stilling).</li>
                <li>Krev refusjon for antall dager som tilsvarer 40% stilling i arbeidsgiverperioden.</li>
              </ul>
            </BodyLong>
            <img
              src={eksempel4}
              alt='Utfyllt eksempelskjema for tilkallingsvikar, jobbet 40% siste 3 måneder. Ingen planlagte vakter'
              className='ekspander-bilde'
            />
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>50% stilling, jobber to hele og én halv dag i uken</Accordion.Header>
          <Accordion.Content>
            <BodyLong>
              <ul className='ekspander-liste'>
                <li>Beregnet månedslønn, for eksempel kr 25 000.</li>
                <li>Oppgi 130 dager med lønn.</li>
                <li>Krev refusjon for de dagene den ansatte skulle jobbet i arbeidsgiverperioden.</li>
              </ul>
            </BodyLong>
            <img
              src={eksempel5}
              alt='Utfyllt eksempelskjema for 50% stilling, jobber to hele og én halv dag i uken'
              className='ekspander-bilde'
            />
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>50% stilling, jobber 50% hver dag mandag-fredag</Accordion.Header>
          <Accordion.Content>
            <BodyLong>
              <ul className='ekspander-liste'>
                <li>Beregnet månedslønn, for eksempel kr 25 000.</li>
                <li>Oppgi 260 dager med lønn.</li>
                <li>Krev refusjon for dagene mandag-fredag hele arbeidsgiverperioden.</li>
              </ul>
            </BodyLong>
            <img
              src={eksempel6}
              alt='Utfyllt eksempelskjema for 50% stilling, jobber 50% hver dag mandag-fredag'
              className='ekspander-bilde'
            />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Side>
  );
};

export default EksempelLonningsdager;
