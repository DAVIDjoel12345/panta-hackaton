import {DatabaseSync} from 'node:sqlite';
import {resolve} from 'node:path';
import {AppDatabase} from '../dist/runtime/database.js';

const sourcePath = process.argv[2];
if (!sourcePath || !process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
  throw Error('Usage: node --env-file-if-exists=.env scripts/migrate-to-turso.mjs path/to/source.sqlite. Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN first.');
}
const source = new DatabaseSync(resolve(sourcePath), {readOnly:true});
const target = new AppDatabase();
const tables = ['users','sessions','documents','commands','market_drafts','conversations','market_price_samples','market_metadata_snapshots','transaction_intents'];
try {
  await target.ready;
  await target.transaction(async () => {
    for (const table of tables) {
      if ((await target.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get()).count > 0) {
        throw Error('Target is not empty. Import cancelled; no records were changed. Use a new database before deploying the app.');
      }
    }
    let count = 0;
    for (const table of tables) {
      if (!source.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?").get(table)) continue;
      for (const row of source.prepare(`SELECT * FROM ${table}`).all()) {
        const columns = Object.keys(row);
        const names = columns.map(column => '"' + column.replaceAll('"','""') + '"').join(',');
        await target.prepare(`INSERT INTO ${table} (${names}) VALUES (${columns.map(()=>'?').join(',')})`).run(...Object.values(row));
        count++;
      }
    }
    console.log(`Imported ${count} records. Source database was not changed.`);
  });
} finally { source.close(); await target.close(); }
