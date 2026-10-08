import {createConnection} from 'node:net';

export async function inspectPort(port){
  const occupied=await new Promise((resolve,reject)=>{
    const socket=createConnection({host:'127.0.0.1',port});
    socket.setTimeout(1500);
    socket.once('connect',()=>{socket.destroy();resolve(true)});
    socket.once('timeout',()=>{socket.destroy();reject(new Error('Timed out checking backend port.'))});
    socket.once('error',error=>{socket.destroy();if(error.code==='ECONNREFUSED')resolve(false);else reject(error)});
  });
  if(!occupied)return 'free';
  try{
    const response=await fetch(`http://127.0.0.1:${port}/api/v1/runtime/health`,{signal:AbortSignal.timeout(1500)});
    const status=await response.json();
    return response.ok&&status.application==='panta-signal-backend'?'panta':'occupied';
  }catch{return 'occupied'}
}
