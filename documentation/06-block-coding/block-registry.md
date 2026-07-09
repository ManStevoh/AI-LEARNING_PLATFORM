# Block Registry

Living document. **Add or update a row before implementing a block.**

Legend: `done` | `partial` | `planned` | `n/a` (ACE intentionally skips Scratch equivalent)

## Events

| Block ID | Label (learner) | Scratch equivalent | Generator | Runtime | Phase | Status |
|----------|-----------------|--------------------|-----------|---------|-------|--------|
| `ace_event_green_flag` | when green flag clicked | when green flag clicked | yes | yes | 0 | done |
| `ace_event_key_pressed` | when key pressed | when key pressed | yes | yes | 1 | done |
| `ace_event_sprite_clicked` | when this sprite clicked | when this sprite clicked | yes | yes | 1 | done |
| `ace_event_broadcast` | broadcast | broadcast | yes | yes | 1 | done |
| `ace_event_broadcast_received` | when I receive | when I receive | yes | yes | 1 | done |

## Motion

| Block ID | Label | Scratch equivalent | Generator | Runtime | Phase | Status |
|----------|-------|--------------------|-----------|---------|-------|--------|
| `ace_motion_move_steps` | move steps | move steps | yes | yes | 0 | done |
| `ace_motion_turn_degrees` | turn degrees | turn degrees | yes | yes | 0 | done |
| `ace_motion_go_to_xy` | go to x/y | go to x y | yes | yes | 0 | done |
| `ace_motion_glide` | glide | glide | planned | planned | 2 | planned |
| `ace_motion_point_direction` | point in direction | point in direction | planned | planned | 2 | planned |
| `ace_motion_bounce_edge` | bounce on edge | if on edge bounce | planned | planned | 2 | planned |

## Looks

| Block ID | Label | Scratch equivalent | Generator | Runtime | Phase | Status |
|----------|-------|--------------------|-----------|---------|-------|--------|
| `ace_looks_say` | say for seconds | say for seconds | yes | yes | 0 | done |
| `ace_looks_think` | think for seconds | think for seconds | yes | yes | 2 | done |
| `ace_looks_switch_costume` | switch costume | switch costume | yes | yes | 2 | partial |
| `ace_looks_show` | show | show | yes | yes | 2 | done |
| `ace_looks_hide` | hide | hide | yes | yes | 2 | done |
| `ace_looks_set_size` | set size | set size | yes | yes | 2 | done |
| `ace_looks_set_backdrop` | switch backdrop | switch backdrop | yes | yes | 2 | partial |

## Control (ACE-specific wrappers)

| Block ID | Label | Scratch equivalent | Generator | Runtime | Phase | Status |
|----------|-------|--------------------|-----------|---------|-------|--------|
| `ace_control_wait` | wait seconds | wait | yes | yes | 1 | done |
| `ace_control_stop` | stop all / this script | stop | yes | yes | 1 | done |
| Blockly `controls_*` | repeat, if, etc. | control | yes | partial | 1 | partial |

## Variables

| Source | Label | Scratch equivalent | Phase | Status |
|--------|-------|--------------------|-------|--------|
| Blockly `VARIABLE` category | set / change / get | variables | 1 | partial |

## Sound

| Block ID | Label | Scratch equivalent | Generator | Runtime | Phase | Status |
|----------|-------|--------------------|-----------|---------|-------|--------|
| `ace_sound_play` | play sound | play sound | yes | yes | 2 | done |
| `ace_sound_stop_all` | stop all sounds | stop all sounds | yes | yes | 2 | done |
| `ace_sound_set_volume` | set volume to | change volume by / set volume | yes | yes | 2 | partial |

## Sensing, Procedures, ACE-only

See [block-taxonomy-and-custom-blocks.md](./block-taxonomy-and-custom-blocks.md) and [scratch-parity-and-custom-engine-strategy.md](./scratch-parity-and-custom-engine-strategy.md). Rows to be added as phases are scheduled.

## ACE-only (future)

| Block ID | Purpose | Phase | Status |
|----------|---------|-------|--------|
| `ace_ai_explain` | AI mentor: explain selection | 4 | planned |
| `ace_curriculum_checkpoint` | Mark lesson step complete | 4 | planned |
| `ace_robot_read_sensor` | Simulated sensor read | 4 | planned |

---

**Implementation files**

- Block definitions: `application/resources/js/Modules/BlockCoding/aceBlocks.js`
- Toolbox: `application/resources/js/Modules/BlockCoding/levelOneToolbox.js`
- Runtime: `application/resources/js/Modules/BlockCoding/stageRuntime.js`
