import { Circle, deg2rad } from "detect-collisions";
import * as THREE from "three";

import { SpaceTrashEntity } from "../../Entity";
import { TileSize } from "../../../Constants";
import { LightIncastingComponent } from "../../Components/v1/casting/in";
import { SP_PhysicalComponent } from "../../../../demiurge/physics/SP_Physical";
import { PixiJsRenderableComponent } from "../../../../demiurge/rendering/pixijs";
import { ThreeJsRenderableComponent } from "../../../../demiurge/rendering/threejs";

import { Actor, bunnySprite } from ".";
import { FloatMovingComponent } from "../../../../demiurge/game/physical";
import { AiAgentComponent } from "../../Components/v3/ai";
import { NearSenseComponent } from "../../Components/v4/NearSenseComponent";
import { NavSenseComponent } from "../../Components/v4/NavSenseComponent";

/**
 * AI Bot Entity
 * 
 * Core autonomous agent in the SpaceTrash ecosystem featuring:
 * - Upgradeable hardware systems
 * - Sensor processing capabilities
 * - Autonomous decision making
 * 
 * Upgrade System Features:
 * - 4 slot types (sensor/weapon/mobility/utility)
 * - Power management
 * - Active/passive state tracking
 * 
 * Key Behaviors:
 * - Navigation via NavSenseComponent
 * - Proximity detection via NearSenseComponent
 * - Basic movement patterns
 * - Upgrade interaction capabilities
 */
export class AiBot extends Actor {
  public navigationEnabled: boolean = false;
  public proximityEnabled: boolean = false;
  public activeSensors: Set<string> = new Set();
  public upgradeSlots: Map<UpgradeSlotType, UpgradeComponent|null> = new Map([
    ['sensor', null],    // For perception upgrades
    ['actuator', null]   // For action upgrades
  ]);
  private _powerCapacity: number = 5;
  private _usedPower: number = 0;

  /**
   * Installs an upgrade into an available slot
   * @param upgrade The upgrade component to install
   * @returns boolean indicating success
   */
  installUpgrade(upgrade: UpgradeComponent): boolean {
    if (this._usedPower + upgrade.powerDraw > this._powerCapacity) {
      return false; // Not enough power
    }

    const slot = this.upgradeSlots.get(upgrade.slotType);
    if (slot) {
      this.removeUpgrade(upgrade.slotType); // Remove existing upgrade first
    }

    upgrade.install(this);
    this.upgradeSlots.set(upgrade.slotType, upgrade);
    this._usedPower += upgrade.powerDraw;
    return true;
  }

  /**
   * Removes an upgrade from its slot
   * @param slotType The slot type to clear
   */
  removeUpgrade(slotType: UpgradeSlotType): void {
    const upgrade = this.upgradeSlots.get(slotType);
    if (upgrade) {
      upgrade.uninstall(this);
      this.upgradeSlots.set(slotType, null);
      this._usedPower -= upgrade.powerDraw;
    }
  }

  /**
   * Activates an installed upgrade
   * @param slotType The slot type to activate
   */
  activateUpgrade(slotType: UpgradeSlotType): void {
    const upgrade = this.upgradeSlots.get(slotType);
    if (upgrade && !upgrade.state.active) {
      upgrade.activate(this);
    }
  }

  /**
   * Deactivates an installed upgrade
   * @param slotType The slot type to deactivate
   */
  deactivateUpgrade(slotType: UpgradeSlotType): void {
    const upgrade = this.upgradeSlots.get(slotType);
    if (upgrade && upgrade.state.active) {
      upgrade.deactivate(this);
    }
  }

  /**
   * Gets the current power status
   * @returns Object with capacity and used power
   */
  getPowerStatus() {
    return {
      capacity: this._powerCapacity,
      used: this._usedPower,
      remaining: this._powerCapacity - this._usedPower
    };
  }

  constructor(
    x: number,
    y: number,
    image,
    textures
  ) {
    const spe = new SpaceTrashEntity();

    const physical = new Circle({ x, y }, TileSize / 5, {
      isStatic: false,
      angle: deg2rad((Math.random() - 0.5) * 360)
    });

    const m = new THREE.Mesh(
      new THREE.CylinderGeometry(TileSize/4, TileSize/4, TileSize/2, 8),
      new THREE.MeshBasicMaterial({color: 0x9900ff})
    );
    m.position.set(x, y, 0);
    m.rotation.set(0, 0, 0);

    super(
      spe,
      [
        new AiAgentComponent('langdonsAnt', spe),
        new SP_PhysicalComponent(physical, 0.1),
        new LightIncastingComponent(1),
        new PixiJsRenderableComponent(bunnySprite()),
        new ThreeJsRenderableComponent([m]),
        new FloatMovingComponent(
          (Math.random() - 0.5) * 2, 
          (Math.random() - 0.5) * 2
        ),
        new NearSenseComponent(10), // Now an upgrade
        new NavSenseComponent(10)   // Now an upgrade


        // aiAgentConfig,
        // new FloatMovingComponent((Math.random()-0.5)*3, (Math.random()-0.5) * 3),
        
        // new DegreesDirectionComponent(r),

        // // new LightOutcastingComponent(1),
      ]

      // V2
      // {
      //   attackPattern: "melee",
      //   explorePattern: RandomExplorePattern(),
      //   defendPattern: "protectTheNest",
      //   diePattern: "explode",
      //   seekPattern: "FOV",
      //   repelPattern: "FOV",
      //   motion: "tank",
      //   weaknesses: "heat",
      //   strength: "heat",
      // }
    );
  }
}
