import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module.js';
import { inspectPort } from './runtime/startup.js';
const hosted = process.env.VERCEL === '1';
const rawPort = process.env.PORT || (hosted ? '3000' : '');
if (!rawPort || !/^\d+$/.test(rawPort) || Number(rawPort) < 1 || Number(rawPort) > 65535) {
  throw new Error('Set an explicit PORT between 1 and 65535. See .env.example.');
}
async function start(){
const port=Number(rawPort);
const existing=hosted ? 'available' : await inspectPort(port);
if(existing==='panta'){
  console.log(`Panta backend is already running at http://127.0.0.1:${port}. Reusing it. Restart that process to apply code or .env changes.`);
  return;
}
if(existing==='occupied')throw new Error(`Port ${port} is occupied by another service or an older backend. Stop that process before starting Panta. No process was terminated.`);
const app = await NestFactory.create<NestExpressApplication>(AppModule);
app.enableShutdownHooks();
app.useBodyParser('json', {limit:hosted ? '4mb' : '30mb'});
app.setGlobalPrefix('api/v1');
app.use((_req: unknown, res: {setHeader(name:string,value:string):void}, next:()=>void)=>{res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');next()});
try{await app.listen(port, hosted ? '0.0.0.0' : '127.0.0.1')}
catch(error){await app.close();if((error as NodeJS.ErrnoException).code==='EADDRINUSE')throw new Error(`Port ${port} became occupied during startup. Run the start command again to detect the existing backend.`);throw error}
}
start().catch(error=>{console.error(`Backend startup: ${error.message}`);process.exitCode=1});
