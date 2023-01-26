export type Step = 1 | 2;
export type SaveStep = {
  [key: number]: {
    [key: number]: Step
  }
}
