## Game Terrain Documentation

#### Tile System

A tile is the basic unit of measurement in the game's grid system.
Each tile represents a square space that can be occupied by game elements (player, objects, etc.).

#### Tile Properties

- Size: Each tile is 42 units square (defined in `GAME_CONSTANTS.tileSize`)
- Position: Tiles are positioned using a grid coordinate system where:
  - X-axis represents horizontal position (left to right)
  - Y-axis represents vertical position (bottom to top)
  - Z-axis represents height/elevation
- Max Tile Index & Min Tile Index, represent the boundaries of the grid system.
  - [-8, 8] (defined in `GAME_CONSTANTS.maxTileIndex` and `GAME_CONSTANTS.minTileIndex`)

#### Row System

- Row Dimensions
  Each row in the game consists of three sections:
  - Left Section: Extended terrain
  - Middle Section: Main playable area
  - Right Section: Extended terrain

#### Row Types

**1. Grass Row: Basic terrain type**

- Forest Row: Grass terrain with obstacles
- Road Row: Different terrain type

**2. Forest Row: Grass terrain with obstacles**

- Contains trees and potential rewards
- Generated randomly after starting area

**3. Road Row: Different terrain type**

- Special variant for different gameplay mechanics
- Generated randomly after starting area

```
Left Section | Middle Section (Playable Area) | Right Section
[Gray Area]  |     [Light Gray Area]          | [Gray Area]
← 714 units →|        714 units               |→ 714 units
```

#### Row Generation

- 50 rows are generated at the start of the game
