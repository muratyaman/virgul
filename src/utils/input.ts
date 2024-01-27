import { Input } from '../types';
import { readFileSync } from 'node:fs';

export async function readInputText(file: string): Promise<Input> {
  const text = readFileSync(file, 'utf8');

  return { text };
}
