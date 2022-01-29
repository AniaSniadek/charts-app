import { CovidStatus } from './../enums/covid-status.enum';
export interface RangeFormData {
  startDate: Date;
  endDate: Date;
  country: string;
  statusList: CovidStatus[];
}
