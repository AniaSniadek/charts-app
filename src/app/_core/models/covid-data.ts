export class CovidData {
  date: string;
  country: string;
  confirmed: number;
  recovered: number;
  deaths: number;

  constructor(
    date: string,
    country: string,
    confirmed: number,
    recovered: number,
    deaths: number
  ) {
    this.date = date;
    this.country = country;
    this.confirmed = confirmed;
    this.recovered = recovered;
    this.deaths = deaths;
  }
}
