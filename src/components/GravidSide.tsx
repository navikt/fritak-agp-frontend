import React, { useState } from 'react';
import { Column, Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import { Feilmelding, Ingress, Normaltekst } from 'nav-frontend-typografi';
import { BekreftCheckboksPanel, FnrInput, Radio, RadioGruppe, SkjemaGruppe, Textarea } from 'nav-frontend-skjema';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import Skillelinje from './Skillelinje';
import SoknadTittel from './SoknadTittel';
import SideIndentering from './SideIndentering';
import Lenke from 'nav-frontend-lenker';
import DatoVelger from './DatoVelger';
import Fnr from "./Fnr";
import validator from '@navikt/fnrvalidator';

interface GravidSideProps {
  fnr?: string
  dato?: Date
  tilrettelegge?: boolean
  bekreftet?: boolean
  tiltak?: string
  validated?: boolean
}

const GravidSide = (props: GravidSideProps) => {
  const [validated, setValidated] = useState<boolean>(props.validated || false);

  const [dato, setDato] = useState<Date|undefined>(props.dato || undefined);
  const [datoFeilmelding, setDatoFeilmelding] = useState<string>('');

  const [fnr, setFnr] = useState<string|undefined>(props.fnr);
  const [fnrValid, setFnrValid] = useState<boolean>(fnr ? validator.fnr(fnr).status == "valid" : false);
  const [fnrFeilmelding, setFnrFeilmelding] = useState<string>(validated && fnrValid ? '' : 'Ugyldig fødselsnummer' );

  const [tilrettelegge, setTilrettelegge] = useState<boolean|undefined>(props.tilrettelegge);
  const [bekreftet, setBekreftet] = useState<boolean>(props.bekreftet || false);
  const [tiltak, setTiltak] = useState<string>(props.tiltak || '');

  return (
    <Row>
      <Column>
        <SoknadTittel>Søknad om utvidet støtte for gravid ansatts sykefravære</SoknadTittel>

        <SideIndentering>

          <Panel>
            <Ingress>
              Søknad om unntak fra arbeidsgiveransvar for sykepenger til en gravid arbeidstakers fravære fra jobb. Vi
              krever sykemelding eller legeerklæring som bekrefter at fraværet skyldes svangerskapsrelatert sykdom.
            </Ingress>
          </Panel>

          <Skillelinje/>

          <Panel>
            <SkjemaGruppe legend="Informasjon om den ansatte">
              <Row>
                <Column sm="4" xs="6">
                  <Fnr label="Fødselsnummer" nr={fnr} placeholder="11 siffer"
                       feilmelding={fnrFeilmelding} onValidate={setFnrValid} onChange={setFnr}/>
                </Column>
                <Column sm="4" xs="6">
                  <DatoVelger label="Termindato" dato={dato} placeholder="dd.mm.åååå"
                              feilmelding={datoFeilmelding} onChange={setDato}/>
                </Column>
              </Row>
            </SkjemaGruppe>
          </Panel>

          <Skillelinje/>

          <Panel>
            <SkjemaGruppe legend="Arbeidssituasjon og miljø"
                          description="Vi ønsker så godt innblikk i hvordan dere eventuelt har forsøkt å løse situasjonen
                        selv. Dette både for å vurdere søknaden, men også for å kunne bistå dere for at den ansatte om
                        mulig skal kunne stå i jobben sin.">
              <RadioGruppe
                legend="Har dere forsøkt å tilrettelegge arbeidsdagen slik at den ansatte kan utføre arbeidet sitt til
              tross for helsetilstanden hennes?">
                <Radio label={'Ja'} name="sitteplass" defaultChecked={tilrettelegge === true}/>
                <Radio label={'Nei'} name="sitteplass" defaultChecked={tilrettelegge === false}/>
              </RadioGruppe>
            </SkjemaGruppe>
          </Panel>

          <div>
            <Skillelinje/>

            <Panel>
              <Feilmelding>*Forsøksvis tilrettelegging er i utgangspunktet påkrevd for at vi skal godkjenne
                søknaden*</Feilmelding>
              <br />
              <Normaltekst>Dere kan <Lenke onClick={() => {}} href="#">gå videre med søknaden</Lenke>, men det er altså da sannsynlig at
                den blir
                avslått.</Normaltekst>
            </Panel>

            <Skillelinje/>
          </div>


          <Panel>
            <SkjemaGruppe>
              <RadioGruppe
                legend="Hvilke tiltak er forsøkt/vurdert for at arbeidstaker skal kunne være i arbeid i svangerskapet?">
                <Radio label={'Fleksibel/tilpasset arbeidstid'} name="tiltak" value="arbeidstid"
                       defaultChecked={tiltak === 'arbeidstid'}/>
                <Radio label={'Hjemmekontor'} name="tiltak" value="hjemmekontor"
                       defaultChecked={tiltak === 'hjemmekontor'}/>
                <Radio label={'Tilpassede arbeidsoppgaver'} name="tiltak" value="oppgaver"
                       defaultChecked={tiltak === 'oppgaver'}/>
                <Radio label={'Annet, vennligst spesifiser kortfattet i feltet under'} name="tiltak" value="arbeidstid"
                       defaultChecked={tiltak === 'annet'}/>
                <Textarea value={''} onChange={() => {}}></Textarea>
              </RadioGruppe>

              <RadioGruppe legend="Er omplassering av den ansatte forsøkt?">
                <Radio label={'Ja'} name="sitteplass"/>
                <Radio label={'Nei'} name="sitteplass"/>
                <Radio label={'Omplassering er ikke gjennomført'} name="sitteplass"/>
              </RadioGruppe>
            </SkjemaGruppe>
          </Panel>

          <Skillelinje/>

          <Panel>
            <SkjemaGruppe legend="Dokumentasjon om svagerskapsrelatert sykdomsfravære"
                          description="Det må dokumenteres av lege at fraværet er relatert til svangerskapsrelatert
                        sykdom. Dere kan laste opp denne om dere har den. Alternativt vil NAV innhente dokumentasjon
                        direkte fra lege.">
              <Knapp>Last opp legedokumentasjon</Knapp>
            </SkjemaGruppe>
          </Panel>

          <Skillelinje/>

          <Panel>
            <BekreftCheckboksPanel
              label="Jeg bekrefter at opplysningene jeg har gitt er riktige."
              checked={bekreftet}
              onChange={() => {
              }}
            >
              Jeg er kjent med at hvis opplysningene jeg har gitt ikke er riktige eller fullstendige, så kan jeg miste
              retten til stønad.
            </BekreftCheckboksPanel>
          </Panel>

          <Panel>
            <Hovedknapp>Send søknad</Hovedknapp>
          </Panel>

        </SideIndentering>

      </Column>
    </Row>
  );
};

export default GravidSide;
