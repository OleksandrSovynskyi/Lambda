type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

export default class DataItem {
  constructor(public route: string, public data: { [x: string]: JSONValue }) {}
}
