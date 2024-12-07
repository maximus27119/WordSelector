import { readFileSync, writeFileSync } from 'fs';
import { logStyledError } from './printUtil';

export function processString(input: string): string[] {
  return input
    .replace(/[^a-zA-Zа-яА-Я\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ');
}

export function readTextFile(fileName: string): string {
  try {
    return readFileSync(fileName, { encoding: 'utf8' });
  } catch (error) {
    logStyledError(`Error while reading file (${fileName}):`);
    console.error(error);
    return '';
  }
}

export function writeInJson(fileName: string, data: any): void {
  try {
    writeFileSync(fileName, JSON.stringify(data, null, 2));
  } catch (error) {
    logStyledError(`Error while writing JSON file (${fileName}):`);
    console.error(error);
  }
}

export function readJsonFile(fileName: string): Array<string> {
  try {
    const data: string = readFileSync(fileName, { encoding: 'utf8' });
    return JSON.parse(data);
  } catch (error) {
    logStyledError(`Error while reading/parsing JSON file (${fileName}):`);
    console.error(error);
    return [];
  }
}
