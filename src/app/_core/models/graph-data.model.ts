export namespace GraphData {
  export interface Simple {
    name: string;
    value: number;
  }
  export interface Group {
    name: string;
    series: Simple[];
  }
}
