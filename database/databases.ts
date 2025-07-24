import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import migrations from './migrations';
import MonitoringReport from './models/MonitoringReport';
import { MonitoringReportsSchema } from './schema'; // your schema with tableSchema

const adapter = new SQLiteAdapter({
  schema: MonitoringReportsSchema,
  dbName: 'MonitoringDB',
  migrations: migrations,
  jsi: true,
  onSetUpError: error => {
    console.log(error);
  },
})

export const database = new Database({
  adapter,
  modelClasses: [MonitoringReport],
})
