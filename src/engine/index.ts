import { System } from "./ECS";

export type ISystems<T, S> = Record<keyof T, System<S>>;