import { ASTNode, ReactElementDescription, RegexMatch, Rule, RuleScope } from '@navikt/textparser';
import { v4 as uuid } from 'uuid';

export const ListeRule: Rule = {
  name: 'Liste',
  scope: RuleScope.INLINE,
  regex: /(--|\t--|\s+--)([\s\S]*?)(\n|$)/,
  parse(match: RegexMatch): ASTNode {
    return {
      name: this.name,
      content: [match.capture[1]]
    };
  },
  // eslint-disable-next-line
  react(node: ASTNode): ReactElementDescription {
    return {
      type: 'li',
      props: {
        key: uuid()
      }
    };
  }
};
