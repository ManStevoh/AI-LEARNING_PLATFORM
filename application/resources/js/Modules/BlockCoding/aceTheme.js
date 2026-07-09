import { Theme, Themes } from 'blockly/core';

/** Scratch-inspired palette on top of Blockly's Zelos renderer. */
export const aceTheme = Theme.defineTheme('ace', {
    base: Themes.Zelos,
    startHats: true,
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
    },
    categoryStyles: {
        event_category: { colour: '#FFBF00' },
        motion_category: { colour: '#4C97FF' },
        looks_category: { colour: '#9966FF' },
        sound_category: { colour: '#CF63CF' },
        control_category: { colour: '#FFAB19' },
        sensing_category: { colour: '#5CB1D6' },
        operators_category: { colour: '#59C059' },
    },
});
