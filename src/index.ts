import { writeFileSync } from 'fs';
import { convertOpenApi3_0 } from './utils/convert';
import { readInputText } from './utils/input';
import { isDocOpenAPIV3_0Doc, isDocOpenAPIV3_1Doc, parseOpenApiSpec } from './utils/openapi';
import { EOL } from 'os';
import { parseYamlText } from './utils/yaml';

main();

async function main() {
  process.stderr;
  console.log('# VIRGUL: START');
  
  const inputFile = process.argv[2];
  const outputFile = process.argv[3];
  console.log('# VIRGUL: reading file...', inputFile);
  const openApiSpec = await readInputText(inputFile);
  const openApiSpecObj = parseYamlText(openApiSpec.text);

  console.log('# VIRGUL: reading file...', inputFile, 'done!');

  console.log('# VIRGUL: parsing file...');
  let spec: any = null;
  try {
    spec = await parseOpenApiSpec(openApiSpecObj);
    console.log('# VIRGUL: parsing file... done!');
  } catch (error: Error | any) {
    console.log('# VIRGUL: parsing file... failed!');
    console.log(error?.message.split(EOL)[0] || '');
    return;
  }

  if (isDocOpenAPIV3_0Doc(spec)) {
    console.log('# VIRGUL: converting...');
    const schema = convertOpenApi3_0(spec);
    writeFileSync(outputFile, schema);
    console.log('# VIRGUL: converting... done!');
  }

  // if (isDocOpenAPIV3_1Doc(spec)) {
  //   openApiSpec.spec3_1 = spec;
  // }

  console.log('# VIRGUL: FINISH');
}
