export namespace GraphData {
  export interface Simple {
    name: string | Date;
    value: number;
  }
  export interface BubbleSeries {
    name: string;
    x: string;
    y: number;
    r: number;
  }
  export interface Group {
    name: string;
    series: Simple[] | BubbleSeries[] | any;
  }

  export interface ClickedValue {
    name: string;
    value: number;
    label: string;
    series: string;
  }
}
