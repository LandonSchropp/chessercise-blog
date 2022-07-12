// Monkey patch Jest so that tests written without a function implementation are marked as `todo`.
const globalIt = global.it as jest.It;

type FunctionParameter = (() => void | undefined) | (() => Promise<unknown>);

const wrappedIt = (description: string, func?: FunctionParameter) => {
  if (!func) {
    return globalIt.todo(description);
  }

  return globalIt(description, func);
};

Object.assign(wrappedIt, it);

global.it = wrappedIt as jest.It;
