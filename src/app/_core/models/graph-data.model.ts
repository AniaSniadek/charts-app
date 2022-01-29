export namespace GraphData {
  export interface Simple {
    name: string | Date;
    value: number;
  }
  export interface Group {
    name: string;
    series: Simple[];
  }

  export interface ClickedValue {
    name: string;
    value: number;
    label: string;
    series: string;
  }
}
