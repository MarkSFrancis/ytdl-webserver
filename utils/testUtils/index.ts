export type PartOf<T> = {
  [P in keyof T]?: PartOf<T[P]>;
};

export function stub<T>(from: PartOf<T>) {
  return from as T;
}
