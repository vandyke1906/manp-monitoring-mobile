import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class MonitoringReport extends Model {
  static table = 'monitoring_reports';
  
  // static associations = {
  //   categories: {type: 'belongs_to', key: 'category_id'},
  // };

  @field('personnels') denrPersonnel!: string
  @field('other_agency_personnels') otherAgencyPersonnels!: string
  @field('monitoring_date_start') monitoringDateStart!: string
  @field('monitoring_date_end') monitoringDateEnd!: string
  @field('location') location!: string
  @field('persons_involved') personsInvolved!: string
  @field('description') description!: string
  @field('action_taken') actionTaken!: string
  @field('recommendation') recommendation!: string
  @field('photo_paths') photoPaths!: string
  @field('is_synced') isSynced!: boolean
}
