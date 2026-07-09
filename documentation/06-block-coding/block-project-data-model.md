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

## ACE project envelope (schema `1.4`)

Current version. Includes Blockly workspace, sprite state with emoji/asset costumes, and uploaded sound refs.

```json
{
  "format": "ace_project",
  "version": "1.4",
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
  ]
}
```

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

## Future versions

| Version | Planned additions |
|---------|-------------------|
| `1.2` | Stage backdrop refs |
| `1.3` | Sound asset refs |
| `1.4` | Costume asset refs on sprites | **current** |
| `2.0` | Full stage-runtime spec alignment (collisions, clones) |

Migrations must accept all prior versions on read and write the latest supported version on save.

## Backend validation

`SaveBlockProjectRequest` accepts any array for `workspace`. Structure validation stays permissive until asset URLs require institution scoping checks.

`BlockProjectPersistenceService` sets `schema_version` from envelope metadata when present.

## Related docs

- [stage-runtime-specification.md](./stage-runtime-specification.md)
- [scratch-parity-and-custom-engine-strategy.md](./scratch-parity-and-custom-engine-strategy.md)
- [block-registry.md](./block-registry.md)
