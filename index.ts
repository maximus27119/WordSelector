import { startTest } from "./utils/testModule";
import { processString, readJsonFile, readTextFile, writeInJson } from "./utils/fileModule";
import { removeArrayDuplicates, substractArrays } from "./utils/arrayModule";
import chalk from "chalk";
import { logMessage } from "./utils/printUtil";

async function main(): Promise<any> {
  const inputFileName: string = "./input.txt";
  const outputSavedFileName: string = "./output/saved.json";
  const outputSkippedFileName: string = "./output/skipped.json";

  const inputFile: string = readTextFile(inputFileName);
  const processedInput: string[] = processString(inputFile);
  let wordsList: string[] = removeArrayDuplicates(processedInput);

  const previouslySkippedWords: string[] = readJsonFile(outputSkippedFileName);
  const previouslySavedWords: string[] = readJsonFile(outputSavedFileName);

  wordsList = substractArrays(wordsList, [...previouslySkippedWords, ...previouslySavedWords]);

  try {
    console.log("Welcome to test!");
    const { savedWords, skippedWords } = await startTest(wordsList);

    const savedWordsAmount = savedWords.length;
    const skippedWordsAmount = skippedWords.length;
    const totalSavedWordsAmount = previouslySavedWords.length + savedWordsAmount;
    const totalSkippedWordsAmount = previouslySkippedWords.length + skippedWordsAmount;

    writeInJson(outputSavedFileName, [...previouslySavedWords, ...savedWords]);
    logMessage('green', 'File {0} has been written.', outputSavedFileName);

    writeInJson(outputSkippedFileName, [...previouslySkippedWords, ...skippedWords]);
    logMessage('green', 'File {0} has been written.', outputSkippedFileName);

    logMessage('blue', '{0} new saved words. ({1} total)', savedWordsAmount, totalSavedWordsAmount);
    logMessage('yellow', '{0} new skipped words. ({1} total)', skippedWordsAmount, totalSkippedWordsAmount);
  } catch (error) {
    console.log("Error: ", error);
  }
}

main();
