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
                    { kind: 'block', type: 'ace_event_key_pressed' },
                    { kind: 'block', type: 'ace_event_sprite_clicked' },
                    { kind: 'block', type: 'ace_event_backdrop_switches' },
                    {
                        kind: 'block',
                        type: 'ace_event_greater_than',
                        inputs: {
                            VALUE: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
                        },
                    },
                    {
                        kind: 'block',
                        type: 'ace_event_broadcast',
                        inputs: {
                            MESSAGE: { shadow: { type: 'text', fields: { TEXT: 'message1' } } },
                        },
                    },
                    {
                        kind: 'block',
                        type: 'ace_event_broadcast_and_wait',
                        inputs: {
                            MESSAGE: { shadow: { type: 'text', fields: { TEXT: 'message1' } } },
                        },
                    },
                    { kind: 'block', type: 'ace_event_broadcast_received' },
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
                        type: 'ace_motion_turn_left',
                        inputs: { DEGREES: { shadow: { type: 'math_number', fields: { NUM: 15 } } } },
                    },
                    { kind: 'block', type: 'ace_motion_go_to_target' },
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
                        type: 'ace_motion_glide_to_target',
                        inputs: {
                            SECONDS: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
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
                    { kind: 'block', type: 'ace_motion_point_towards' },
                    {
                        kind: 'block',
                        type: 'ace_motion_change_x',
                        inputs: { VALUE: { shadow: { type: 'math_number', fields: { NUM: 10 } } } },
                    },
                    {
                        kind: 'block',
                        type: 'ace_motion_set_x',
                        inputs: { VALUE: { shadow: { type: 'math_number', fields: { NUM: 0 } } } },
                    },
                    {
                        kind: 'block',
                        type: 'ace_motion_change_y',
                        inputs: { VALUE: { shadow: { type: 'math_number', fields: { NUM: 10 } } } },
                    },
                    {
                        kind: 'block',
                        type: 'ace_motion_set_y',
                        inputs: { VALUE: { shadow: { type: 'math_number', fields: { NUM: 0 } } } },
                    },
                    { kind: 'block', type: 'ace_motion_bounce_edge' },
                    { kind: 'block', type: 'ace_motion_set_rotation_style' },
                    { kind: 'block', type: 'ace_motion_x_position' },
                    { kind: 'block', type: 'ace_motion_y_position' },
                    { kind: 'block', type: 'ace_motion_direction' },
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
                        type: 'ace_looks_say_until',
                        inputs: {
                            MESSAGE: { shadow: { type: 'text', fields: { TEXT: 'Hello!' } } },
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
                    {
                        kind: 'block',
                        type: 'ace_looks_think_until',
                        inputs: {
                            MESSAGE: { shadow: { type: 'text', fields: { TEXT: 'Hmm…' } } },
                        },
                    },
                    {
                        kind: 'block',
                        type: 'ace_looks_switch_costume',
                        inputs: { INDEX: { shadow: { type: 'math_number', fields: { NUM: 1 } } } },
                    },
                    { kind: 'block', type: 'ace_looks_next_costume' },
                    { kind: 'block', type: 'ace_looks_set_backdrop' },
                    { kind: 'block', type: 'ace_looks_next_backdrop' },
                    {
                        kind: 'block',
                        type: 'ace_looks_change_size',
                        inputs: { SIZE: { shadow: { type: 'math_number', fields: { NUM: 10 } } } },
                    },
                    {
                        kind: 'block',
                        type: 'ace_looks_set_size',
                        inputs: { SIZE: { shadow: { type: 'math_number', fields: { NUM: 100 } } } },
                    },
                    {
                        kind: 'block',
                        type: 'ace_looks_change_effect',
                        inputs: { VALUE: { shadow: { type: 'math_number', fields: { NUM: 25 } } } },
                    },
                    {
                        kind: 'block',
                        type: 'ace_looks_set_effect',
                        inputs: { VALUE: { shadow: { type: 'math_number', fields: { NUM: 0 } } } },
                    },
                    { kind: 'block', type: 'ace_looks_clear_effects' },
                    { kind: 'block', type: 'ace_looks_show' },
                    { kind: 'block', type: 'ace_looks_hide' },
                    { kind: 'block', type: 'ace_looks_go_to_layer' },
                    {
                        kind: 'block',
                        type: 'ace_looks_go_layers',
                        inputs: { LAYERS: { shadow: { type: 'math_number', fields: { NUM: 1 } } } },
                    },
                    { kind: 'block', type: 'ace_looks_costume' },
                    { kind: 'block', type: 'ace_looks_backdrop' },
                    { kind: 'block', type: 'ace_looks_size' },
                ],
            },
            {
                kind: 'category',
                name: 'Sound',
                categorystyle: 'sound_category',
                contents: [
                    { kind: 'block', type: 'ace_sound_play' },
                    { kind: 'block', type: 'ace_sound_play_until_done' },
                    { kind: 'block', type: 'ace_sound_stop_all' },
                    {
                        kind: 'block',
                        type: 'ace_sound_change_effect',
                        inputs: { VALUE: { shadow: { type: 'math_number', fields: { NUM: 10 } } } },
                    },
                    {
                        kind: 'block',
                        type: 'ace_sound_set_effect',
                        inputs: { VALUE: { shadow: { type: 'math_number', fields: { NUM: 100 } } } },
                    },
                    { kind: 'block', type: 'ace_sound_clear_effects' },
                    {
                        kind: 'block',
                        type: 'ace_sound_change_volume',
                        inputs: { VOLUME: { shadow: { type: 'math_number', fields: { NUM: -10 } } } },
                    },
                    {
                        kind: 'block',
                        type: 'ace_sound_set_volume',
                        inputs: { VOLUME: { shadow: { type: 'math_number', fields: { NUM: 100 } } } },
                    },
                    { kind: 'block', type: 'ace_sound_volume' },
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
                    {
                        kind: 'block',
                        type: 'controls_repeat_ext',
                        inputs: {
                            TIMES: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
                        },
                    },
                    { kind: 'block', type: 'ace_control_forever' },
                    { kind: 'block', type: 'controls_if' },
                    { kind: 'block', type: 'controls_ifelse' },
                    { kind: 'block', type: 'ace_control_wait_until' },
                    {
                        kind: 'block',
                        type: 'controls_whileUntil',
                        fields: { MODE: 'UNTIL' },
                    },
                    { kind: 'block', type: 'ace_control_stop' },
                    { kind: 'block', type: 'ace_control_clone_start' },
                    { kind: 'block', type: 'ace_control_create_clone' },
                    { kind: 'block', type: 'ace_control_delete_clone' },
                ],
            },
            {
                kind: 'category',
                name: 'Sensing',
                categorystyle: 'sensing_category',
                contents: [
                    { kind: 'block', type: 'ace_sensing_touching' },
                    { kind: 'block', type: 'ace_sensing_touching_color' },
                    { kind: 'block', type: 'ace_sensing_color_touching' },
                    { kind: 'block', type: 'ace_sensing_distance' },
                    {
                        kind: 'block',
                        type: 'ace_sensing_ask',
                        inputs: {
                            MESSAGE: {
                                shadow: { type: 'text', fields: { TEXT: "What's your name?" } },
                            },
                        },
                    },
                    { kind: 'block', type: 'ace_sensing_answer' },
                    { kind: 'block', type: 'ace_sensing_key_pressed' },
                    { kind: 'block', type: 'ace_sensing_mouse_down' },
                    { kind: 'block', type: 'ace_sensing_mouse_x' },
                    { kind: 'block', type: 'ace_sensing_mouse_y' },
                    { kind: 'block', type: 'ace_sensing_set_drag_mode' },
                    { kind: 'block', type: 'ace_sensing_loudness' },
                    { kind: 'block', type: 'ace_sensing_timer' },
                    { kind: 'block', type: 'ace_sensing_reset_timer' },
                    { kind: 'block', type: 'ace_sensing_current' },
                    { kind: 'block', type: 'ace_sensing_username' },
                    { kind: 'block', type: 'ace_sensing_online' },
                ],
            },
            {
                kind: 'category',
                name: 'Operators',
                categorystyle: 'operators_category',
                contents: [
                    {
                        kind: 'block',
                        type: 'math_arithmetic',
                        fields: { OP: 'ADD' },
                        inputs: {
                            A: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
                            B: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
                        },
                    },
                    {
                        kind: 'block',
                        type: 'math_arithmetic',
                        fields: { OP: 'MINUS' },
                        inputs: {
                            A: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
                            B: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
                        },
                    },
                    {
                        kind: 'block',
                        type: 'math_arithmetic',
                        fields: { OP: 'MULTIPLY' },
                        inputs: {
                            A: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
                            B: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
                        },
                    },
                    {
                        kind: 'block',
                        type: 'math_arithmetic',
                        fields: { OP: 'DIVIDE' },
                        inputs: {
                            A: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
                            B: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
                        },
                    },
                    {
                        kind: 'block',
                        type: 'math_random_int',
                        inputs: {
                            FROM: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
                            TO: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
                        },
                    },
                    {
                        kind: 'block',
                        type: 'logic_compare',
                        fields: { OP: 'GT' },
                        inputs: {
                            A: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                            B: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                        },
                    },
                    {
                        kind: 'block',
                        type: 'logic_compare',
                        fields: { OP: 'LT' },
                        inputs: {
                            A: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                            B: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                        },
                    },
                    {
                        kind: 'block',
                        type: 'logic_compare',
                        fields: { OP: 'EQ' },
                        inputs: {
                            A: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                            B: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                        },
                    },
                    { kind: 'block', type: 'logic_operation' },
                    { kind: 'block', type: 'logic_negate' },
                    {
                        kind: 'block',
                        type: 'text_join',
                        inputs: {
                            ADD0: { shadow: { type: 'text', fields: { TEXT: 'apple ' } } },
                            ADD1: { shadow: { type: 'text', fields: { TEXT: 'banana' } } },
                        },
                    },
                    {
                        kind: 'block',
                        type: 'text_charAt',
                        inputs: {
                            VALUE: { shadow: { type: 'text', fields: { TEXT: 'apple' } } },
                            AT: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
                        },
                    },
                    {
                        kind: 'block',
                        type: 'text_length',
                        inputs: {
                            VALUE: { shadow: { type: 'text', fields: { TEXT: 'apple' } } },
                        },
                    },
                    {
                        kind: 'block',
                        type: 'text_indexOf',
                        inputs: {
                            VALUE: { shadow: { type: 'text', fields: { TEXT: 'apple' } } },
                            FIND: { shadow: { type: 'text', fields: { TEXT: 'p' } } },
                        },
                    },
                    {
                        kind: 'block',
                        type: 'math_modulo',
                        inputs: {
                            DIVIDEND: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
                            DIVISOR: { shadow: { type: 'math_number', fields: { NUM: 3 } } },
                        },
                    },
                    {
                        kind: 'block',
                        type: 'math_round',
                        inputs: {
                            NUM: { shadow: { type: 'math_number', fields: { NUM: 3.1 } } },
                        },
                    },
                    {
                        kind: 'block',
                        type: 'math_single',
                        fields: { OP: 'ABS' },
                        inputs: {
                            NUM: { shadow: { type: 'math_number', fields: { NUM: -9 } } },
                        },
                    },
                ],
            },
            {
                kind: 'category',
                name: 'Variables',
                categorystyle: 'variable_category',
                custom: 'VARIABLE',
            },
            {
                kind: 'category',
                name: 'Lists',
                categorystyle: 'list_category',
                contents: [
                    { kind: 'block', type: 'lists_create_with' },
                    { kind: 'block', type: 'lists_repeat' },
                    { kind: 'block', type: 'lists_length' },
                    { kind: 'block', type: 'lists_isEmpty' },
                    { kind: 'block', type: 'lists_indexOf' },
                    { kind: 'block', type: 'lists_getIndex' },
                    { kind: 'block', type: 'lists_setIndex' },
                    { kind: 'block', type: 'lists_getSublist' },
                    { kind: 'block', type: 'lists_sort' },
                    { kind: 'block', type: 'lists_split' },
                    { kind: 'block', type: 'lists_reverse' },
                ],
            },
            {
                kind: 'category',
                name: 'My Blocks',
                categorystyle: 'procedure_category',
                custom: 'PROCEDURE',
            },
        ],
    };
}
