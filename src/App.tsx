import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { LoginProvider } from "./context/login/LoginContext";
import { ApplicationRoutes } from "./ApplicationRoutes";
import { Organisasjon } from "@navikt/bedriftsmeny/lib/organisasjon";
import { ArbeidsgiverProvider } from "./context/arbeidsgiver/ArbeidsgiverContext";
import env from "./config/environment";
import { LoginStatus } from "./context/login/LoginStatus";
import ArbeidsgiverStatus from "./context/arbeidsgiver/ArbeidsgiverStatus";
import LocaleProvider from "./locale/LocaleProvider";

interface ApplicationProps {
  loginStatus?: LoginStatus;
  arbeidsgiverStatus?: ArbeidsgiverStatus;
  arbeidsgivere?: Array<Organisasjon>;
  basePath?: string;
  loginServiceUrl?: string;
}

export const Application = ({
  loginStatus = LoginStatus.Checking,
  arbeidsgiverStatus = ArbeidsgiverStatus.NotStarted,
  arbeidsgivere,
  basePath = env.baseUrl,
  loginServiceUrl = env.loginServiceUrl,
}: ApplicationProps) => (
  <Route path="/:language(nb|en)/*">
    <LocaleProvider>
      <LoginProvider
        baseUrl={basePath}
        status={loginStatus}
        loginServiceUrl={loginServiceUrl}
      >
        <ArbeidsgiverProvider
          baseUrl={basePath}
          status={arbeidsgiverStatus}
          arbeidsgivere={arbeidsgivere}
        >
          <ApplicationRoutes />
        </ArbeidsgiverProvider>
      </LoginProvider>
    </LocaleProvider>
  </Route>
);

const App = () => (
  <BrowserRouter basename="fritak-agp">
    <Application />
  </BrowserRouter>
);

export default App;
