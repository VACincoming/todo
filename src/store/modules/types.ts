export interface TodoState {
  elems: Elems[],
  oldElems: Elems[],
}

export interface OtherTodoState {
  id: number,
  matches: boolean,
  isInSearch: boolean,
  alertMsg: boolean,
  alertMsgSpace: boolean
}

export default class Elems {
  id: number;
  done: boolean;
  label: string;

  constructor() {
    this.id = 0;
    this.done = false;
    this.label = "";
  }
}
