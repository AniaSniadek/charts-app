export interface CovidDataSimple {
  Country: string;
  CountryCode: string;
  Lat: string;
  Lon: string;
  Cases: number;
  Status?: string;
  Confirmed?: number;
  Deaths?: number;
  Recovered?: number;
  Active?: number;
  Date: string;
  ID?: string;
}
