# Block Project Data Model

## Purpose

Define the JSON saved in `block_projects.workspace` so Blockly scripts, sprite state, and future assets stay versioned and backward compatible.

## Storage

| Column | Type | Notes |
|--------|------|-------|
| `schema_version` | string | Top-level mirror of envelope `version` when present |
| `workspace` | JSON | Blockly-only (legacy) or ACE project envelope |
| `generated_code` | text | JavaScript snapshot for teacher review and Level 2 transition |

## Legacy format (schema `1.0`)

Raw Blockly serialization only:

```json
{
  "blocks": {
    "languageVersion": 0,
    "blocks": []
  }
}
```

Loaders detect legacy format when `format` is absent.

## ACE project envelope (schema `2.4`)

Current version. Adds persisted curriculum checkpoint keys on top of v2.3.

```json
{
  "format": "ace_project",
  "version": "2.4",
  "checkpoints": ["intro-blocks", "first-animation"],
  "stage": {
    "backdrops": [{ "id": "backdrop-1", "name": "blue sky", "color": "#dbeafe" }],
    "backdropIndex": 0,
    "video": {
      "state": "on",
      "transparency": 50
    }
  }
}
```

`checkpoints` is an array of step keys the learner marked complete in the project. The `ace_curriculum_checkpoint` block also POSTs to `POST /learner/learn/{lessonSlug}/checkpoints` for server-side teacher visibility (`learner_lesson_checkpoints` table).

## ACE project envelope (schema `2.3`)

Adds persisted webcam video sensing state on top of v2.2.

```json
{
  "format": "ace_project",
  "version": "2.3",
  "stage": {
    "backdrops": [{ "id": "backdrop-1", "name": "blue sky", "color": "#dbeafe" }],
    "backdropIndex": 0,
    "stamps": [
      {
        "spriteId": "sprite-1",
        "x": 40,
        "y": 20,
        "direction": 135,
        "size": 80,
        "costume": "🐱",
        "layer": 2
      }
    ],
    "video": {
      "state": "on-flipped",
      "transparency": 25
    }
  }
}
```

`stage.video.state` is one of `on`, `off`, `on-flipped`, or `off-flipped`. `stage.video.transparency` is 0–100 (Scratch parity: 100 = fully transparent overlay, 0 = opaque). Video frames are processed locally in the browser; nothing is uploaded.

## ACE project envelope (schema `2.2`)

Adds persisted pen costume stamps on top of v2.1.

```json
{
  "format": "ace_project",
  "version": "2.2",
  "stage": {
    "backdrops": [{ "id": "backdrop-1", "name": "blue sky", "color": "#dbeafe" }],
    "backdropIndex": 0,
    "penTrails": [
      {
        "x1": 0,
        "y1": 0,
        "x2": 40,
        "y2": 20,
        "color": "#ff0000",
        "size": 4,
        "spriteId": "sprite-1"
      }
    ],
    "stamps": [
      {
        "spriteId": "sprite-1",
        "x": 40,
        "y": 20,
        "direction": 135,
        "size": 80,
        "costume": "🐱",
        "layer": 2
      }
    ]
  }
}
```

Stamp entries capture the active sprite's costume, position, direction, size, and layer at stamp time. `erase all` (`ace_pen_clear`) clears both `penTrails` and `stamps`. Stamps persist across green-flag resets (same as pen trails).

## ACE project envelope (schema `2.1`)

Adds persisted pen trail segments on top of v2.0.

```json
{
  "format": "ace_project",
  "version": "2.1",
  "stage": {
    "backdrops": [{ "id": "backdrop-1", "name": "blue sky", "color": "#dbeafe" }],
    "backdropIndex": 0,
    "penTrails": [
      {
        "x1": 0,
        "y1": 0,
        "x2": 40,
        "y2": 20,
        "color": "#ff0000",
        "size": 4,
        "spriteId": "sprite-1"
      }
    ]
  }
}
```

## ACE project envelope (schema `2.0`)

Adds AI-generated backdrop refs (tenant-scoped SVG assets + theme metadata) on top of v1.9.

```json
{
  "format": "ace_project",
  "version": "2.0",
  "stage": {
    "backdrops": [
      {
        "type": "ai",
        "id": "backdrop-ai-1",
        "asset_uuid": "…",
        "theme": "ocean",
        "request_id": "…",
        "name": "AI Ocean",
        "color": "#4fc3f7"
      }
    ],
    "backdropIndex": 0
  }
}
```

## ACE project envelope (schema `1.9`)

Adds Blockly variable/list stage monitor refs on top of v1.8.

```json
{
  "format": "ace_project",
  "version": "1.9",
  "monitors": [
    { "id": "var:score-var", "label": "score", "visible": true, "x": 16, "y": 20 },
    { "id": "list:length:items-var", "label": "length of items", "visible": true, "x": 16, "y": 54 }
  ]
}
```

## ACE project envelope (schema `1.8`)

Adds platform sprite/costume library refs on top of v1.7.

```json
{
  "format": "ace_project",
  "version": "1.8",
  "sprites": [
    {
      "id": "sprite-2",
      "name": "Owl",
      "costumes": [
        {
          "type": "library",
          "library_id": "ace-owl",
          "name": "Owl",
          "emoji": "🦉"
        }
      ],
      "costumeIndex": 0
    }
  ],
  "active_sprite_id": "sprite-2"
}
```

## ACE project envelope (schema `1.7`)

