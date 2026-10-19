import { spawn, execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync, openSync, unlinkSync } from 'node:fs';
import { networkInterfaces } from 'node:os';
import { Socket } from 'net';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const stateDir = resolve(root, '.next-local');
const stateFile = resolve(stateDir, 'server.json');
const logFile = resolve(stateDir, 'server.log');
const port = 4321;
const command = process.argv[2];
const lanMode = process.argv.includes('--lan');
const hostname = lanMode ? '0.0.0.0' : '127.0.0.1';

const lanAddresses = () =>
  Object.values(networkInterfaces())
    .flat()
    .filter(entry => entry && entry.family === 'IPv4' && !entry.internal && !entry.address.startsWith('169.254.'))
    .map(entry => entry.address);

// O Next bloqueia recursos internos de dev (HMR, fontes do overlay) para origens
// fora da lista. Sem isso, abrir a página pelo IP da rede deixa o React sem
// hidratar e a experiência fica sem movimento e sem interação. O loopback já é
// liberado por next.config.ts; aqui entram os endereços da rede local.
const allowedOrigins = () => lanAddresses().join(',');

// Abre um socket UDP sem enviar tráfego para descobrir o endereço escolhido pela rota padrão.
const outboundAddress = async () => {
  const socket = new Socket();
  try {
    await new Promise((resolveConnect, rejectConnect) => {
      socket.once('error', rejectConnect);
      socket.connect(53, '8.8.8.8', resolveConnect);
    });
    return socket.address().address;
  } catch {
    return null;
  } finally {
    socket.destroy();
  }
};

const serverUrls = async host => {
  if (host !== '0.0.0.0') return [`http://localhost:${port}`];
  const primary = await outboundAddress();
  const candidates = [primary, ...lanAddresses()].filter((address, index, all) => address && all.indexOf(address) === index);
  return [`http://localhost:${port}`, ...candidates.map(address => `http://${address}:${port}`)];
};

const readState = () => {
  try { return JSON.parse(readFileSync(stateFile, 'utf8')); } catch { return null; }
};
const running = state => {
  if (!state || state.root !== root) return false;
  try { process.kill(state.pid, 0); return true; } catch { return false; }
};
const state = readState();
if (command === 'status') {
  console.log(running(state) ? `Next.js running at ${(await serverUrls(state.hostname)).join(' | ')} (pid ${state.pid})` : 'Next.js background server stopped.');
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
  console.log(`Next.js already running at ${(await serverUrls(state.hostname)).join(' | ')} (pid ${state.pid})`);
} else {
  const background = process.argv.includes('--background');
  mkdirSync(stateDir, { recursive: true });
  const mode = process.argv.includes('--production') ? 'start' : 'dev';
  const args = [resolve(root, 'node_modules/next/dist/bin/next'), mode, '--port', String(port), '--hostname', hostname];
  const log = background ? openSync(logFile, 'a') : undefined;
  const child = spawn(process.execPath, args, { cwd: root, detached: background, windowsHide: true, stdio: background ? ['ignore', log, log] : 'inherit', env: { ...process.env, DEV_ALLOWED_ORIGINS: allowedOrigins() } });
  if (background) {
    writeFileSync(stateFile, JSON.stringify({ pid: child.pid, root, mode, hostname, startedAt: new Date().toISOString() }));
    child.unref();
    console.log(`Starting Next.js in background at ${(await serverUrls(hostname)).join(' | ')} (pid ${child.pid}). Check npm run dev -- logs.`);
    if (lanMode) console.log('Servidor acessível pelos dispositivos na mesma rede.');
  } else {
    child.on('exit', code => { process.exitCode = code ?? 1; });
  }
}
