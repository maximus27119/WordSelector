import { startTest } from './utils/testModule';
import { processString, readJsonFile, readTextFile, writeInJson } from './utils/fileModule';
import { removeArrayDuplicates, subtractArrays } from './utils/arrayModule';
import { logStyledError, logStyledMessage } from './utils/printUtil';

async function main(): Promise<any> {
  const inputFileName: string = './input.txt';
  const outputSavedFileName: string = './output/saved.json';
  const outputSkippedFileName: string = './output/skipped.json';

  const inputFile: string = readTextFile(inputFileName);
  const processedInput: string[] = processString(inputFile);
  let wordsList: string[] = removeArrayDuplicates(processedInput);

  const previouslySkippedWords: string[] = readJsonFile(outputSkippedFileName);
  const previouslySavedWords: string[] = readJsonFile(outputSavedFileName);

  wordsList = subtractArrays(wordsList, [...previouslySkippedWords, ...previouslySavedWords]);

  try {
    logStyledMessage('red', 'Welcome to test!');
    const { savedWords, skippedWords } = await startTest(wordsList);

    const savedWordsAmount = savedWords.length;
    const skippedWordsAmount = skippedWords.length;
    const totalSavedWordsAmount = previouslySavedWords.length + savedWordsAmount;
    const totalSkippedWordsAmount = previouslySkippedWords.length + skippedWordsAmount;

    if (savedWordsAmount > 0) {
      writeInJson(outputSavedFileName, [...previouslySavedWords, ...savedWords]);
      logStyledMessage('green', 'File {0} has been written.', outputSavedFileName);
    }

    if (skippedWordsAmount > 0) {
      writeInJson(outputSkippedFileName, [...previouslySkippedWords, ...skippedWords]);
      logStyledMessage('green', 'File {0} has been written.', outputSkippedFileName);
    }

    logStyledMessage('blue', '{0} new saved words. ({1} total)', savedWordsAmount, totalSavedWordsAmount);
    logStyledMessage('yellow', '{0} new skipped words. ({1} total)', skippedWordsAmount, totalSkippedWordsAmount);
  } catch (error) {
    logStyledError('Error:');
    console.error(error);
  }
}

main();
