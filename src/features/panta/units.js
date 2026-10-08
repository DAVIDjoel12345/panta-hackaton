export const formatBase=value=>{const n=BigInt(value||'0');return `${n/1000000n}.${(n%1000000n).toString().padStart(6,'0')}`}
