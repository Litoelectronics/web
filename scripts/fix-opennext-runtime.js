const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const runtimeFile = path.join(projectRoot, '.open-next/server-functions/default/.next/server/chunks/ssr/[turbopack]_runtime.js');

if (!fs.existsSync(runtimeFile)) {
  console.log('OpenNext runtime patch skipped: runtime file not found.');
  process.exit(0);
}

const chunksRoot = path.join(projectRoot, '.open-next/server-functions/default/.next/server/chunks');

function collectChunkFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectChunkFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.js') && entry.name !== '[turbopack]_runtime.js') {
      results.push(fullPath);
    }
  }
  return results;
}

const chunkFiles = collectChunkFiles(chunksRoot);
if (!chunkFiles.length) {
  console.log('OpenNext runtime patch skipped: no chunk files were generated.');
  process.exit(0);
}

const serverRoot = path.join(projectRoot, '.open-next/server-functions/default/.next/server');
const cases = chunkFiles
  .map((filePath) => {
    const relativeToServer = path.relative(serverRoot, filePath).split(path.sep).join('/');
    const chunkPath = `server/${relativeToServer}`;
    const normalizedAbs = filePath.split(path.sep).join('/');
    return `      case "${chunkPath}": return require("${normalizedAbs}");`;
  })
  .join('\n');

const replacement = `function requireChunk(chunkPath) {
    switch(chunkPath) {
${cases}
      default:
        throw new Error(\`Not found \${chunkPath}\`);
    }
  }


  async function loadWasmChunk(chunkPath) {`;

let content = fs.readFileSync(runtimeFile, 'utf8');
const pattern = /function requireChunk\(chunkPath\) \{[\s\S]*?async function loadWasmChunk\(chunkPath\) \{/;

if (!pattern.test(content)) {
  console.log('OpenNext runtime patch skipped: expected requireChunk block was not found.');
  process.exit(0);
}

content = content.replace(pattern, replacement);
fs.writeFileSync(runtimeFile, content, 'utf8');
console.log(`Patched OpenNext runtime with ${chunkFiles.length} chunk mappings.`);
