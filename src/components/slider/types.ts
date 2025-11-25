export type TEvent = {
  id: number;
  event: string;
  date: string;
};

export type THistoricalEvent = {
  id: number;
  to: string;
  from: string;
  name: string;
  eventList: TEvent[];
};

export interface IProps {
  historicalEvents: THistoricalEvent[];
}
