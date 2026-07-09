export function getLevelOneToolbox(preset = 'level_1_default') {
    void preset;

    return {
        kind: 'categoryToolbox',
        contents: [
            {
                kind: 'category',
                name: 'Events',
                categorystyle: 'event_category',
                contents: [
                    { kind: 'block', type: 'ace_event_green_flag' },
                    {
                        kind: 'block',
                        type: 'ace_event_key_pressed',
                    },
                    {
                        kind: 'block',
                        type: 'ace_event_broadcast',
                        inputs: {
                            MESSAGE: { shadow: { type: 'text', fields: { TEXT: 'message1' } } },
                        },
                    },
                    { kind: 'block', type: 'ace_event_broadcast_received' },
                    { kind: 'block', type: 'ace_event_sprite_clicked' },
                ],
            },
            {
                kind: 'category',
                name: 'Motion',
                categorystyle: 'motion_category',
                contents: [
                    {
                        kind: 'block',
                        type: 'ace_motion_move_steps',
                        inputs: { STEPS: { shadow: { type: 'math_number', fields: { NUM: 10 } } } },
                    },
                    {
                        kind: 'block',
                        type: 'ace_motion_turn_degrees',
                        inputs: { DEGREES: { shadow: { type: 'math_number', fields: { NUM: 15 } } } },
                    },
                    {
                        kind: 'block',
                        type: 'ace_motion_go_to_xy',
                        inputs: {
                            X: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                            Y: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                        },
                    },
                    {
                        kind: 'block',
                        type: 'ace_motion_glide',
                        inputs: {
                            SECONDS: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
                            X: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                            Y: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                        },
                    },
                    {
                        kind: 'block',
                        type: 'ace_motion_point_direction',
                        inputs: { DIRECTION: { shadow: { type: 'math_number', fields: { NUM: 90 } } } },
                    },
                    { kind: 'block', type: 'ace_motion_bounce_edge' },
                ],
            },
            {
                kind: 'category',
                name: 'Looks',
                categorystyle: 'looks_category',
                contents: [
                    {
                        kind: 'block',
                        type: 'ace_looks_say',
                        inputs: {
                            MESSAGE: { shadow: { type: 'text', fields: { TEXT: 'Hello!' } } },
                            SECONDS: { shadow: { type: 'math_number', fields: { NUM: 2 } } },
                        },
                    },
                    {
                        kind: 'block',
                        type: 'ace_looks_think',
                        inputs: {
                            MESSAGE: { shadow: { type: 'text', fields: { TEXT: 'Hmm…' } } },
                            SECONDS: { shadow: { type: 'math_number', fields: { NUM: 2 } } },
                        },
                    },
                    { kind: 'block', type: 'ace_looks_show' },
                    { kind: 'block', type: 'ace_looks_hide' },
                    {
                        kind: 'block',
                        type: 'ace_looks_set_size',
                        inputs: { SIZE: { shadow: { type: 'math_number', fields: { NUM: 100 } } } },
                    },
                    {
                        kind: 'block',
                        type: 'ace_looks_switch_costume',
                        inputs: { INDEX: { shadow: { type: 'math_number', fields: { NUM: 1 } } } },
                    },
                    { kind: 'block', type: 'ace_looks_set_backdrop' },
                ],
            },
            {
                kind: 'category',
                name: 'Sound',
                categorystyle: 'sound_category',
                contents: [
                    { kind: 'block', type: 'ace_sound_play' },
                    { kind: 'block', type: 'ace_sound_stop_all' },
                    {
                        kind: 'block',
                        type: 'ace_sound_set_volume',
                        inputs: { VOLUME: { shadow: { type: 'math_number', fields: { NUM: 100 } } } },
                    },
                ],
            },
            {
                kind: 'category',
                name: 'Sensing',
                categorystyle: 'sensing_category',
                contents: [
                    { kind: 'block', type: 'ace_sensing_touching' },
                    { kind: 'block', type: 'ace_sensing_mouse_x' },
                    { kind: 'block', type: 'ace_sensing_mouse_y' },
                    { kind: 'block', type: 'ace_sensing_key_pressed' },
                    { kind: 'block', type: 'ace_sensing_timer' },
                ],
            },
            {
                kind: 'category',
                name: 'Control',
                categorystyle: 'control_category',
                contents: [
                    {
                        kind: 'block',
                        type: 'ace_control_wait',
                        inputs: { SECONDS: { shadow: { type: 'math_number', fields: { NUM: 1 } } } },
                    },
                    { kind: 'block', type: 'ace_control_stop' },
                    { kind: 'block', type: 'controls_repeat_ext' },
                    { kind: 'block', type: 'controls_whileUntil' },
                    { kind: 'block', type: 'controls_if' },
                    { kind: 'block', type: 'controls_ifelse' },
                    { kind: 'block', type: 'controls_flow_statements' },
                ],
            },
            {
                kind: 'category',
                name: 'Logic',
                categorystyle: 'operators_category',
                contents: [
                    { kind: 'block', type: 'logic_compare' },
                    { kind: 'block', type: 'logic_operation' },
                    { kind: 'block', type: 'logic_negate' },
                    { kind: 'block', type: 'logic_boolean' },
                ],
            },
            {
                kind: 'category',
                name: 'Math',
                categorystyle: 'math_category',
                contents: [
                    { kind: 'block', type: 'math_number' },
                    { kind: 'block', type: 'math_arithmetic' },
                    { kind: 'block', type: 'math_random_int' },
                ],
            },
            {
                kind: 'category',
                name: 'Text',
                categorystyle: 'text_category',
                contents: [
                    { kind: 'block', type: 'text' },
                    { kind: 'block', type: 'text_join' },
                    { kind: 'block', type: 'text_print' },
                ],
            },
            {
                kind: 'category',
                name: 'Variables',
                categorystyle: 'variable_category',
                custom: 'VARIABLE',
            },
        ],
    };
}
