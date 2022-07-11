import { helper } from '@ember/component/helper';

export function mod(params: any /*, hash*/) {
  const [num1, num2] = params;
  return num1 % num2;
}

export default helper(mod);
