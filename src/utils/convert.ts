import { EOL } from 'node:os';
import { OpenAPIV3 } from 'openapi-types';

export function convertOpenApi3_0(spec: OpenAPIV3.Document): string {
  let schema = '# generated by muratyaman/virgul' + EOL + EOL;

  const { query, mutation, types } = processOperations(spec);

  schema += `"""` + EOL;
  schema += `${spec.info.title} ${spec.info.version}` + EOL;
  schema += `${spec.info.description}` + EOL;
  schema += `"""` + EOL + EOL;

  schema += '# QUERY' + EOL + EOL;
  schema += 'type Query {' + EOL;
  schema += query.join('') + EOL + EOL;
  schema += '}' + EOL + EOL;

  schema += '# MUTATION' + EOL + EOL;
  schema += 'type Mutation {' + EOL;
  schema += mutation.join('') + EOL;
  schema += '}' + EOL + EOL;

  schema += '# TYPES' + EOL + EOL;
  schema += types.join('') + EOL + EOL;

  return schema;
}

function processOperations(spec: OpenAPIV3.Document) {
  const query: string[] = [], mutation: string[] = [], types: string[] = [];

  Object.getOwnPropertyNames(spec.paths).forEach(pathPattern => {
    const pathObj = spec.paths[pathPattern];

    if (pathObj?.get) {
      const { operationId, summary, description, responses } = pathObj.get;
      const responseOk = responses['200'];
      if (responseOk) {
        query.push(`  """` + EOL);
        query.push(`  GET ${pathPattern}` + EOL);
        if (summary) query.push(`  ${summary}` + EOL);
        if (description) query.push(`  ${description}` + EOL);
        query.push(`  """` + EOL);
        //if (responseOk.content && responseOk.content['application/json']) {
        //  const { $ref, schema } = responseOk.content['application/json'];
        //}
        query.push(`  ${operationId}(data: Input_${operationId}): Output_${operationId}` + EOL);
      }
    }

    if (pathObj?.post) {
      const { operationId, summary, description, responses } = pathObj.post;
      const responseOk = responses['200'] || responses['201'];
      if (responseOk) {
        mutation.push(`  """` + EOL);
        mutation.push(`  POST ${pathPattern}` + EOL);
        if (summary) mutation.push(`  ${summary}` + EOL);
        if (description) mutation.push(`  ${description}` + EOL);
        mutation.push(`  """` + EOL);
        //if (responseOk.content && responseOk.content['application/json']) {
        //  const { $ref, schema } = responseOk.content['application/json'];
        //}
        mutation.push(`  ${operationId}(data: Input_${operationId}): Output_${operationId}` + EOL);
      }
    }

    if (pathObj?.delete) {
      const { operationId, summary, description, responses } = pathObj.delete;
      const responseOk = responses['200'] || responses['201'];
      if (responseOk) {
        mutation.push(`  """` + EOL);
        mutation.push(`  DELETE ${pathPattern}` + EOL);
        if (summary) mutation.push(`  ${summary}` + EOL);
        if (description) mutation.push(`  ${description}` + EOL);
        mutation.push(`  """` + EOL);
        //if (responseOk.content && responseOk.content['application/json']) {
        //  const { $ref, schema } = responseOk.content['application/json'];
        //}
        mutation.push(`  ${operationId}(data: Input_${operationId}): Output_${operationId}` + EOL);
      }
    }
  });

  return { query, mutation, types };
}
