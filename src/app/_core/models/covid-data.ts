export interface CovidData {
  date: string;
  country: string;
  confirmed: number;
  recovered: number;
  deaths: number;
}

export interface CountryPopulation {
  country: string;
  population: number;
}
