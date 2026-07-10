# Block Registry

Living document. **Add or update a row before implementing a block.**

Legend: `done` | `partial` | `planned` | `n/a` (ACE intentionally skips Scratch equivalent)

## Events

| Block ID | Label (learner) | Scratch equivalent | Generator | Runtime | Phase | Status |
|----------|-----------------|--------------------|-----------|---------|-------|--------|
| `ace_event_green_flag` | when green flag clicked | when green flag clicked | yes | yes | 0 | done |
| `ace_event_key_pressed` | when key pressed | when key pressed | yes | yes | 1 | done |
| `ace_event_sprite_clicked` | when this sprite clicked | when this sprite clicked | yes | yes | 1 | done |
| `ace_event_backdrop_switches` | when backdrop switches to | when backdrop switches to | yes | yes | 2 | done |
| `ace_event_greater_than` | when loudness/timer > | when loudness > | yes | yes | 2 | done |
| `ace_event_broadcast` | broadcast | broadcast | yes | yes | 1 | done |
| `ace_event_broadcast_and_wait` | broadcast and wait | broadcast and wait | yes | yes | 2 | done |
| `ace_event_broadcast_received` | when I receive | when I receive | yes | yes | 1 | done |

## Motion

| Block ID | Label | Scratch equivalent | Generator | Runtime | Phase | Status |
|----------|-------|--------------------|-----------|---------|-------|--------|
| `ace_motion_move_steps` | move steps | move steps | yes | yes | 0 | done |
| `ace_motion_turn_degrees` | turn right degrees | turn clockwise | yes | yes | 0 | done |
| `ace_motion_turn_left` | turn left degrees | turn counter-clockwise | yes | yes | 2 | done |
| `ace_motion_go_to_target` | go to random/mouse | go to | yes | yes | 2 | done |
| `ace_motion_go_to_xy` | go to x/y | go to x y | yes | yes | 0 | done |
| `ace_motion_glide_to_target` | glide to random/mouse | glide to | yes | yes | 2 | done |
| `ace_motion_glide` | glide to x/y | glide to x y | yes | yes | 2 | done |
| `ace_motion_point_direction` | point in direction | point in direction | yes | yes | 2 | done |
| `ace_motion_point_towards` | point towards | point towards | yes | yes | 2 | done |
| `ace_motion_change_x` | change x by | change x by | yes | yes | 2 | done |
| `ace_motion_set_x` | set x to | set x to | yes | yes | 2 | done |
| `ace_motion_change_y` | change y by | change y by | yes | yes | 2 | done |
| `ace_motion_set_y` | set y to | set y to | yes | yes | 2 | done |
| `ace_motion_bounce_edge` | if on edge bounce | if on edge bounce | yes | yes | 2 | done |
| `ace_motion_set_rotation_style` | set rotation style | set rotation style | yes | yes | 2 | done |
| `ace_motion_x_position` | x position | x position | yes | yes | 2 | done |
| `ace_motion_y_position` | y position | y position | yes | yes | 2 | done |
| `ace_motion_direction` | direction | direction | yes | yes | 2 | done |

## Looks

| Block ID | Label | Scratch equivalent | Generator | Runtime | Phase | Status |
|----------|-------|--------------------|-----------|---------|-------|--------|
| `ace_looks_say` | say for seconds | say for seconds | yes | yes | 0 | done |
| `ace_looks_say_until` | say | say | yes | yes | 2 | done |
| `ace_looks_think` | think for seconds | think for seconds | yes | yes | 2 | done |
| `ace_looks_think_until` | think | think | yes | yes | 2 | done |
| `ace_looks_switch_costume` | switch costume | switch costume | yes | yes | 2 | done |
| `ace_looks_next_costume` | next costume | next costume | yes | yes | 2 | done |
| `ace_looks_set_backdrop` | switch backdrop | switch backdrop | yes | yes | 2 | done |
| `ace_looks_next_backdrop` | next backdrop | next backdrop | yes | yes | 2 | done |
| `ace_looks_change_size` | change size by | change size by | yes | yes | 2 | done |
| `ace_looks_set_size` | set size | set size | yes | yes | 2 | done |
| `ace_looks_change_effect` | change effect by | change effect by | yes | yes | 2 | done |
| `ace_looks_set_effect` | set effect to | set effect to | yes | yes | 2 | done |
| `ace_looks_clear_effects` | clear graphic effects | clear graphic effects | yes | yes | 2 | done |
| `ace_looks_show` | show | show | yes | yes | 2 | done |
| `ace_looks_hide` | hide | hide | yes | yes | 2 | done |
| `ace_looks_go_to_layer` | go to front/back layer | go to layer | yes | yes | 2 | done |
| `ace_looks_go_layers` | go forward/backward layers | go layers | yes | yes | 2 | done |
| `ace_looks_costume` | costume number/name | costume | yes | yes | 2 | done |
| `ace_looks_backdrop` | backdrop number/name | backdrop | yes | yes | 2 | done |
| `ace_looks_size` | size | size | yes | yes | 2 | done |

## Control

