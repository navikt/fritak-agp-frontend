import LangKey from "../../../locale/LangKey";
import { useTranslation } from "react-i18next";
import Tekstomrade, {
  BoldRule,
  HighlightRule,
  LinebreakRule,
} from "nav-frontend-tekstomrade";
import { ListeRule } from "./Liste";
import { UListeRule } from "./UListe";
import { LenkeRule } from "./Lenke";
import React from "react";

interface OversettelseProps {
  langKey: LangKey;
  variables?: any;
}

/*
bullets: --
ul start: -##
ul end: ##-
bold: _text_
link: [link name](link url)
 */
const Oversettelse = ({ langKey, variables }: OversettelseProps) => {
  const { t } = useTranslation();
  return (
    <Tekstomrade
      as="span"
      rules={[
        ListeRule,
        UListeRule,
        HighlightRule,
        BoldRule,
        LenkeRule,
        LinebreakRule,
      ]}
    >
      {t(langKey, variables)}
    </Tekstomrade>
  );
};

export default Oversettelse;
