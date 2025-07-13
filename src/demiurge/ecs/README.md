ECS - Entity Component System

EID is Entity ID. Unique to each Entity.

Entities are stored as EIDs in a Map, which points to an array of strings which is the prototype chain of the EntityComponent from which it was created.

Components are slices of functionality. Components represent things like movement (FloatMovement and TankMovement) or physicality (SP_PhysicalComponent). Components are applied to entities and they determine the behavior of the entity within the System.

Components are stored in Store. The most common type of Store is a MapStore, mapping an EID to a component, but there are other types of stores, like 2d stores. MapStores, because of their nature, can only represent an entity once. Example: src/spacetrash/ECS/Components/v4/TankMovingComponent.ts

EntityComponents are classes used to create Components before populating the ECS. Their main function is to guard against "illegal" combinations of components. After the ECS is running, the EntityComponents are discarded. Example: src/spacetrash/ECS/EntityComponents/bots/AiBot.ts

Stores must be registered with the application. Do so here: src/spacetrash/Game/3-WithStores.ts