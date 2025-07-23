import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { appSchema } from '@nozbe/watermelondb'

import MonitoringReport from './models/MonitoringReport'
import { MonitoringReportsSchema } from './schema' // your schema with tableSchema

const adapter = new SQLiteAdapter({
  schema: MonitoringReportsSchema,
  dbName: 'MonitoringDB',
  jsi: true, // if using Hermes
})

export const database = new Database({
  adapter,
  modelClasses: [MonitoringReport],
  actionsEnabled: true,
})
