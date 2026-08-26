declare module 'jest-axe' {
  type AxeResults = import('axe-core').AxeResults;
  type RunOptions = import('axe-core').RunOptions;
  type Spec = import('axe-core').Spec;
  type ImpactValue = import('axe-core').ImpactValue;
  type Result = import('axe-core').Result;

  export interface JestAxeConfigureOptions extends RunOptions {
    globalOptions?: Spec;
    impactLevels?: ImpactValue[];
  }

  export type JestAxe = (html: Element | string, options?: RunOptions) => Promise<AxeResults>;

  export const axe: JestAxe;
  export function configureAxe(options?: JestAxeConfigureOptions): JestAxe;

  export interface AssertionsResult {
    actual: Result[];
    message(): string;
    pass: boolean;
  }

  export const toHaveNoViolations: {
    toHaveNoViolations: (results?: Partial<AxeResults>) => AssertionsResult;
  };
}

declare module 'vitest' {
  interface Assertion<T = unknown> {
    toHaveNoViolations(): T;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}
