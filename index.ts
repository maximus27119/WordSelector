import { startTest } from "./utils/testModule";
import { processString, readJsonFile, readTextFile, writeInJson } from "./utils/fileModule";
import { removeArrayDuplicates, substractArrays } from "./utils/arrayModule";

async function main(): Promise<any> {
  const inputFileName: string = "./input.txt";
  const outputSavedFileName: string = "./output/saved.json";
  const outputSkippedFileName: string = "./output/skipped.json";

  const inputFile: string = readTextFile(inputFileName);
  const processedInput: string[] = processString(inputFile);
  let wordsList: string[] = removeArrayDuplicates(processedInput);

  const previouslySkippedWords = readJsonFile(outputSkippedFileName);
  const previouslySavedWords = readJsonFile(outputSavedFileName);

  wordsList = substractArrays(wordsList, [...previouslySkippedWords, ...previouslySavedWords]);

  try {
    console.log("Welcome to test!");
    const { savedWords, skippedWords } = await startTest(wordsList);

    writeInJson(outputSavedFileName, [...previouslySavedWords, ...savedWords]);
    console.log(`File ${outputSavedFileName} has been written.`);

    writeInJson(outputSkippedFileName, [...previouslySkippedWords, ...skippedWords]);
    console.log(`File ${outputSkippedFileName} has been written.`);
  } catch (error) {
    console.log("Error: ", error);
  }
}

main();
