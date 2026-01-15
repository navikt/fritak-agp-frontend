import { Link as NLink } from '@navikt/ds-react';
import { ASTNode, ReactElementDescription, RegexMatch, Rule, RuleScope } from '@navikt/textparser';
import { Link } from 'react-router-dom';

type LenkeNode = ASTNode & {
  content: string[];
};

export const LenkeRule: Rule = {
  name: 'Lenke',
  scope: RuleScope.INLINE,
  regex: /(\[(.*)\])\((.*)\)/,
  parse(match: RegexMatch): ASTNode {
    return {
      name: this.name,
      content: [...match.capture]
    };
  },
  react(node: ASTNode): ReactElementDescription {
    const lenkeNode = node as LenkeNode;
    const description = lenkeNode.content[1];
    const href = lenkeNode.content[2];

    if (href.startsWith('http')) {
      return {
        type: NLink,
        props: { href, target: '_blank', rel: 'noopener', className: 'lenke' },
        children: [description]
      };
    }

    return {
      type: Link,
      props: { to: href, className: 'lenke' },
      children: [description]
    };
  }
};
