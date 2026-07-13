const path = require('path');
const { Readable } = require('stream');

function normalizePath(filePath) {
  return String(filePath || '').replace(/\\/g, '/');
}

function createError(filePath, code = 'ENOENT') {
  const error = new Error(`${code}: no such file or directory, open '${filePath}'`);
  error.code = code;
  return error;
}

function isKnownJsonManifest(filePath) {
  return filePath.endsWith('.json') && filePath.includes('/.next/');
}

function isKnownJsManifest(filePath) {
  return filePath.endsWith('-manifest.js') || filePath.endsWith('_buildManifest.js');
}

function buildManifestFallback() {
  return {
    polyfillFiles: ['static/chunks/0cz1d0mv5g_q7.js'],
    devFiles: [],
    ampDevFiles: [],
    lowPriorityFiles: [
      'static/6TZsNJ2_ZZdqLNZlfbGD2/_buildManifest.js',
      'static/6TZsNJ2_ZZdqLNZlfbGD2/_ssgManifest.js',
      'static/6TZsNJ2_ZZdqLNZlfbGD2/_clientMiddlewareManifest.js',
    ],
    rootMainFiles: [
      'static/chunks/3z5q_p4msz2ha.js',
      'static/chunks/15orcrkp-_9ct.js',
      'static/chunks/3rxl-jt3pdxgx.js',
      'static/chunks/07u_h6i539_wj.js',
      'static/chunks/turbopack-2m86ldcs72djj.js',
    ],
    ampFirstPages: [],
    pages: { '/_app': [] },
  };
}

function toBufferOrString(content, encoding) {
  return typeof encoding === 'string' ? content : Buffer.from(content);
}

function readFileSync(filePath, encoding) {
  const normalized = normalizePath(filePath);
  if (normalized.endsWith('/.next/BUILD_ID') || normalized.endsWith('.next/BUILD_ID')) {
    const buildId = process.env.NEXT_BUILD_ID || 'cloudflare';
    return toBufferOrString(buildId, encoding);
  }

  if (
    normalized.endsWith('/.next/routes-manifest.json') ||
    normalized.endsWith('/.next/app-paths-manifest.json') ||
    normalized.endsWith('/.next/prerender-manifest.json')
  ) {
    return toBufferOrString('{}', encoding);
  }

  if (
    normalized.endsWith('/.next/build-manifest.json') ||
    normalized.endsWith('/.next/fallback-build-manifest.json')
  ) {
    return toBufferOrString(JSON.stringify(buildManifestFallback()), encoding);
  }

  // Next frequently reads generated manifests at runtime in the worker.
  // Returning empty structures is safer than throwing and crashing the request.
  if (isKnownJsonManifest(normalized)) {
    return toBufferOrString('{}', encoding);
  }

  if (isKnownJsManifest(normalized)) {
    if (normalized.endsWith('_buildManifest.js')) {
      return toBufferOrString(
        'self.__BUILD_MANIFEST={__rewrites:{beforeFiles:[],afterFiles:[],fallback:[]},sortedPages:[],polyfillFiles:[],devFiles:[],ampDevFiles:[],lowPriorityFiles:[],rootMainFiles:[],ampFirstPages:[],pages:{"/_app":[]}};self.__BUILD_MANIFEST_CB&&self.__BUILD_MANIFEST_CB();',
        encoding
      );
    }
    return toBufferOrString('self.__RSC_MANIFEST=self.__RSC_MANIFEST||{};', encoding);
  }

  throw createError(filePath);
}

function existsSync(filePath) {
  const normalized = normalizePath(filePath);
  return (
    normalized.endsWith('/.next/BUILD_ID') ||
    normalized.endsWith('.next/BUILD_ID') ||
    isKnownJsonManifest(normalized) ||
    isKnownJsManifest(normalized)
  );
}

function statSync(filePath) {
  return {
    isFile: () => existsSync(filePath),
    isDirectory: () => false,
    size: 0,
    mode: 0o644,
    mtime: new Date(0),
    atime: new Date(0),
    ctime: new Date(0),
    birthtime: new Date(0),
  };
}

function lstatSync(filePath) {
  return statSync(filePath);
}

function mkdirSync() {}
function writeFileSync() {}
function appendFileSync() {}
function readdirSync() {
  return [];
}

function readFile(filePath, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }
  try {
    const data = readFileSync(filePath, options && typeof options === 'string' ? options : undefined);
    callback && callback(null, data);
  } catch (error) {
    callback && callback(error);
  }
}

function createReadStream(filePath, options) {
  const data = readFileSync(filePath, options && options.encoding);
  return Readable.from([data]);
}

function accessSync(filePath) {
  if (!existsSync(filePath)) {
    throw createError(filePath);
  }
}

const promises = {
  readFile: async (filePath, options) => readFileSync(filePath, options),
  writeFile: async () => undefined,
  mkdir: async () => undefined,
  stat: async (filePath) => statSync(filePath),
  readdir: async () => [],
  access: async (filePath) => accessSync(filePath),
};

const fsShim = {
  readFileSync,
  existsSync,
  statSync,
  lstatSync,
  mkdirSync,
  writeFileSync,
  appendFileSync,
  readdirSync,
  readFile,
  createReadStream,
  accessSync,
  promises,
};

module.exports = fsShim;
module.exports.default = fsShim;
module.exports.promises = promises;
