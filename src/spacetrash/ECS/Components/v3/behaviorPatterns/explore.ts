import { SpaceTrash } from "../../../../Game/9-WithTiled";
import { AiAgentComponent } from "../ai";

export type IExplorePattern = (agent: AiAgentComponent, game: SpaceTrash, delta: number) => void;

export const explorationBehaviors = {
  langdonsAnt: (agent: AiAgentComponent, game: SpaceTrash, delta: number) => {
    // Initialize state if needed
    if (agent.state.lastDirectionChange === undefined) {
      agent.state = {
        lastDirectionChange: 0,
        currentDirection: Math.random() * Math.PI * 2,
        moveDuration: 1000 + Math.random() * 2000, // 1-3 seconds
        turnAngle: Math.PI / 2 // 90 degree turns like Langton's Ant
      };
    }

    // Update timing
    agent.state.lastDirectionChange += delta;
    
    // Change direction when duration elapsed
    if (agent.state.lastDirectionChange > agent.state.moveDuration) {
      // Langton's Ant turns right when on white, left when on black
      // We'll simulate this with random left/right turns
      const turnDirection = Math.random() > 0.5 ? 1 : -1;
      agent.state.currentDirection += turnDirection * agent.state.turnAngle;
      agent.state.lastDirectionChange = 0;
      agent.state.moveDuration = 1000 + Math.random() * 2000;
      
      // Optional: Add some randomness to turn angle
      agent.state.turnAngle = Math.PI / 2 + (Math.random() - 0.5) * Math.PI / 4;
    }

    // Apply movement through physics body
    const physical = game.components.SP_PhysicalComponent.get(agent.entity.eid);
    if (physical) {
      // Set angle first
      physical.body.setAngle(agent.state.currentDirection);
      
      // Then move forward
      physical.move(delta);
      
      // Update FloatMovingComponent to reflect desired movement
      const floatMoving = game.components.FloatMovingComponent.get(agent.entity.eid);
      if (floatMoving) {
        // Use the physical component's speed to drive movement
        floatMoving.dx = Math.cos(agent.state.currentDirection) * physical.speed / 1000; // units per ms
        floatMoving.dy = Math.sin(agent.state.currentDirection) * physical.speed / 1000; // units per ms
      }
    }
  }
};

export default explorationBehaviors;
