import { handleMcp } from '../../../lib/mcp-handler';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  return handleMcp(request);
}

export async function POST(request: Request) {
  return handleMcp(request);
}

export async function OPTIONS(request: Request) {
  return handleMcp(request);
}