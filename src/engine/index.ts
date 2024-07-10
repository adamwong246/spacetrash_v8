import { System } from "./System";

export type ISystems<T, S> = Record<keyof T, System<S>>;