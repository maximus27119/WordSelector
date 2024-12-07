import select from '@inquirer/select';
import chalk from 'chalk';
import { logStyledError } from './printUtil';

type Words = string[];

type TestChoice = {
  name: string;
  value: string;
};

type TestChoices = TestChoice[];

type Question = {
  message: string;
  choices: TestChoices;
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

const testChoices: string[] = ['Skip', 'Learn', 'Back', 'Exit'];

const questionOptions = {
  clearPromptOnDone: true
};

export async function startTest(words: string[]): Promise<TestResult> {
  const wordsToTest: Words = [...words];
  const currentSessionHistory: SessionHistory = [];

  const savedWords: Words = [];
  const skippedWords: Words = [];

  try {
    for (let i = 0; i < wordsToTest.length; ) {
      const currentWord = wordsToTest[i];
      const answer = await askNextWord(currentWord, i + 1);

      if (answer === 'learn' || answer === 'skip') {
        currentSessionHistory.push({ word: currentWord, action: answer });
        i++;
      } else if (answer === 'back' && i > 0) {
        currentSessionHistory.pop();
        i--;
      } else if (answer === 'exit') {
        break;
      }
    }
  } catch (error) {
    logStyledError('An error has occurred:');
    console.error(error);
  }

  currentSessionHistory.forEach((historyItem: SessionHistoryItem) => {
    if (historyItem.action === 'learn') {
      savedWords.push(historyItem.word);
    } else if (historyItem.action === 'skip') {
      skippedWords.push(historyItem.word);
    }
  });
  return { savedWords, skippedWords };
}

async function askNextWord(word: string, wordNumber?: number): Promise<string> {
  return select(prepareQuestion(word, wordNumber), questionOptions);
}

function prepareQuestion(message: string, wordNumber?: number): Question {
  const styledMessage = `${chalk.bold.red('№' + wordNumber)} ${chalk.bold.red(message)}`;

  return {
    message: styledMessage,
    choices: prepareTestChoices(testChoices)
  };
}

function prepareTestChoices(choices: string[]): TestChoices {
  return choices.map((choice): TestChoice => {
    return {
      name: choice,
      value: choice.toLowerCase()
    };
  });
}