Adds platform backdrop library refs and procedural surprise backdrops on top of v1.6.

```json
{
  "format": "ace_project",
  "version": "1.7",
  "stage": {
    "backdrops": [
      {
        "type": "library",
        "id": "backdrop-lib-desert-dunes",
        "library_id": "desert-dunes",
        "name": "Desert Dunes",
        "color": "#f6c56b"
      },
      {
        "type": "procedural",
        "id": "backdrop-proc-424242",
        "seed": 424242,
        "name": "Surprise 242",
        "color": "#dbeafe"
      }
    ],
    "backdropIndex": 0
  }
}
```

### Envelope `1.6` (legacy)

Includes Blockly workspace, sprite costumes, uploaded sounds, stage backdrop refs, and stage reporter monitors.

```json
{
  "format": "ace_project",
  "version": "1.6",
  "blockly": { "blocks": { "languageVersion": 0, "blocks": [] } },
  "sprites": [],
  "active_sprite_id": "sprite-1",
  "sounds": [],
  "stage": {
    "backdrops": [{ "id": "backdrop-1", "name": "blue sky", "color": "#dbeafe" }],
    "backdropIndex": 0
  },
  "monitors": [
    { "id": "x_position", "visible": true, "x": 8, "y": 8 },
    { "id": "timer", "visible": true, "x": 8, "y": 42 }
  ]
}
```

### Envelope `1.5` (legacy)

Includes Blockly workspace, sprite costumes, uploaded sounds, and stage backdrop refs (color presets or uploaded images).

```json
{
  "format": "ace_project",
  "version": "1.5",
  "blockly": {
    "blocks": {
      "languageVersion": 0,
      "blocks": []
    }
  },
  "sprites": [
    {
      "id": "sprite-1",
      "name": "Sprite1",
      "x": 0,
      "y": 0,
      "direction": 90,
      "visible": true,
      "emoji": "🖼️",
      "costumes": [
        "🐱",
        {
          "type": "asset",
          "asset_uuid": "550e8400-e29b-41d4-a716-446655440001",
          "name": "Hero",
          "emoji": "🖼️"
        }
      ],
      "costumeIndex": 1
    }
  ],
  "active_sprite_id": "sprite-1",
  "sounds": [
    {
      "id": "sound-1",
      "name": "Meow",
      "asset_uuid": "550e8400-e29b-41d4-a716-446655440000"
    }
  ],
  "stage": {
    "backdrops": [
      {
        "id": "backdrop-1",
        "name": "blue sky",
        "color": "#dbeafe"
      },
      {
        "type": "asset",
        "id": "backdrop-asset-1",
        "asset_uuid": "550e8400-e29b-41d4-a716-446655440002",
        "name": "Park",
        "color": "#e5e7eb"
      }
    ],
    "backdropIndex": 1
  }
}
```

### Envelope `1.4` (legacy)

Same as above without `stage.backdrops` asset refs (color-only stage defaults still work via runtime).

### Envelope `1.3` (legacy)

Same as above with sound refs; costumes may still be emoji strings only.

### Envelope `1.1` (legacy)

Same as above without the `sounds` array.

```json
{
  "format": "ace_project",
  "version": "1.1",
  "blockly": {
    "blocks": {
      "languageVersion": 0,
      "blocks": []
    }
  },
  "sprites": [
    {
      "id": "sprite-1",
      "name": "Sprite1",
      "x": 0,
      "y": 0,
      "direction": 90,
      "visible": true,
      "emoji": "🐱"
    }
  ],
  "active_sprite_id": "sprite-1"
}
```

### Field rules

- `format` must be `ace_project` for envelope parsing.
- `blockly` is required and matches Blockly's workspace save output.
- `sprites` is optional but recommended once the learner moves a sprite.
- Persisted sprite fields exclude runtime-only state (`say`, speech bubbles).
- `active_sprite_id` must reference a sprite in `sprites` when both are present.

## Client helpers

- `projectEnvelope.js` — build, parse, migrate detection
- `projectPersistence.js` — Blockly load/save through envelope extractors

## Version history

| Version | Additions | Status |
|---------|-----------|--------|
| `1.2` | Stage backdrop color refs (planned early; superseded) | legacy |
| `1.3` | Sound asset refs | legacy |
| `1.4` | Costume asset refs on sprites | legacy |
| `1.5` | Stage backdrop asset refs | legacy |
| `1.6` | Stage reporter monitors | legacy |
| `1.7` | Platform backdrop library + procedural backdrops | legacy |
| `1.8` | Platform sprite/costume library refs | legacy |
| `1.9` | Blockly variable/list stage monitors | legacy |
| `2.0` | AI-generated backdrop refs | legacy |
| `2.1` | Pen trail segments on stage | legacy |
| `2.2` | Pen costume stamps on stage | legacy |
| `2.3` | Stage video sensing state (`state`, `transparency`) | **current** |

Migrations must accept all prior versions on read and write the latest supported version on save.

## Backend validation

`SaveBlockProjectRequest` accepts any array for `workspace`. Structure validation stays permissive until asset URLs require institution scoping checks.

`BlockProjectPersistenceService` sets `schema_version` from envelope metadata when present.

## Related docs

- [stage-runtime-specification.md](./stage-runtime-specification.md)
- [scratch-parity-and-custom-engine-strategy.md](./scratch-parity-and-custom-engine-strategy.md)
- [block-registry.md](./block-registry.md)
