// database/schema.ts
import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const MonitoringReportsSchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'monitoring_reports',
      columns: [
        { name: 'personnels', type: 'string' }, // comma separated
        { name: 'other_agency_personnels', type: 'string' }, //  JSON string: [{ name, office }]
        { name: 'monitoring_date_start', type: 'string' }, // ISO date string
        { name: 'monitoring_date_end', type: 'string', isOptional: true },
        { name: 'location', type: 'string' },
        { name: 'persons_involved', type: 'string' }, // comma separated
        { name: 'description', type: 'string' }, // complaint details
        { name: 'action_taken', type: 'string' },
        { name: 'recommendation', type: 'string' },
        { name: 'photo_paths', type: 'string' }, // store as comma-separated local URIs or JSON string
        { name: 'is_synced', type: 'boolean', isOptional: true }, // mark for sync status
      ],
    }),
  ],
});