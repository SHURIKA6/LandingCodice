import { spawn, execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync, openSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const stateDir = resolve(root, '.next-local');
const stateFile = resolve(stateDir, 'server.json');
const logFile = resolve(stateDir, 'server.log');
const command = process.argv[2];
const readState = () => {
  try { return JSON.parse(readFileSync(stateFile, 'utf8')); } catch { return null; }
};
const running = state => {
  if (!state || state.root !== root) return false;
  try { process.kill(state.pid, 0); return true; } catch { return false; }
};
const state = readState();
if (command === 'status') {
  console.log(running(state) ? `Next.js running at http://localhost:4321 (pid ${state.pid})` : 'Next.js background server stopped.');
} else if (command === 'logs') {
  console.log(existsSync(logFile) ? readFileSync(logFile, 'utf8').slice(-16000) : 'No background log.');
} else if (command === 'stop') {
  if (running(state)) {
    if (process.platform === 'win32') execFileSync('taskkill', ['/PID', String(state.pid), '/T', '/F'], { windowsHide: true, stdio: 'pipe' });
    else process.kill(-state.pid, 'SIGTERM');
    console.log('Next.js background server stopped.');
  }
  if (existsSync(stateFile)) unlinkSync(stateFile);
} else if (running(state)) {
  console.log(`Next.js already running at http://localhost:4321 (pid ${state.pid})`);
} else {
  const background = process.argv.includes('--background');
  mkdirSync(stateDir, { recursive: true });
  const mode = process.argv.includes('--production') ? 'start' : 'dev';
  const args = [resolve(root, 'node_modules/next/dist/bin/next'), mode, '--port', '4321', '--hostname', '127.0.0.1'];
  const log = background ? openSync(logFile, 'a') : undefined;
  const child = spawn(process.execPath, args, { cwd: root, detached: background, windowsHide: true, stdio: background ? ['ignore', log, log] : 'inherit' });
  if (background) {
    writeFileSync(stateFile, JSON.stringify({ pid: child.pid, root, mode, startedAt: new Date().toISOString() }));
    child.unref();
    console.log(`Starting Next.js in background at http://localhost:4321 (pid ${child.pid}). Check npm run dev -- logs.`);
  } else {
    child.on('exit', code => { process.exitCode = code ?? 1; });
  }
}
