import { ASTNode, ReactElementDescription, RegexMatch, Rule, RuleScope } from '@navikt/textparser';

export const UListeRule: Rule = {
  name: 'UListe',
  scope: RuleScope.BLOCK,
  regex: /(-##)([\s\S]*?)(##-)/,
  parse(match: RegexMatch): ASTNode {
    return {
      name: this.name,
      content: [match.capture[1]]
    };
  },
  // eslint-disable-next-line
  react(node: any): ReactElementDescription {
    return {
      type: 'ul'
    };
  }
};
