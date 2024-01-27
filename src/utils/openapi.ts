import OpenAPIParser from '@readme/openapi-parser';
import { OpenAPI, OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';

type OpenApiDoc = OpenAPI.Document | OpenAPIV2.Document | OpenAPIV3.Document | OpenAPIV3_1.Document;

export function isDocOpenAPIV3_0Doc(doc: OpenApiDoc | any): doc is OpenAPIV3.Document {
  return doc && doc.openapi && doc.openapi.startsWith('3.0');
}

export function isDocOpenAPIV3_1Doc(doc: OpenApiDoc | any): doc is OpenAPIV3_1.Document {
  return doc && doc.openapi && doc.openapi.startsWith('3.1');
}

export async function parseOpenApiSpec(obj: any): Promise<OpenApiDoc> {
  let api = await OpenAPIParser.validate(obj); // this can throw error
  return api;
}
