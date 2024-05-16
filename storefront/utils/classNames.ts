import NPMclassNames from 'classnames';
import { twMerge } from 'tailwind-merge';

const classNames = (...args: NPMclassNames.ArgumentArray) => {
  return twMerge(NPMclassNames(...args));
};

export default classNames;
