import { parse } from 'yaml';

export function parseYamlText<T = any>(text: string): T {
  return parse(text);
}
