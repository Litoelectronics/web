const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const chunksRoot = path.join(projectRoot, '.open-next/server-functions/default/.next/server/chunks');
const serverRoot = path.join(projectRoot, '.open-next/server-functions/default/.next/server');
const shimPath = path.join(projectRoot, 'cloudflare', 'fs-shim.js');
const runtimeTargets = [
  path.join(projectRoot, '.open-next/server-functions/default/.next/server/chunks/ssr/[turbopack]_runtime.js'),
  path.join(projectRoot, '.open-next/server-functions/default/handler.mjs'),
  path.join(projectRoot, '.open-next/worker.js')
];

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

function buildReplacement(chunkFiles, targetFile) {
  const cases = chunkFiles
    .map((filePath) => {
      const relativeToServer = path.relative(serverRoot, filePath).split(path.sep).join('/');
      const chunkPath = `server/${relativeToServer}`;
      const relativeRequirePath = path.relative(path.dirname(targetFile), filePath).split(path.sep).join('/');
      const requirePath = relativeRequirePath.startsWith('.') ? relativeRequirePath : `./${relativeRequirePath}`;
      return `      case "${chunkPath}": return require("${requirePath}");`;
    })
    .join('\n');

  return `function requireChunk(chunkPath) {
    switch(chunkPath) {
${cases}
      default:
        throw new Error(\`Not found \${chunkPath}\`);
    }
  }


  async function loadWasmChunk(chunkPath) {`;
}

function createShimImportPath(filePath) {
  const shimImportPath = path.relative(path.dirname(filePath), shimPath).split(path.sep).join('/');
  return shimImportPath.startsWith('.') ? shimImportPath : `./${shimImportPath}`;
}

