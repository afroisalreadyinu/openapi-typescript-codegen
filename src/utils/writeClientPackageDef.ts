import { resolve } from 'path';

import type { HttpClient } from '../HttpClient';
import type { Indent } from '../Indent';
import { writeFile } from './fileSystem';
import { formatCode as f } from './formatCode';
import { formatIndentation as i } from './formatIndentation';
import { isDefined } from './isDefined';
import type { Templates } from './registerHandlebarTemplates';

/**
 * Generate Services using the Handlebar template and write to disk.
 * @param services Array of Services to write
 * @param templates The loaded handlebar templates
 * @param outputPath Directory to write the generated files to
 * @param httpClient The selected httpClient (fetch, xhr, node or axios)
 * @param useUnionTypes Use union types instead of enums
 * @param useOptions Use options or arguments functions
 * @param indent Indentation options (4, 2 or tab)
 * @param postfix Service name postfix
 * @param clientName Custom client class name
 */
export const writeClientPackageDef = async (
    templates: Templates,
    outputPath: string,
    indent: Indent,
    clientName?: string
): Promise<void> => {
    const file = resolve(outputPath, "../package.json");
    const templateResult = templates.packageJson({
	clientName: clientName
    });
    await writeFile(file, i(f(templateResult), indent));
};
