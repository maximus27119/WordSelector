import chalk from 'chalk';

const colors: Record<string, (text: string) => string> = {
  black: chalk.black,
  red: chalk.red,
  green: chalk.green,
  yellow: chalk.yellow,
  blue: chalk.blue,
  magenta: chalk.magenta,
  cyan: chalk.cyan,
  white: chalk.white,
  blackBright: chalk.blackBright,
  redBright: chalk.redBright,
  greenBright: chalk.greenBright,
  yellowBright: chalk.yellowBright,
  blueBright: chalk.blueBright,
  magentaBright: chalk.magentaBright,
  cyanBright: chalk.cyanBright,
  whiteBright: chalk.whiteBright
};

export function logStyledMessage(color: string, text: string, ...boldValues: number[] | string[]): void {
  const formattedText = text.replace(/\{(\d+)\}/g, (_, i) => chalk.bold(boldValues[i]));
  console.log(colors[color](formattedText));
}

export function logStyledError(text: string, ...boldValues: number[] | string[]): void {
  const formattedText = text.replace(/\{(\d+)\}/g, (_, i) => chalk.bold(boldValues[i]));
  console.log(colors.red(formattedText));
}
