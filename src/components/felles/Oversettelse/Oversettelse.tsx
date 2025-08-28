import { useTranslation } from 'react-i18next';
import { parse, build, AST, LinebreakRule, BoldRule, HighlightRule } from '@navikt/textparser';
import { ListeRule } from './ListeRule';
import { UListeRule } from './UListeRule';
import { LenkeRule } from './LenkeRule';
import React, { ReactNode } from 'react';

type Primitive = string | number | boolean | null | undefined;

interface OversettelseProps extends React.HTMLAttributes<HTMLSpanElement> {
  langKey: string;
  variables?: Record<string, Primitive>;
}

/*
bullets: --
ul start: -##
ul end: ##-
bold: _text_
link: [link name](link url)
 */
const Oversettelse = ({ className, langKey, variables }: OversettelseProps) => {
  const { t } = useTranslation();
  const rules = [ListeRule, UListeRule, LinebreakRule, LenkeRule, BoldRule, HighlightRule];

  const text = t(langKey, variables) as unknown as string;

  const ast: AST = parse(text, rules);

  const reactOutput: ReactNode = build(ast, rules);

  return <span className={className}>{reactOutput}</span>;
};

export default Oversettelse;
