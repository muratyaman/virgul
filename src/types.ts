import { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';

export interface Input {
  text: string;
  spec3_0?: OpenAPIV3.Document;
  spec3_1?: OpenAPIV3_1.Document;
}

export interface Output {
  text: string;
}
