import { schemaMigrations } from '@nozbe/watermelondb/Schema/migrations';

export default schemaMigrations({
  migrations: [
    // used for table versioning
    // {
    //   toVersion: 2, // ⚠️ Set this to a number one larger than the current schema version
    //   steps: [
    //     createTable({
    //       name: 'monitoring_reports',
    //       columns: [
    //         {name: 'alias', type: 'string', isOptional: true},
    //       ],
    //     }),
    //   ],
    // },
  ],
});