function patchFileForFsShim(filePath) {
  if (!fs.existsSync(filePath)) {
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = content;

  // Ensure instrumentation is short-circuited before any require.apply throw path.
  changed = changed
    .replace(
      /typeof require !== "undefined" \? require :/g,
      'typeof require !== "undefined" ? function(){const __req=arguments[0];if(String(__req||"").includes("instrumentation.js"))return{};return require.apply(this,arguments);} :'
    )
    .replace(
      /typeof require<"u"\?require:/g,
      'typeof require<"u"?function(){let __req=arguments[0];if(String(__req||"").includes("instrumentation.js"))return{};return require.apply(this,arguments);}: '
    )
    .replace(
      /if\s*\(\s*typeof require !== ["']undefined["']\s*\)\s*return require\.apply\(this,\s*arguments\);/g,
      'if (typeof require !== "undefined") { const __req = arguments[0]; if (String(__req || "").includes("instrumentation.js")) return {}; return require.apply(this, arguments); }'
    )
    .replace(
      /if\s*\(\s*typeof require<(["'])u\1\s*\)\s*return require\.apply\(this,\s*arguments\);/g,
      'if(typeof require<"u"){let __req=arguments[0];if(String(__req||"").includes("instrumentation.js"))return{};return require.apply(this,arguments);}'
    )
    .replace(
      /if\s*\(\s*true\s*\)\s*return require\.apply\(this,\s*arguments\);/g,
      'if(true){let __req=arguments[0];if(String(__req||"").includes("instrumentation.js"))return{};return require.apply(this,arguments);}'
    );

  if (content.includes('fs') || content.includes('node:fs')) {
    const importPath = createShimImportPath(filePath);
    changed = changed
      .replace(/require\(\s*(['"])(node:)?fs(?:\/promises)?\1\s*\)/g, `require(${JSON.stringify(importPath)})`)
      .replace(/from\s+(['"])(node:)?fs(?:\/promises)?\1/g, `from ${JSON.stringify(importPath)}`)
      .replace(/import\(\s*(['"])(node:)?fs(?:\/promises)?\1\s*\)/g, `import(${JSON.stringify(importPath)})`);
  }

  changed = changed.replace(
    /throw Error\('Dynamic require of "'\+x\+'" is not supported'\)/g,
    "if(String(x||'').includes('instrumentation.js'))return{};throw Error('Dynamic require of \"'+x+'\" is not supported')"
  );

    changed = changed.replace(
      /throw Error\('Dynamic require of "'\s*\+\s*([a-zA-Z_$][\w$]*)\s*\+\s*'" is not supported'\)/g,
      "if(String($1||'').includes('instrumentation.js'))return{};throw Error('Dynamic require of \\\"'+$1+'\\\" is not supported')"
    );

    changed = changed.replace(
      /throw new Error\('Dynamic require of "'\s*\+\s*([a-zA-Z_$][\w$]*)\s*\+\s*'" is not supported'\)/g,
      "if(String($1||'').includes('instrumentation.js'))return{};throw new Error('Dynamic require of \\\"'+$1+'\\\" is not supported')"
    );

    changed = changed.replace(
      /throw Error\("Dynamic require of \\\""\s*\+\s*([a-zA-Z_$][\w$]*)\s*\+\s*"\\\" is not supported"\)/g,
      "if(String($1||'').includes('instrumentation.js'))return{};throw Error(\"Dynamic require of \\\\\\\"\"+$1+\"\\\\\\\" is not supported\")"
    );

    changed = changed.replace(
      /throw new Error\("Dynamic require of \\\""\s*\+\s*([a-zA-Z_$][\w$]*)\s*\+\s*"\\\" is not supported"\)/g,
      "if(String($1||'').includes('instrumentation.js'))return{};throw new Error(\"Dynamic require of \\\\\\\"\"+$1+\"\\\\\\\" is not supported\")"
    );

  // In workers, unsupported dynamic requires are non-critical for this app.
  // Fail open to avoid hard 500s from optional instrumentation paths.
  changed = changed
    .replace(/throw Error\('Dynamic require of \\"'\+([a-zA-Z_$][\w$]*)\+'\\" is not supported'\)/g, 'return {}')
    .replace(/throw new Error\('Dynamic require of \\"'\+([a-zA-Z_$][\w$]*)\+'\\" is not supported'\)/g, 'return {}')
    .replace(/throw Error\('Dynamic require of "'\+x\+'" is not supported'\)/g, 'return {}')
    .replace(/throw Error\('Dynamic require of "'\s*\+\s*([a-zA-Z_$][\w$]*)\s*\+\s*'" is not supported'\)/g, 'return {}')
    .replace(/throw new Error\('Dynamic require of "'\s*\+\s*([a-zA-Z_$][\w$]*)\s*\+\s*'" is not supported'\)/g, 'return {}')
    .replace(/throw Error\("Dynamic require of \\\""\s*\+\s*([a-zA-Z_$][\w$]*)\s*\+\s*"\\\" is not supported"\)/g, 'return {}')
    .replace(/throw new Error\("Dynamic require of \\\""\s*\+\s*([a-zA-Z_$][\w$]*)\s*\+\s*"\\\" is not supported"\)/g, 'return {}');

  changed = changed.replace(
    /(if\(String\([a-zA-Z_$][\w$]*\|\|''\)\.includes\('instrumentation\.js'\)\)return\{\};)\1+/g,
    '$1'
  );

  changed = changed
    .replace(
      /if\(!manifestSingleton\)throw Object\.defineProperty\(new _invarianterror\.InvariantError\("The manifests singleton was not initialized\."\),"__NEXT_ERROR_CODE",\{value:"E950",enumerable:!1,configurable:!0\}\);return manifestSingleton/g,
      'if(!manifestSingleton)return{clientReferenceManifestsPerRoute:{},proxiedClientReferenceManifest:{moduleLoading:{prefix:"",crossOrigin:null},edgeSSRModuleMapping:{},ssrModuleMapping:{}},serverActionsManifest:{node:{},edge:{},encryptionKey:""},serverModuleMap:{}};return manifestSingleton'
    )
    .replace(
      /if\(!e10\)throw Object\.defineProperty\(new eB\.z\("The manifests singleton was not initialized\."\),"__NEXT_ERROR_CODE",\{value:"E950",enumerable:!1,configurable:!0\}\);return e10/g,
      'if(!e10)return{clientReferenceManifestsPerRoute:{},proxiedClientReferenceManifest:{moduleLoading:{prefix:"",crossOrigin:null},edgeSSRModuleMapping:{},ssrModuleMapping:{}},serverActionsManifest:{node:{},edge:{},encryptionKey:""},serverModuleMap:{}};return e10'
    )
    .replace(
      /if\(!([a-zA-Z_$][\w$]*)\)throw Object\.defineProperty\(new [^)]*\("The manifests singleton was not initialized\."\),"__NEXT_ERROR_CODE",\{value:"E950",enumerable:!1,configurable:!0\}\);return \1/g,
      'if(!$1)return{clientReferenceManifestsPerRoute:{},proxiedClientReferenceManifest:{moduleLoading:{prefix:"",crossOrigin:null},edgeSSRModuleMapping:{},ssrModuleMapping:{}},serverActionsManifest:{node:{},edge:{},encryptionKey:""},serverModuleMap:{}};return $1'
    );

  changed = changed.replace(/\.rewrites\.beforeFiles\.filter\(([^)]+)\)\.map/g, '.rewrites?.beforeFiles?.filter($1)?.map');
  changed = changed.replace(/\.rewrites\.beforeFiles\.filter/g, '.rewrites?.beforeFiles?.filter');
    changed = changed.replace(/\.rewrites\.beforeFiles/g, '.rewrites?.beforeFiles');
  changed = changed.replace(/\.rewrites\?\.beforeFiles\?\.filter\(([^)]+)\)\.map/g, '.rewrites?.beforeFiles?.filter($1)?.map');

  // Improve deployed diagnostics so wrangler tail includes useful stack text.
  changed = changed.replace(/error\("NextJS request failed\.",e\)/g, 'error("NextJS request failed.",e?.stack||e)');

  // Disable node instrumentation error callbacks in worker runtime.
  changed = changed
    .replace(/return i10\(n10,this\.distDir,\.\.\.t10\)/g, 'return undefined')
    .replace(/return i2\(a3,this\.distDir,\.\.\.t10\)/g, 'return undefined');

  // In the bundled handler, internal module wrappers may resolve relative require
  // paths against the bundle execution context instead of virtual module paths.
  // Normalize shim requires to an absolute path from the handler directory.
  if (path.basename(filePath) === 'handler.mjs') {
    changed = changed.replace(
      /require\((['"])\.\.\.\/\.\.\.\/\.\.\.\/cloudflare\/fs-shim\.js\1\)/g,
      'require(require("path").join(__dirname, "../../../cloudflare/fs-shim.js"))'
    );

    changed = changed.replace(
      /function ensureInstrumentationRegistered\([^)]*\)\{return registerInstrumentationPromise\|\|\(registerInstrumentationPromise=registerInstrumentation\([^)]*\)\),registerInstrumentationPromise\}/g,
      'function ensureInstrumentationRegistered(){return Promise.resolve()}'
    );

  }

  if (path.basename(filePath) === 'worker.js') {
    changed = changed.replace(/(?:\s*process\.env\.NEXT_PHASE \?\?= "phase-production-build";\s*)+/g, '\n\n');
    if (!changed.includes('globalThis.__opennext_require_shim__')) {
      changed = changed.replace(
        'export default {',
        'process.env.NEXT_PHASE ??= "phase-production-build";\nif (!globalThis.__opennext_require_shim__) {\n    globalThis.__opennext_require_shim__ = true;\n    globalThis.require = function(id) {\n        if (String(id || "").includes("instrumentation.js")) return {};\n        throw new Error(`Dynamic require of "${id}" is not supported`);\n    };\n}\n\nexport default {'
      );
    }

    if (!changed.includes('__OPENNEXT_ASSET_FIRST__')) {
      changed = changed.replace(
        '            // - `Request`s are handled by the Next server',
        '            // __OPENNEXT_ASSET_FIRST__\n            if ((request.method === "GET" || request.method === "HEAD") && !url.pathname.startsWith("/api")) {\n                const staticResponse = await env.ASSETS.fetch(request);\n                if (staticResponse && staticResponse.status !== 404) {\n                    return staticResponse;\n                }\n            }\n            // - `Request`s are handled by the Next server'
      );
    }
  }

  if (changed === content) {
    return false;
  }

  fs.writeFileSync(filePath, changed, 'utf8');
  return true;
}

function patchRuntimeFile(filePath, replacement) {
  if (!fs.existsSync(filePath)) {
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const pattern = /function requireChunk\(chunkPath\)\s*\{[\s\S]*?async function loadWasmChunk\(chunkPath\)\s*\{/;

  if (!pattern.test(content)) {
    return patchFileForFsShim(filePath);
  }

  content = content.replace(pattern, replacement);
  fs.writeFileSync(filePath, content, 'utf8');
  return patchFileForFsShim(filePath) || true;
}

function collectPatchableFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectPatchableFiles(fullPath));
    } else if (entry.isFile() && ['.js', '.mjs', '.cjs'].includes(path.extname(entry.name))) {
      results.push(fullPath);
    }
  }
  return results;
}

if (!fs.existsSync(chunksRoot)) {
  console.log('OpenNext runtime patch skipped: chunk directory not found.');
  process.exit(0);
}

const chunkFiles = collectChunkFiles(chunksRoot);
if (!chunkFiles.length) {
  console.log('OpenNext runtime patch skipped: no chunk files were generated.');
  process.exit(0);
}

const patchTargets = new Set([...runtimeTargets, ...collectPatchableFiles(path.join(projectRoot, '.open-next/server-functions/default'))]);
let patchedCount = 0;
for (const targetFile of patchTargets) {
  const replacement = buildReplacement(chunkFiles, targetFile);
  if (patchRuntimeFile(targetFile, replacement)) {
    patchedCount += 1;
  }
}

if (patchedCount === 0) {
  console.log('OpenNext runtime patch skipped: expected requireChunk block was not found in any target file and no fs shim rewrites were applied.');
  process.exit(0);
}

console.log(`Patched OpenNext runtime in ${patchedCount} file(s) with ${chunkFiles.length} chunk mappings.`);
