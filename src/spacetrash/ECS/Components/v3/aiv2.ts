import {
  IAttack,
  IAttractRepel,
  IDefend,
  IDie,
  IExplore,
  ISpawn,
  IStrengthsAndWeaknesses,
} from "./ai";
import { FovSense } from "./senses/fov";
import { RadiationSense } from "./senses/radiation";

class AiAgentV2 {
  memory: {
    setPieces;
    actors;
  };

  senses: {
    fovSense: FovSense;
    radiationSense: RadiationSense;
    heatSense;
    atmosphereSense;
    soundSense;
  };




  relations: {
    rival
    teammate
    predator
    prey
    stranger;
  }

  events: {
    trackedActor
    lastTrackofActor
    friendlyActor
    unfriendlyActor
  }

  foreBrain: {
    repelPattern: IRepelPAttern;
    attractPattern: IAttractPattern;
    strengthPattern: IStrengthPattern;
    weaknessPattern: IWeaknessPattern;
  };

  midBrain: {
    attackPattern: IAttack;
    defendPattern: IDefend;
    diePattern: IDie;
    spawnPattern: ISpawn;
  };

  hindBrain: {
    boredPattern: IBoredPAttern;
    hungerPattern: IHungerPattern;
    fearPattern: IFearPattern;
    ambitionPattern: IAmbitionPattern;
  };


    preferences: {
    attraction: IAttractRepel;
    repellant: IAttractRepel;
    };
  
}
