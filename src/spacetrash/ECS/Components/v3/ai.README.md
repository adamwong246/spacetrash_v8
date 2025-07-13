# space trash AI architecture

Spacetrash features procedurally generated alien species who will try to stop you from scavenging their ship.

Each AiAgent is a component, which live in the AiAgentStore. During the loading phase, each AiAgent is called with method "load". During the main loop phase, for each tick, every AiAgent is called with method "tick". In this "tick" method, each AiAgent is afforded a chance to make a move, consistent with their motionComponent. Every AiAgent has an "explore pattern". Behavior patterns are not stores in the ECS- there is a limited set of Singleton functions, a set of curated algorithms for each type of behavior. At this moment, there is only 1 behavior pattern- Explore- and there is 1 incomplete implementations- langdonsAnt.