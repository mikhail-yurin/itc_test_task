import { StatusName } from '../types/IStatus';

export const getStatusId = (statusName: StatusName): string | null => {
  switch (statusName) {
    case StatusName.accepted:
      return 'mmnBqz3TzN1KJuzd';
    case StatusName.cancelled:
      return '6hYOgbjhS8gdQV1x';
    case StatusName.issued:
      return 'rLWEV66tm1suBgap';
    case StatusName.new:
      return 'zCna9JadQOay6kd6';
    default:
      return null;
  }
};
