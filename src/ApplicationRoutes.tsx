import React from 'react';
import { Route, Routes } from 'react-router-dom';
import lenker from './config/lenker';
import GravidSide from './components/gravid/GravidSide';
import GravidKvittering from './components/gravid/GravidKvittering';
import KroniskSide from './components/kronisk/KroniskSide';
import KroniskKvittering from './components/kronisk/KroniskKvittering';
import GravidKrav from './components/gravidkrav/GravidKrav';
import KroniskKrav from './components/kroniskkrav/KroniskKrav';
import KravKvittering from './components/kravkvittering/KravKvittering';
import Forside from './components/Forside';
import { GravidSoknadController } from './components/notifikasjon/gravid/soknad/GravidSoknadController';
import { GravidKravController } from './components/notifikasjon/gravid/krav/GravidKravController';
import { GravidKravSlettetController } from './components/notifikasjon/gravid/kravSlettet/GravidKravSlettetController';
import { KroniskSoknadController } from './components/notifikasjon/kronisk/soknad/KroniskSoknadController';
import { KroniskKravController } from './components/notifikasjon/kronisk/krav/KroniskKravController';
import { KroniskKravSlettetController } from './components/notifikasjon/kronisk/kravSlettet/KroniskKravSlettetController';
import GravidSoknadKvitteringProvider from './context/GravidSoknadKvitteringContext';
import KroniskSoknadKvitteringProvider from './context/KroniskSoknadKvitteringContext';
import EksempelLonningsdager from './components/eksempellonnsdager/EksempelLonningsdager';
import KroniskKvitteringSlettet from './components/kravkvitteringslettet/KravKvitteringSlettet';
import KravEndringKvittering from './components/kravendringkvittering/KravEndringKvittering';
import TokenFornyet from './components/felles/login/TokenFornyet';

export const ApplicationRoutes = () => (
  <div className='application-routes'>
    <KroniskSoknadKvitteringProvider>
      <GravidSoknadKvitteringProvider>
        <Routes>
          <Route path={lenker.Gravid} element={<GravidSide />} />
          <Route path={lenker.GravidKvittering} element={<GravidKvittering />} />
          <Route path={lenker.Kronisk} element={<KroniskSide />} />
          <Route path={lenker.KroniskKvittering} element={<KroniskKvittering />} />
          <Route path={lenker.GravidKravKvittering} element={<KravKvittering backTarget={lenker.GravidKrav} />} />
          <Route
            path={lenker.GravidKravSlettetKvittering}
            element={<KroniskKvitteringSlettet backTarget={lenker.GravidKrav} />}
          />
          <Route path={lenker.GravidKrav} element={<GravidKrav />} />
          <Route path={lenker.GravidKrav + '/:idKrav'} element={<GravidKrav />} />
          <Route path={lenker.KroniskKravKvittering} element={<KravKvittering backTarget={lenker.KroniskKrav} />} />
          <Route
            path={lenker.KroniskKravEndringKvittering}
            element={<KravEndringKvittering backTarget={lenker.KroniskKrav} />}
          />
          <Route
            path={lenker.KroniskKravSlettetKvittering}
            element={<KroniskKvitteringSlettet backTarget={lenker.KroniskKrav} />}
          />
          {/* <Route
            path={lenker.KroniskKravEndringKvittering}
            element={<KravEndringKvittering backTarget={lenker.KroniskKrav} />}
          /> */}
          <Route path={lenker.KroniskKrav} element={<KroniskKrav />} />
          <Route path={lenker.KroniskKrav + '/:idKrav'} element={<KroniskKrav />} />
          <Route path={lenker.TokenFornyet} element={<TokenFornyet />} />
          <Route path={lenker.NotifikasjonGravidSoknad} element={<GravidSoknadController />} />
          <Route path={lenker.NotifikasjonGravidKrav} element={<GravidKravController />} />
          <Route path={lenker.NotifikasjonGravidKravSlettet} element={<GravidKravSlettetController />} />
          <Route path={lenker.NotifikasjonKroniskSoknad} element={<KroniskSoknadController />} />
          <Route path={lenker.NotifikasjonKroniskKrav} element={<KroniskKravController />} />
          <Route path={lenker.NotifikasjonKroniskKravSlettet} element={<KroniskKravSlettetController />} />
          <Route path={lenker.EksemplerLonnsdager} element={<EksempelLonningsdager />} />
          <Route path={lenker.Home} element={<Forside />} />
        </Routes>
      </GravidSoknadKvitteringProvider>
    </KroniskSoknadKvitteringProvider>
  </div>
);
