export function getLevelOneToolbox(preset = 'level_1_default') {
    void preset;

    return {
        kind: 'categoryToolbox',
        contents: [
            {
                kind: 'category',
                name: 'Events',
                categorystyle: 'event_category',
                contents: [{ kind: 'block', type: 'ace_event_green_flag' }],
            },
            {
                kind: 'category',
                name: 'Motion',
                categorystyle: 'math_category',
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
                ],
            },
            {
                kind: 'category',
                name: 'Looks',
                categorystyle: 'text_category',
                contents: [
                    {
                        kind: 'block',
                        type: 'ace_looks_say',
                        inputs: {
                            MESSAGE: { shadow: { type: 'text', fields: { TEXT: 'Hello!' } } },
                            SECONDS: { shadow: { type: 'math_number', fields: { NUM: 2 } } },
                        },
                    },
                ],
            },
            {
                kind: 'category',
                name: 'Control',
                categorystyle: 'loop_category',
                contents: [
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
                categorystyle: 'logic_category',
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
