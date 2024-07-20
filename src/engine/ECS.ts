import { System } from './System';
import { EntityComponent } from './EntityComponent';
import Component from './Component';
import { uuidv4 } from './lib';

export class ECS<SystemKeys extends string> {
  
  // systems: Record<SystemKeys, System<SystemKeys>>;
  system: System<SystemKeys>
  components: Record<string, Component<any, any>>;

  constructor(system: System<SystemKeys>) {
    this.system = system;    
    this.components = {};
  }

  setComponents(arg0: Record<string, Component<any, any>>) {
    this.components = arg0;
  }

  getComponents(system?: any) {
    return this.components;
  }

  setEntitiesComponent(ecss: EntityComponent[]): void {
    ecss.forEach((ec) => {
      const entityUuid = uuidv4();

      ec.components.forEach((c) => {
        const componentUid = uuidv4();
        this.components[componentUid] = {
          ...c,
          entity: entityUuid,
          constructor: {
            name: c.constructor.name,
          }

        } as any;
      })
    })
  }

  tick(delta: number) {
    this.components = this.system.tick(delta, this.components);
    // (Object.entries(this.systems) as Array<[SystemKeys, System<SystemKeys>]>).forEach( ([systemKey, system]) => {
    //   const x = system.tick(delta,  this.getComponents())
    //   // console.log("mark1", systemKey)
    //   // debugger
    //   this.setComponents(x);
    // })
    // const x = (Object.entries(this.systems) as Array<[SystemKeys, System<SystemKeys>]>).map(([systemKey, system]) => {
    //   // return system.tick
    //   // return new Promise((res, rej) => {

    //   // });
    //   return (comps) => {
    //     return new Promise<Record<string, Component<any, any>>>((res, rej) => {
    //       res(system.tick(delta, comps));
    //     })
    //   }
    // })
    //   .reduce(async (previousValue: any, currentValue: (comps: any) => Promise<Record<string, Component<any, any>>>, z: number) => {
    //     const x = await currentValue(previousValue)
    //     // debugger
    //     return x
    //     // return comps;
    //     // debugger
    //     // currentValue(previousValue).then((newComps) => {
    //     //   debugger
    //     // ;
    //   // })
    //   }, this.getComponents()).then((x) => {
    //     // debugger
    //     this.setComponents(x);
    //   })
    
    
  }
  
}
