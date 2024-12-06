import { readFileSync, writeFileSync } from "fs";

export function processString(input: string): string[] {
  return input
    .replace(/[^a-zA-Zа-яА-Я\s-]/g, " ") // Удаляем все символы, кроме букв, пробелов и дефисов
    .replace(/\s+/g, " ") // Убираем лишние пробелы
    .trim() // Удаляем пробелы в начале и конце строки
    .split(" "); // Разделяем строку по пробелам
}

export function readTextFile(fileName: string): string {
  try {
    return readFileSync(fileName, { encoding: "utf8" });
  } catch (error) {
    console.error(`Error while reading file (${fileName}):`, error);
    return "";
  }
}

export function writeInJson(fileName: string, data: any): void {
  try {
    writeFileSync(fileName, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error while writing JSON file (${fileName}):`, error);
  }
}

export function readJsonFile(fileName: string): Array<string> {
  try {
    const data: string = readFileSync(fileName, { encoding: "utf8" });
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error while reading/parsing JSON file (${fileName}):`, error);
    return [];
  }
}
