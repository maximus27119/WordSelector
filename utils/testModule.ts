import select from "@inquirer/select";
import chalk from "chalk";

type Words = string[];

type Question = {
  message: string;
  choices: {
    name: string;
    value: string;
  }[];
};

type SessionHistoryItem = {
  word: string;
  action: string;
};

type SessionHistory = SessionHistoryItem[];

type TestResult = {
  savedWords: string[];
  skippedWords: string[];
};

const questionOptions = {
  clearPromptOnDone: true
};

export async function startTest(words: string[]): Promise<TestResult> {
  const wordsToTest: Words = [...words];
  const currentSessionHistory: SessionHistory = [];

  const savedWords: Words = [];
  const skippedWords: Words = [];

  try {
    for (let i = 0; i < wordsToTest.length; i++) {
      const currentWord = wordsToTest[i];
      const answer = await askNextWord(currentWord);

      if (answer === "learn" || answer === "skip") {
        currentSessionHistory.push({ word: currentWord, action: answer });
      } else if (answer === "back") {
        currentSessionHistory.pop();
        i = i - 2;
      } else if (answer === "exit") {
        break;
      }
    }
  } catch (error) {
    console.error("An error has occurred:", error);
  }

  currentSessionHistory.forEach((historyItem) => {
    if (historyItem.action === "learn") {
      savedWords.push(historyItem.word);
    } else if (historyItem.action === "skip") {
      skippedWords.push(historyItem.word);
    }
  });
  return { savedWords, skippedWords };
}

async function askNextWord(word: string): Promise<string> {
  return await select(prepareQuestion(word), questionOptions);
}

function prepareQuestion(word: string): Question {
  const styledWord = chalk.bold.red(word);

  return {
    message: styledWord,
    choices: [
      { name: "Skip", value: "skip" },
      { name: "Learn", value: "learn" },
      // { name: "Back", value: "back" },
      { name: "Exit", value: "exit" }
    ]
  };
}
