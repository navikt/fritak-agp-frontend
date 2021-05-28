import { ReactElementDescription, RegexMatch, Rule, RuleScope } from '@navikt/textparser';
import { Link } from 'react-router-dom';

export const LenkeRule: Rule = {
  name: 'Lenke',
  scope: RuleScope.INLINE,
  regex: /(\[(.*)\])\((.*)\)/,
  parse(match: RegexMatch): any {
    return {
      name: this.name,
      content: [...match.capture]
    };
  },
  react(node: any): ReactElementDescription {
    const description = node.content[1];
    const href = node.content[2];

    if (href.startsWith('http')) {
      return {
        type: 'a',
        props: { href, target: '_blank', rel: 'noopener', class: 'lenke' },
        children: description
      };
    }

    return {
      type: Link,
      props: { to: description, className: 'lenke' },
      children: href
    };
  }
};
