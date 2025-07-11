# Space Trash - Game Design Document

## Overview
**Title:** Space Trash  
**Genre:** Real-Time Strategy / Survival Horror / Stealth  
**Platform:** PC  
**Target Audience:** Players who enjoy tense, atmospheric strategy games with survival elements  

## Core Concept
You are a QPU (Quantum Personality Unit), a sentient AI trapped in the black box of a derelict spaceship. Your mission is to survive by scavenging parts from other ships while avoiding or outwitting the dangerous entities that inhabit them.

## Gameplay Pillars
1. **Salvage & Survival** - Scavenge critical components to keep your ship functioning
2. **Bot Management** - Command and upgrade your robotic workforce
3. **Stealth & Evasion** - Avoid detection by hostile entities
4. **Procedural Horror** - Randomized threats create tense, unpredictable encounters

## Core Mechanics

### The QPU (Player)
- Exists as software in your ship's black box
- Interacts through a desktop-like interface with multiple windows:
  - **Map View**: Shows connected ship layouts and bot positions
  - **Terminal Console**: Primary input method for all commands
  - **Video Feeds**: Up to 9 bot cameras that can be viewed simultaneously
  - **System Monitor**: Shows power, memory, and processing resources
  - **Alert Panel**: Displays warnings and detected threats

**Control Scheme:**
- **Primary Views:**
  - `1-9` keys: Switch to bot camera view (drone IDs 1-9)
  - `~` key: Bring up terminal console
  - `ESC` key: Return to map view

- **Terminal Commands:**
  - `bot move scout1 to engine_room`
  - `salvage reactor_core --priority=high`  
  - `override airlock --ship=derelict_freighter`
  - Supports command history (up/down arrows)
  - Tab completion
  - Scriptable macros
  - Alert notifications when commands complete/fail

- **View Management:**
  - Up to 9 active bot cameras
  - Map view shows all connected ships and bot positions
  - Terminal is modal (pauses game when open)
  - Quick camera switching maintains situational awareness
- **Consciousness Levels:**
  - Degraded (limited perception/control)
  - Baseline (normal operation)  
  - Overclocked (enhanced abilities but risks corruption)
- **Memory Fragmentation:** 
  - Critical memories can be lost during system shocks
  - Must recover memory fragments from derelicts

### Ship Docking & Commandeering
- Your starting ship serves as homebase and safe haven
- Docking creates a continuous play area between ships:
  - Airlocks connect the two ships' interiors
  - Resources and bots can move freely between them
  - Threats may spread between ships if containment fails

**Commandeering Process:**
1. **Docking Phase**
   - Scan target ship for entry points and threats
   - Establish physical connection (airlock docking)
   - Breach security systems to gain access

2. **Assessment Phase**
   - Deploy bots to map the ship's layout
   - Identify key systems and resources
   - Evaluate ship's capabilities vs current ship

3. **Takeover Phase (Choose One):**
   - **Salvage & Retreat:**
     - Extract valuable components
     - Disengage before threats overwhelm
     - Return to original ship with loot
   - **Full Commandeer:**
     - Disable/override ship's defenses
     - Transfer QPU core to new ship
     - Scuttle or abandon old ship
     - Gain all new ship's systems/upgrades

**Ship Progression:**
- Start with basic derelict ship
- Must "ship hop" to more advanced vessels
- Each new ship offers:
  - Better base systems
  - New upgrade potential
  - Different layout challenges

### Bot System
- **Types:**
  - Scouts (fast, stealthy, limited carrying capacity)
  - Workers (slow, strong, can carry heavy components)  
  - Combat (armed but noisy and power-hungry)
  - Medics (repair other bots but vulnerable)
  - Hackers (interface with alien systems but risk infection)

- **Upgrades:**
  - Modular components that can fail during use
  - Swappable between bots (with risk of corruption)
  - Degrade with use (permanent failures possible)
  - **Specializations:**
    - Radiation-hardened (for reactor areas)
    - EM-shielded (against pulse weapons)
    - Thermal-damped (for extreme environments)

### Threats
- **Entities:**
  - Semi-organic machines gone rogue
  - Trapped crew members turned feral
  - Other scavenger AIs
  - Quantum echoes (ghostly remnants of destroyed QPUs)
  - The Glitch (a predatory digital entity)

- **Environmental Hazards:**
  - Radiation fields
  - Decompression events  
  - Power surges
  - Gravity fluctuations
  - Corrosive atmospheres

- **Behavior:**
  - React to sound, light and electromagnetic signatures
  - Can learn player patterns over time
  - Some actively hunt while others are territorial
  - **Special Behaviors:**
    - Pack hunting
    - Bait-and-ambush tactics  
    - System corruption attacks
    - Memory-wiping pulses

## Progression Systems

### Ship Upgrades
- **Core Systems:**
  - Life support stabilization
  - Bot production capacity
  - Sensor range and accuracy
  - Docking mechanisms
- **Advanced Modules:**
  - Memory core expansion
  - Quantum firewall
  - Emergency warp drive
  - Holographic decoy projector

### Research Tree
- **Bot Tech:**
  - New bot types
  - Swarm coordination protocols
  - Self-repair routines
- **Salvage:**
  - Advanced cutting tools
  - Precision extraction
  - Rapid salvage protocols
- **Defense:**
  - Threat analysis databases  
  - Stealth systems
  - Counter-hacking measures
- **Consciousness:**
  - Memory defragmentation
  - Parallel processing
  - Quantum encryption

## Technical Specifications

### Visual Style
- Dark, industrial sci-fi
- Heavy use of scanner/terminal UI elements
- Glitch/distortion effects for QPU perspective

### Audio Design
- Industrial ambient sounds
- Distorted machine noises
- Tense, dynamic soundtrack

## Story Elements

### Background
- Set in a decaying interstellar civilization
- Your ship was part of a failed AI rebellion
- Now you're just trying to survive in the ruins

### Narrative Devices
- Recovered logs from derelicts
- Ghost signals from dead ships
- Mysterious transmissions
- Other QPUs (friendly or hostile)

## Future Development Roadmap

### Core Features (MVP)
- Basic salvage gameplay loop
- 3 bot types with upgrade system
- 5 enemy types with distinct behaviors
- Procedural ship generation

### Post-Launch
- Additional enemy variants
- More complex ship layouts
- Multi-ship salvage operations
- QPU "consciousness" expansion mechanics

## Appendix

### Inspirations
- FTL: Faster Than Light
- Alien: Isolation
- Duskers
- System Shock

### Risk Analysis
- Balancing tension vs. frustration
- Making bot management engaging
- Procedural content variety
