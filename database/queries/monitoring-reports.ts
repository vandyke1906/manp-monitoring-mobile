import { Q } from '@nozbe/watermelondb';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import max from 'lodash/max';
import { database } from '../databases';
import MonitoringReports from "../models/MonitoringReport";

export type IMonitoringReport = {
  id?: string;
  personnels: string;
  other_agency_personnels: string;
  monitoring_date_start: string;
  monitoring_date_end?: string;
  location: string;
  persons_involved: string;
  description: string;
  action_taken: string;
  recommendation: string;
  photo_paths: string;
  is_synced?: boolean;
};

type TMonitoringPage = {
  current_page: number;
  last_page: number;
  data: MonitoringReports[];
};

const MonitoringDB = database.collections.get<MonitoringReports>('monitoring_reports');

export const findMonitoringReport = async (id: string) => {
  return await MonitoringDB.find(id);
};

export const addMonitoringReport = async (payload: IMonitoringReport) => {
  const result = await database.write(async () => {
    return await MonitoringDB.create((record) => {
      Object.assign(record, payload);
    });
  });
  return result;
};

export const editMonitoringReport = async (payload: IMonitoringReport) => {
  const report = await findMonitoringReport(payload.id!);
  const result = await database.write(async () => {
    return await report.update((record) => {
      Object.assign(record, payload);
    });
  });
  return result;
};

export const deleteMonitoringReport = async (id: string) => {
  await database.write(async () => {
    const record = await findMonitoringReport(id);
    await record.destroyPermanently();
  });
};

export const useInfiniteMonitoringReports = (search = '', per_page = 50, options = {}) => {
  return useInfiniteQuery({
    queryKey: ['monitoring_reports', search],
    queryFn: async ({ pageParam = 1 }): Promise<TMonitoringPage> => {
      const indexOfLast = pageParam * per_page;
      const indexOfFirst = indexOfLast - per_page;
      const countData = await MonitoringDB.query().fetchCount();
      const pages = Array.from({ length: Math.ceil(countData / per_page) }, (_, i) => i + 1);
      const lastPage = max(pages) || 1;

      const data = await MonitoringDB.query(
        Q.where('location', Q.like(`%${Q.sanitizeLikeString(search)}%`)),
        Q.sortBy('monitoring_date_start', Q.desc),
        Q.skip(indexOfFirst),
        Q.take(per_page)
      ).fetch();

      return {
        data,
        current_page: pageParam,
        last_page: lastPage,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.current_page < lastPage.last_page ? lastPage.current_page + 1 : undefined,
    ...options,
  });
};

export const useAddMonitoringReport = () => {
  return useMutation({ mutationFn: addMonitoringReport });
};

export const useEditMonitoringReport = () => {
  return useMutation({ mutationFn: editMonitoringReport });
};

export const useDeleteMonitoringReport = () => {
  return useMutation({ mutationFn: deleteMonitoringReport });
};