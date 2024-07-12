import { System } from "./System";

export type ISystems<T, S extends string> = Record<keyof T, System<S>>;