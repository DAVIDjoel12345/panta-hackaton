import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {inspectPort} from '../dist/runtime/startup.js';
test('startup distinguishes Panta, unrelated listeners, and available ports',async()=>{
  let panta=true;
  const server=createServer((_req,res)=>{res.setHeader('Content-Type','application/json');res.end(JSON.stringify(panta?{application:'panta-signal-backend'}:{status:'ok'}))});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const port=server.address().port;
  try{assert.equal(await inspectPort(port),'panta');panta=false;assert.equal(await inspectPort(port),'occupied')}
  finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve))}
  assert.equal(await inspectPort(port),'free');
});
