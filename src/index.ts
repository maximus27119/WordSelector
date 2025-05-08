import { startTest } from './modules/test.module';
import { processString, readJsonFile, readTextFile, writeInJson } from './modules/file.module';
import { removeArrayDuplicates, subtractArrays } from './utils/array.util';
import { logStyledError, logStyledMessage } from './utils/print.util';
import config from 'config';

const INPUT_FILE_NAME: string = config.get('inputFileName');
const OUTPUT_SAVED_FILE_NAME: string = config.get('outputSavedFileName');
const OUTPUT_SKIPPED_FILE_NAME: string = config.get('outputSkippedFileName');

async function main(): Promise<void> {
  try {
    const inputFile: string = readTextFile(INPUT_FILE_NAME);
    const processedInput: string[] = processString(inputFile);
    let wordsList: string[] = removeArrayDuplicates(processedInput);

    const previouslySkippedWords: string[] = readJsonFile(OUTPUT_SKIPPED_FILE_NAME);
    const previouslySavedWords: string[] = readJsonFile(OUTPUT_SAVED_FILE_NAME);

    let inputWordsAmount = wordsList.length;

    wordsList = subtractArrays(wordsList, [...previouslySkippedWords, ...previouslySavedWords]);

    let skippedInputWordsAmount = inputWordsAmount - wordsList.length;

    logStyledMessage('red', 'Welcome!');
    const { savedWords, skippedWords } = await startTest(wordsList);

    const savedWordsAmount = savedWords.length;
    const skippedWordsAmount = skippedWords.length;
    const totalSavedWordsAmount = previouslySavedWords.length + savedWordsAmount;
    const totalSkippedWordsAmount = previouslySkippedWords.length + skippedWordsAmount;

    if (savedWordsAmount > 0) {
      writeInJson(OUTPUT_SAVED_FILE_NAME, [...previouslySavedWords, ...savedWords]);
      logStyledMessage('green', 'File {0} has been written.', OUTPUT_SAVED_FILE_NAME);
    }

    if (skippedWordsAmount > 0) {
      writeInJson(OUTPUT_SKIPPED_FILE_NAME, [...previouslySkippedWords, ...skippedWords]);
      logStyledMessage('green', 'File {0} has been written.', OUTPUT_SKIPPED_FILE_NAME);
    }

    logStyledMessage('blue', '{0} new saved words. ({1} total)', savedWordsAmount, totalSavedWordsAmount);
    logStyledMessage('yellow', '{0} new skipped words. ({1} total)', skippedWordsAmount, totalSkippedWordsAmount);
    logStyledMessage('magenta', '{0} words were skipped in the current input.', skippedInputWordsAmount);
  } catch (error) {
    logStyledError('Error:');
    console.error(error);
    // console.log(error.message);
  }
}

main();
