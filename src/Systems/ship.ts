import { System } from "../engine/System";

import { ISpaceTrashSystems } from ".";
import Component from "../engine/Component";


export  class ShipPower extends System<ISpaceTrashSystems> {
  tick(delta: number, components: Component<unknown, unknown>[]): Component<unknown, unknown>[] {
    return components;
  }
  constructor() {
    super()
  }
  doPreLogic() {
    console.log("Casting loop")
    return {};
  }
  doLogic(prelogic) {
    console.log("Casting loop")
  }
  doPostLogic(logic) {
    console.log("Casting loop")
  }
}

export class ShipDoor extends System<ISpaceTrashSystems> {
  tick(delta: number, components: Component<unknown, unknown>[]): Component<unknown, unknown>[] {
    return components;
  }
  constructor() {
    super()
  }
  doPreLogic() {
    console.log("Casting loop")
    return {};
  }
  doLogic(prelogic) {
    console.log("Casting loop")
  }
  doPostLogic(logic) {
    console.log("Casting loop")
  }
}

export class ShipAtmosphere extends System<ISpaceTrashSystems> {
  tick(delta: number, components: Component<unknown, unknown>[]): Component<unknown, unknown>[] {
    return components;
  }
  constructor() {
    super()
  }
  doPreLogic() {
    console.log("Casting loop")
    return {};
  }
  doLogic(prelogic) {
    console.log("Casting loop")
  }
  doPostLogic(logic) {
    console.log("Casting loop")
  }
}

export class ShipFluids extends System<ISpaceTrashSystems> {
  tick(delta: number, components: Component<unknown, unknown>[]): Component<unknown, unknown>[] {
    return components;
  }
  constructor() {
    super()
  }
  doPreLogic() {
    console.log("Casting loop")
    return {};
  }
  doLogic(prelogic) {
    console.log("Casting loop")
  }
  doPostLogic(logic) {
    console.log("Casting loop")
  }
}

export class ShipDocking extends System<ISpaceTrashSystems> {
  tick(delta: number, components: Component<unknown, unknown>[]): Component<unknown, unknown>[] {
    return components;
  }
  constructor() {
    super()
  }
  doPreLogic() {
    console.log("Casting loop")
    return {};
  }
  doLogic(prelogic) {
    console.log("Casting loop")
  }
  doPostLogic(logic) {
    console.log("Casting loop")
  }
}

export class ShipSubLight extends System<ISpaceTrashSystems> {
  tick(delta: number, components: Component<unknown, unknown>[]): Component<unknown, unknown>[] {
    return components;
  }
  constructor() {
    super()
  }
  doPreLogic() {
    console.log("Casting loop")
    return {};
  }
  doLogic(prelogic) {
    console.log("Casting loop")
  }
  doPostLogic(logic) {
    console.log("Casting loop")
  }
}

export class ShipFTL extends System<ISpaceTrashSystems> {
  tick(delta: number, components: Component<unknown, unknown>[]): Component<unknown, unknown>[] {
    return components;
  }
  constructor() {
    super()
  }
  doPreLogic() {
    console.log("Casting loop")
    return {};
  }
  doLogic(prelogic) {
    console.log("Casting loop")
  }
  doPostLogic(logic) {
    console.log("Casting loop")
  }
}