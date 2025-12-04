import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import lenker from './config/lenker';
import GravidSoknadKvitteringProvider from './context/GravidSoknadKvitteringContext';
import KroniskSoknadKvitteringProvider from './context/KroniskSoknadKvitteringContext';
import { Loader } from '@navikt/ds-react';

// Lazy load all page components
const Forside = lazy(() => import('./components/Forside'));
const GravidSide = lazy(() => import('./components/gravid/GravidSide'));
const GravidKvittering = lazy(() => import('./components/gravid/GravidKvittering'));
const KroniskSide = lazy(() => import('./components/kronisk/KroniskSide'));
const KroniskKvittering = lazy(() => import('./components/kronisk/KroniskKvittering'));
const GravidKrav = lazy(() => import('./components/gravidkrav/GravidKrav'));
const KroniskKrav = lazy(() => import('./components/kroniskkrav/KroniskKrav'));
const KravKvittering = lazy(() => import('./components/kravkvittering/KravKvittering'));
const EksempelLonningsdager = lazy(() => import('./components/eksempellonnsdager/EksempelLonningsdager'));
const KroniskKvitteringSlettet = lazy(() => import('./components/kravkvitteringslettet/KravKvitteringSlettet'));
const KravEndringKvittering = lazy(() => import('./components/kravendringkvittering/KravEndringKvittering'));
const TokenFornyet = lazy(() => import('./components/felles/login/TokenFornyet'));

// Notifikasjon controllers
const GravidSoknadController = lazy(() =>
  import('./components/notifikasjon/gravid/soknad/GravidSoknadController').then((m) => ({
    default: m.GravidSoknadController
  }))
);
const GravidKravController = lazy(() =>
  import('./components/notifikasjon/gravid/krav/GravidKravController').then((m) => ({
    default: m.GravidKravController
  }))
);
const GravidKravSlettetController = lazy(() =>
  import('./components/notifikasjon/gravid/kravSlettet/GravidKravSlettetController').then((m) => ({
    default: m.GravidKravSlettetController
  }))
);
const KroniskSoknadController = lazy(() =>
  import('./components/notifikasjon/kronisk/soknad/KroniskSoknadController').then((m) => ({
    default: m.KroniskSoknadController
  }))
);
const KroniskKravController = lazy(() =>
  import('./components/notifikasjon/kronisk/krav/KroniskKravController').then((m) => ({
    default: m.KroniskKravController
  }))
);
const KroniskKravSlettetController = lazy(() =>
  import('./components/notifikasjon/kronisk/kravSlettet/KroniskKravSlettetController').then((m) => ({
    default: m.KroniskKravSlettetController
  }))
);

const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
    <Loader size='xlarge' title='Laster...' />
  </div>
);

export const ApplicationRoutes = () => (
  <div className='application-routes'>
    <KroniskSoknadKvitteringProvider>
      <GravidSoknadKvitteringProvider>
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </GravidSoknadKvitteringProvider>
    </KroniskSoknadKvitteringProvider>
  </div>
);
