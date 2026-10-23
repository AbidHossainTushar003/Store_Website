const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const path = require('node:path');
const test = require('node:test');
const ts = require('typescript');

function loadApiBase() {
  const filename = path.join(__dirname, '..', 'src', 'lib', 'api-base.ts');
  const source = fs.readFileSync(filename, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const loadedModule = new Module(filename, module);
  loadedModule.filename = filename;
  loadedModule.paths = Module._nodeModulePaths(path.dirname(filename));
  loadedModule._compile(compiled, filename);
  return loadedModule.exports;
}

const { getApiBaseUrl } = loadApiBase();

function withEnvironment(environment, callback) {
  const previous = new Map(
    Object.keys(environment).map((name) => [name, process.env[name]]),
  );
  for (const [name, value] of Object.entries(environment)) {
    if (value === undefined) {
      delete process.env[name];
    } else {
      process.env[name] = value;
    }
  }

  try {
    callback();
  } finally {
    for (const [name, value] of previous) {
      if (value === undefined) {
        delete process.env[name];
      } else {
        process.env[name] = value;
      }
    }
  }
}

test('uses the local API default only in development', () => {
  withEnvironment({
    NODE_ENV: 'development',
    NEXT_PUBLIC_API_BASE_URL: undefined,
  }, () => {
    assert.equal(getApiBaseUrl(), 'http://localhost:3001/api/v1');
  });
});

test('fails closed when a production API origin is missing or insecure', () => {
  withEnvironment({
    NODE_ENV: 'production',
    NEXT_PUBLIC_API_BASE_URL: undefined,
  }, () => {
    assert.throws(getApiBaseUrl, /required outside development/);
  });

  withEnvironment({
    NODE_ENV: 'production',
    NEXT_PUBLIC_API_BASE_URL: 'http://api.example.test/api/v1',
  }, () => {
    assert.throws(getApiBaseUrl, /must use HTTPS in production/);
  });
});

test('accepts a public HTTPS API origin and rejects embedded credentials', () => {
  withEnvironment({
    NODE_ENV: 'production',
    NEXT_PUBLIC_API_BASE_URL: 'https://api.example.test/api/v1/',
  }, () => {
    assert.equal(getApiBaseUrl(), 'https://api.example.test/api/v1');
  });

  withEnvironment({
    NODE_ENV: 'production',
    NEXT_PUBLIC_API_BASE_URL: 'https://user:password@api.example.test/api/v1',
  }, () => {
    assert.throws(getApiBaseUrl, /must not contain credentials/);
  });
});
