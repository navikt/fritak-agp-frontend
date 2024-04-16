import LangKey from '../locale/LangKey';

interface ValidationResult {
  key: LangKey;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  value?: any;
}

export default ValidationResult;
