import { Theme, Themes } from 'blockly/core';

/** Scratch-inspired palette on top of Blockly's Zelos renderer. */
export const aceTheme = Theme.defineTheme('ace', {
    base: Themes.Zelos,
    startHats: true,
    fontStyle: {
        family: 'Helvetica Neue, Helvetica, Arial, sans-serif',
        weight: '500',
        size: 12,
    },
    componentStyles: {
        workspaceBackgroundColour: '#f2f2f2',
        toolboxBackgroundColour: '#e6e6e6',
        flyoutBackgroundColour: '#e6e6e6',
        scrollbarColour: 'rgba(0, 0, 0, 0.18)',
        scrollbarOpacity: 0.5,
    },
    blockStyles: {
        ace_event_hat: {
            colourPrimary: '#FFBF00',
            colourSecondary: '#E6AC00',
            colourTertiary: '#CC9900',
            hat: 'cap',
        },
        ace_motion_blocks: {
            colourPrimary: '#4C97FF',
            colourSecondary: '#4280D7',
            colourTertiary: '#3373CC',
        },
        ace_looks_blocks: {
            colourPrimary: '#9966FF',
            colourSecondary: '#855CD6',
            colourTertiary: '#774DCB',
        },
        ace_event_blocks: {
            colourPrimary: '#FFBF00',
            colourSecondary: '#E6AC00',
            colourTertiary: '#CC9900',
        },
        ace_control_blocks: {
            colourPrimary: '#FFAB19',
            colourSecondary: '#EC9D00',
            colourTertiary: '#CF8B17',
        },
        ace_sound_blocks: {
            colourPrimary: '#CF63CF',
            colourSecondary: '#C94FC9',
            colourTertiary: '#BD42BD',
        },
        ace_sensing_blocks: {
            colourPrimary: '#5CB1D6',
            colourSecondary: '#47A8D1',
            colourTertiary: '#3A91B8',
        },
        ace_pen_blocks: {
            colourPrimary: '#0FBD8C',
            colourSecondary: '#0DA57A',
            colourTertiary: '#0B8E69',
        },
        ace_video_blocks: {
            colourPrimary: '#247C63',
            colourSecondary: '#206F58',
            colourTertiary: '#1B604D',
        },
        ace_ai_blocks: {
            colourPrimary: '#7A84FF',
            colourSecondary: '#6B74E6',
            colourTertiary: '#5C64CC',
        },
        ace_curriculum_blocks: {
            colourPrimary: '#FFAB19',
            colourSecondary: '#EC9D00',
            colourTertiary: '#CF8B17',
        },
        ace_robot_blocks: {
            colourPrimary: '#4C97FF',
            colourSecondary: '#4280D7',
            colourTertiary: '#3373CC',
        },
    },
    categoryStyles: {
        event_category: { colour: '#FFBF00' },
        motion_category: { colour: '#4C97FF' },
        looks_category: { colour: '#9966FF' },
        sound_category: { colour: '#CF63CF' },
        control_category: { colour: '#FFAB19' },
        sensing_category: { colour: '#5CB1D6' },
        operators_category: { colour: '#59C059' },
        variable_category: { colour: '#FF8C1A' },
        list_category: { colour: '#FF661A' },
        procedure_category: { colour: '#FF6680' },
        pen_category: { colour: '#0FBD8C' },
        video_category: { colour: '#247C63' },
        ai_category: { colour: '#7A84FF' },
        curriculum_category: { colour: '#FFAB19' },
        robot_category: { colour: '#4C97FF' },
    },
});
