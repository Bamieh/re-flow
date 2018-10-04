import * as vm from 'vm'
import {readFile} from 'fs'
import {promisify} from 'util'
const readFileAsync = promisify(readFile);

interface ReflowSandbox {
  names: string[],
  subflow(subflowName: string): void,
}

const sandbox:ReflowSandbox = {
  names: [],
  subflow(subflowName: string): void {
    sandbox.names.push(subflowName);
  }
}

const resetSandbox = (sandbox: ReflowSandbox) => {
  sandbox.names = [];
}

export
const getFileContent = (filepath: string) => readFileAsync(filepath, 'utf8');

export
const getAliasNamesFromFile = function(fileContent: string): string[] {
  resetSandbox(sandbox);
  vm.createContext(sandbox);
  vm.runInContext(fileContent, sandbox);
  return sandbox.names
}