| Block ID | Label | Scratch equivalent | Generator | Runtime | Phase | Status |
|----------|-------|--------------------|-----------|---------|-------|--------|
| `ace_control_wait` | wait seconds | wait | yes | yes | 1 | done |
| `ace_control_wait_until` | wait until | wait until | yes | yes | 2 | done |
| `ace_control_forever` | forever | forever | yes | yes | 2 | done |
| `ace_control_stop` | stop all / this script | stop | yes | yes | 1 | done |
| Blockly `controls_repeat_ext` | repeat | repeat | yes | yes | 1 | done |
| Blockly `controls_whileUntil` | repeat until | repeat until | yes | yes | 1 | done |
| Blockly `controls_if` / `controls_ifelse` | if / if else | if / if else | yes | yes | 1 | done |
| `ace_control_clone_start` | when I start as a clone | when I start as a clone | yes | yes | 3 | done |
| `ace_control_create_clone` | create clone of | create clone of | yes | yes | 3 | done |
| `ace_control_delete_clone` | delete this clone | delete this clone | yes | yes | 3 | done |

## Sound

| Block ID | Label | Scratch equivalent | Generator | Runtime | Phase | Status |
|----------|-------|--------------------|-----------|---------|-------|--------|
| `ace_sound_play` | start sound | start sound | yes | yes | 2 | done |
| `ace_sound_play_until_done` | play sound until done | play sound until done | yes | yes | 2 | done |
| `ace_sound_stop_all` | stop all sounds | stop all sounds | yes | yes | 2 | done |
| `ace_sound_change_effect` | change pitch/pan by | change sound effect | yes | yes | 2 | done |
| `ace_sound_set_effect` | set pitch/pan to | set sound effect | yes | yes | 2 | done |
| `ace_sound_clear_effects` | clear sound effects | clear sound effects | yes | yes | 2 | done |
| `ace_sound_change_volume` | change volume by | change volume by | yes | yes | 2 | done |
| `ace_sound_set_volume` | set volume to | set volume to | yes | yes | 2 | done |
| `ace_sound_volume` | volume | volume | yes | yes | 2 | done |

## Sensing

| Block ID | Label | Scratch equivalent | Generator | Runtime | Phase | Status |
|----------|-------|--------------------|-----------|---------|-------|--------|
| `ace_sensing_touching` | touching edge / mouse-pointer | touching | yes | yes | 2–3 | done |
| `ace_sensing_touching_color` | touching color | touching color | yes | yes | 3 | done |
| `ace_sensing_color_touching` | color is touching | color is touching | yes | yes | 3 | done |
| `ace_sensing_distance` | distance to | distance to | yes | yes | 3 | done |
| `ace_sensing_ask` | ask and wait | ask and wait | yes | yes | 3 | done |
| `ace_sensing_answer` | answer | answer | yes | yes | 3 | done |
| `ace_sensing_key_pressed` | key pressed? | key pressed | yes | yes | 2–3 | done |
| `ace_sensing_mouse_down` | mouse down? | mouse down | yes | yes | 3 | done |
| `ace_sensing_mouse_x` | mouse x | mouse x | yes | yes | 2–3 | done |
| `ace_sensing_mouse_y` | mouse y | mouse y | yes | yes | 2–3 | done |
| `ace_sensing_set_drag_mode` | set drag mode | set drag mode | yes | yes | 3 | done |
| `ace_sensing_loudness` | loudness | loudness | yes | stub | 3 | partial |
| `ace_sensing_timer` | timer | timer | yes | yes | 2–3 | done |
| `ace_sensing_reset_timer` | reset timer | reset timer | yes | yes | 3 | done |
| `ace_sensing_current` | current [year…] | current | yes | yes | 3 | done |
| `ace_sensing_username` | username | username | yes | yes | 3 | done |
| `ace_sensing_online` | online? | online | yes | yes | 3 | done |

## Operators

| Source | Label | Scratch equivalent | Phase | Status |
|--------|-------|--------------------|-------|--------|
| Blockly math/logic/text | + − × ÷, random, compare, and/or/not, join, letter of, length, contains, mod, round, abs | Operators | 1–3 | done |

## Variables

| Source | Label | Scratch equivalent | Phase | Status |
|--------|-------|--------------------|-------|--------|
| Blockly `VARIABLE` category | set / change / get | variables | 1 | done |

## Lists

| Source | Label | Scratch equivalent | Phase | Status |
|--------|-------|--------------------|-------|--------|
| Blockly static list blocks | create / length / get / set / … | lists | 3 | done |

## My Blocks

| Source | Label | Scratch equivalent | Phase | Status |
|--------|-------|--------------------|-------|--------|
| Blockly `PROCEDURE` category | define / call | My Blocks | 3 | done |

## Stage monitors

| Monitor ID | Reporter block | Status |
|------------|----------------|--------|
| `x_position` / `y_position` / `direction` | Motion reporters | done |
| `size` / `costume_number` / `backdrop_number` | Looks reporters | done |
| `volume` | Sound volume | done |
| `mouse_x` / `mouse_y` / `timer` / `loudness` / `answer` | Sensing reporters | done |
| Variable / list monitors | Blockly variables/lists | planned |

## Backdrop assets

| Source | Description | Status |
|--------|-------------|--------|
| Color presets | Solid fills | done |
| ACE library | 25 platform SVG backdrops, categorized + searchable | done |
| Uploads | Tenant-scoped learner images | done |
| Procedural | Seed-based unique SVG surprise backdrops | done |
| AI-generated | Child-safe prompts via AI Gateway | planned |

## Not in this slice (later)

| Item | Reason |
|------|--------|
| Scratch-style dynamic “Make a List” | Blockly 13 has no `listsDynamic`; static list blocks used |
| Microphone loudness | Stub until media permission path exists |
| Variable/list stage monitors | Blockly variable UI chrome |
| Video sensing / pen / extensions | Phase 3+ |
| ACE-only AI / robotics blocks | Phase 4 |

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
- Smoke: `application/resources/js/Modules/BlockCoding/stageRuntime.smoke.mjs`
