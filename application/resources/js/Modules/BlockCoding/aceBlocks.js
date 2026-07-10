import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { getSoundDropdownOptions } from './soundLibrary.js';

Blockly.Blocks.ace_event_green_flag = {
    init() {
        this.appendDummyInput().appendField('when green flag clicked');
        this.appendStatementInput('STACK');
        this.setStyle('ace_event_hat');
        this.setTooltip('Runs when the learner presses the green flag.');
        this.setHelpUrl('');
    },
};

javascriptGenerator.forBlock.ace_event_green_flag = function (block, generator) {
    const branch = generator.statementToCode(block, 'STACK');

    return `runtime.onGreenFlag(async () => {\n${branch}});\n`;
};

Blockly.Blocks.ace_motion_move_steps = {
    init() {
        this.appendValueInput('STEPS')
            .setCheck('Number')
            .appendField('move');
        this.appendDummyInput().appendField('steps');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_motion_blocks');
        this.setTooltip('Move the sprite forward.');
    },
};

javascriptGenerator.forBlock.ace_motion_move_steps = function (block, generator) {
    const steps = generator.valueToCode(block, 'STEPS', Order.NONE) || '0';

    return `await runtime.moveSteps(${steps});\n`;
};

Blockly.Blocks.ace_motion_turn_degrees = {
    init() {
        this.appendValueInput('DEGREES')
            .setCheck('Number')
            .appendField('turn right');
        this.appendDummyInput().appendField('degrees');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_motion_blocks');
        this.setTooltip('Turn the sprite clockwise.');
    },
};

javascriptGenerator.forBlock.ace_motion_turn_degrees = function (block, generator) {
    const degrees = generator.valueToCode(block, 'DEGREES', Order.NONE) || '0';

    return `await runtime.turnDegrees(${degrees});\n`;
};

Blockly.Blocks.ace_motion_turn_left = {
    init() {
        this.appendValueInput('DEGREES')
            .setCheck('Number')
            .appendField('turn left');
        this.appendDummyInput().appendField('degrees');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_motion_blocks');
        this.setTooltip('Turn the sprite counter-clockwise.');
    },
};

javascriptGenerator.forBlock.ace_motion_turn_left = function (block, generator) {
    const degrees = generator.valueToCode(block, 'DEGREES', Order.NONE) || '0';

    return `await runtime.turnLeftDegrees(${degrees});\n`;
};

const GO_TO_TARGET_OPTIONS = [
    ['random position', 'random position'],
    ['mouse-pointer', 'mouse-pointer'],
];

Blockly.Blocks.ace_motion_go_to_target = {
    init() {
        this.appendDummyInput()
            .appendField('go to')
            .appendField(new Blockly.FieldDropdown(GO_TO_TARGET_OPTIONS), 'TARGET');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_motion_blocks');
        this.setTooltip('Move the sprite to a random position or the mouse pointer.');
    },
};

javascriptGenerator.forBlock.ace_motion_go_to_target = function (block) {
    const target = block.getFieldValue('TARGET');

    return `await runtime.goToTarget(${JSON.stringify(target)});\n`;
};

Blockly.Blocks.ace_motion_go_to_xy = {
    init() {
        this.appendValueInput('X').setCheck('Number').appendField('go to x');
        this.appendValueInput('Y').setCheck('Number').appendField('y');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_motion_blocks');
        this.setTooltip('Move the sprite to x/y coordinates.');
    },
};

javascriptGenerator.forBlock.ace_motion_go_to_xy = function (block, generator) {
    const x = generator.valueToCode(block, 'X', Order.NONE) || '0';
    const y = generator.valueToCode(block, 'Y', Order.NONE) || '0';

    return `await runtime.goToXY(${x}, ${y});\n`;
};

Blockly.Blocks.ace_motion_glide_to_target = {
    init() {
        this.appendValueInput('SECONDS').setCheck('Number').appendField('glide');
        this.appendDummyInput()
            .appendField('secs to')
            .appendField(new Blockly.FieldDropdown(GO_TO_TARGET_OPTIONS), 'TARGET');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_motion_blocks');
        this.setTooltip('Glide to a random position or the mouse pointer.');
    },
};

javascriptGenerator.forBlock.ace_motion_glide_to_target = function (block, generator) {
    const seconds = generator.valueToCode(block, 'SECONDS', Order.NONE) || '1';
    const target = block.getFieldValue('TARGET');

    return `await runtime.glideToTarget(${seconds}, ${JSON.stringify(target)});\n`;
};

Blockly.Blocks.ace_motion_glide = {
    init() {
        this.appendValueInput('SECONDS').setCheck('Number').appendField('glide');
        this.appendValueInput('X').setCheck('Number').appendField('secs to x');
        this.appendValueInput('Y').setCheck('Number').appendField('y');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_motion_blocks');
        this.setTooltip('Glide smoothly to x/y over a number of seconds.');
    },
};

javascriptGenerator.forBlock.ace_motion_glide = function (block, generator) {
    const seconds = generator.valueToCode(block, 'SECONDS', Order.NONE) || '1';
    const x = generator.valueToCode(block, 'X', Order.NONE) || '0';
    const y = generator.valueToCode(block, 'Y', Order.NONE) || '0';

    return `await runtime.glideToXY(${x}, ${y}, ${seconds});\n`;
};

Blockly.Blocks.ace_motion_point_direction = {
    init() {
        this.appendValueInput('DIRECTION').setCheck('Number').appendField('point in direction');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_motion_blocks');
        this.setTooltip('Point the sprite in a direction (0–360).');
    },
};

javascriptGenerator.forBlock.ace_motion_point_direction = function (block, generator) {
    const direction = generator.valueToCode(block, 'DIRECTION', Order.NONE) || '90';

    return `await runtime.pointInDirection(${direction});\n`;
};

const POINT_TOWARDS_OPTIONS = [['mouse-pointer', 'mouse-pointer']];

Blockly.Blocks.ace_motion_point_towards = {
    init() {
        this.appendDummyInput()
            .appendField('point towards')
            .appendField(new Blockly.FieldDropdown(POINT_TOWARDS_OPTIONS), 'TARGET');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_motion_blocks');
        this.setTooltip('Point the sprite towards the mouse pointer.');
    },
};

javascriptGenerator.forBlock.ace_motion_point_towards = function (block) {
    const target = block.getFieldValue('TARGET');

    return `await runtime.pointTowards(${JSON.stringify(target)});\n`;
};

Blockly.Blocks.ace_motion_change_x = {
    init() {
        this.appendValueInput('VALUE').setCheck('Number').appendField('change x by');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_motion_blocks');
        this.setTooltip('Change the sprite’s x position.');
    },
};

javascriptGenerator.forBlock.ace_motion_change_x = function (block, generator) {
    const value = generator.valueToCode(block, 'VALUE', Order.NONE) || '0';

    return `await runtime.changeXBy(${value});\n`;
};

Blockly.Blocks.ace_motion_set_x = {
    init() {
        this.appendValueInput('VALUE').setCheck('Number').appendField('set x to');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_motion_blocks');
        this.setTooltip('Set the sprite’s x position.');
    },
};

javascriptGenerator.forBlock.ace_motion_set_x = function (block, generator) {
    const value = generator.valueToCode(block, 'VALUE', Order.NONE) || '0';

    return `await runtime.setXTo(${value});\n`;
};

Blockly.Blocks.ace_motion_change_y = {
    init() {
        this.appendValueInput('VALUE').setCheck('Number').appendField('change y by');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_motion_blocks');
        this.setTooltip('Change the sprite’s y position.');
    },
};

javascriptGenerator.forBlock.ace_motion_change_y = function (block, generator) {
    const value = generator.valueToCode(block, 'VALUE', Order.NONE) || '0';

    return `await runtime.changeYBy(${value});\n`;
};

Blockly.Blocks.ace_motion_set_y = {
    init() {
        this.appendValueInput('VALUE').setCheck('Number').appendField('set y to');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_motion_blocks');
        this.setTooltip('Set the sprite’s y position.');
    },
};

javascriptGenerator.forBlock.ace_motion_set_y = function (block, generator) {
    const value = generator.valueToCode(block, 'VALUE', Order.NONE) || '0';

    return `await runtime.setYTo(${value});\n`;
};

Blockly.Blocks.ace_motion_bounce_edge = {
    init() {
        this.appendDummyInput().appendField('if on edge, bounce');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_motion_blocks');
        this.setTooltip('Bounce off the stage edge if the sprite is touching it.');
    },
};

javascriptGenerator.forBlock.ace_motion_bounce_edge = function () {
    return 'runtime.bounceIfOnEdge();\n';
};

const ROTATION_STYLE_OPTIONS = [
    ['left-right', 'left-right'],
    ["don't rotate", "don't rotate"],
    ['all around', 'all around'],
];

Blockly.Blocks.ace_motion_set_rotation_style = {
    init() {
        this.appendDummyInput()
            .appendField('set rotation style')
            .appendField(new Blockly.FieldDropdown(ROTATION_STYLE_OPTIONS), 'STYLE');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_motion_blocks');
        this.setTooltip('Choose how the sprite rotates when it turns.');
    },
};

javascriptGenerator.forBlock.ace_motion_set_rotation_style = function (block) {
    const style = block.getFieldValue('STYLE');

    return `runtime.setRotationStyle(${JSON.stringify(style)});\n`;
};

Blockly.Blocks.ace_motion_x_position = {
    init() {
        this.appendDummyInput().appendField('x position');
        this.setOutput(true, 'Number');
        this.setStyle('ace_motion_blocks');
        this.setTooltip('The sprite’s x position.');
    },
};

javascriptGenerator.forBlock.ace_motion_x_position = function () {
    return ['runtime.getXPosition()', Order.FUNCTION_CALL];
};

Blockly.Blocks.ace_motion_y_position = {
    init() {
        this.appendDummyInput().appendField('y position');
        this.setOutput(true, 'Number');
        this.setStyle('ace_motion_blocks');
        this.setTooltip('The sprite’s y position.');
    },
};

javascriptGenerator.forBlock.ace_motion_y_position = function () {
    return ['runtime.getYPosition()', Order.FUNCTION_CALL];
};

Blockly.Blocks.ace_motion_direction = {
    init() {
        this.appendDummyInput().appendField('direction');
        this.setOutput(true, 'Number');
        this.setStyle('ace_motion_blocks');
        this.setTooltip('The sprite’s direction in degrees.');
    },
};

javascriptGenerator.forBlock.ace_motion_direction = function () {
    return ['runtime.getDirection()', Order.FUNCTION_CALL];
};

Blockly.Blocks.ace_looks_say = {
    init() {
        this.appendValueInput('MESSAGE').setCheck('String').appendField('say');
        this.appendValueInput('SECONDS').setCheck('Number').appendField('for');
        this.appendDummyInput().appendField('seconds');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_looks_blocks');
        this.setTooltip('Show a speech bubble for a number of seconds.');
    },
};

javascriptGenerator.forBlock.ace_looks_say = function (block, generator) {
    const message = generator.valueToCode(block, 'MESSAGE', Order.NONE) || "''";
    const seconds = generator.valueToCode(block, 'SECONDS', Order.NONE) || '2';

    return `await runtime.say(${message}, ${seconds});\n`;
};

Blockly.Blocks.ace_looks_say_until = {
    init() {
        this.appendValueInput('MESSAGE').setCheck('String').appendField('say');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_looks_blocks');
        this.setTooltip('Show a speech bubble until another say/think block replaces it.');
    },
};

javascriptGenerator.forBlock.ace_looks_say_until = function (block, generator) {
    const message = generator.valueToCode(block, 'MESSAGE', Order.NONE) || "''";

    return `await runtime.say(${message});\n`;
};

Blockly.Blocks.ace_looks_think = {
    init() {
        this.appendValueInput('MESSAGE').setCheck('String').appendField('think');
        this.appendValueInput('SECONDS').setCheck('Number').appendField('for');
        this.appendDummyInput().appendField('seconds');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_looks_blocks');
        this.setTooltip('Show a thought bubble for a number of seconds.');
    },
};

javascriptGenerator.forBlock.ace_looks_think = function (block, generator) {
    const message = generator.valueToCode(block, 'MESSAGE', Order.NONE) || "''";
    const seconds = generator.valueToCode(block, 'SECONDS', Order.NONE) || '2';

    return `await runtime.think(${message}, ${seconds});\n`;
};

Blockly.Blocks.ace_looks_think_until = {
    init() {
        this.appendValueInput('MESSAGE').setCheck('String').appendField('think');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_looks_blocks');
        this.setTooltip('Show a thought bubble until another say/think block replaces it.');
    },
};

javascriptGenerator.forBlock.ace_looks_think_until = function (block, generator) {
    const message = generator.valueToCode(block, 'MESSAGE', Order.NONE) || "''";

    return `await runtime.think(${message});\n`;
};

Blockly.Blocks.ace_looks_switch_costume = {
    init() {
        this.appendValueInput('INDEX').setCheck('Number').appendField('switch costume to');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_looks_blocks');
        this.setTooltip('Switch to a costume number (1, 2, …).');
    },
};

javascriptGenerator.forBlock.ace_looks_switch_costume = function (block, generator) {
    const index = generator.valueToCode(block, 'INDEX', Order.NONE) || '1';

    return `runtime.switchCostume(${index});\n`;
};

Blockly.Blocks.ace_looks_next_costume = {
    init() {
        this.appendDummyInput().appendField('next costume');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_looks_blocks');
        this.setTooltip('Switch to the next costume.');
    },
};

javascriptGenerator.forBlock.ace_looks_next_costume = function () {
    return 'runtime.nextCostume();\n';
};

const BACKDROP_OPTIONS = [
    ['blue sky', 'blue sky'],
    ['grass', 'grass'],
    ['sunset', 'sunset'],
    ['night', 'night'],
];

const BACKDROP_COLOR_OPTIONS = [
    ['blue sky', '#dbeafe'],
    ['grass', '#bbf7d0'],
    ['sunset', '#fed7aa'],
    ['night', '#1e293b'],
];

Blockly.Blocks.ace_looks_set_backdrop = {
    init() {
        this.appendDummyInput()
            .appendField('switch backdrop to')
            .appendField(new Blockly.FieldDropdown(BACKDROP_COLOR_OPTIONS), 'COLOR');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_looks_blocks');
        this.setTooltip('Change the stage background color.');
    },
};

javascriptGenerator.forBlock.ace_looks_set_backdrop = function (block) {
    const color = block.getFieldValue('COLOR');

    return `runtime.setBackdrop(${JSON.stringify(color)});\n`;
};

Blockly.Blocks.ace_looks_next_backdrop = {
    init() {
        this.appendDummyInput().appendField('next backdrop');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_looks_blocks');
        this.setTooltip('Switch to the next backdrop.');
    },
};

javascriptGenerator.forBlock.ace_looks_next_backdrop = function () {
    return 'runtime.nextBackdrop();\n';
};

Blockly.Blocks.ace_looks_change_size = {
    init() {
        this.appendValueInput('SIZE').setCheck('Number').appendField('change size by');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_looks_blocks');
        this.setTooltip('Change the sprite size by a percentage.');
    },
};

javascriptGenerator.forBlock.ace_looks_change_size = function (block, generator) {
    const size = generator.valueToCode(block, 'SIZE', Order.NONE) || '10';

    return `runtime.changeSizeBy(${size});\n`;
};

Blockly.Blocks.ace_looks_set_size = {
    init() {
        this.appendValueInput('SIZE').setCheck('Number').appendField('set size to');
        this.appendDummyInput().appendField('%');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_looks_blocks');
        this.setTooltip('Set the sprite size as a percentage.');
    },
};

javascriptGenerator.forBlock.ace_looks_set_size = function (block, generator) {
    const size = generator.valueToCode(block, 'SIZE', Order.NONE) || '100';

    return `runtime.setSize(${size});\n`;
};

const LOOKS_EFFECT_OPTIONS = [
    ['color', 'color'],
    ['fisheye', 'fisheye'],
    ['whirl', 'whirl'],
    ['pixelate', 'pixelate'],
    ['mosaic', 'mosaic'],
    ['brightness', 'brightness'],
    ['ghost', 'ghost'],
];

Blockly.Blocks.ace_looks_change_effect = {
    init() {
        this.appendDummyInput()
            .appendField('change')
            .appendField(new Blockly.FieldDropdown(LOOKS_EFFECT_OPTIONS), 'EFFECT')
            .appendField('effect by');
        this.appendValueInput('VALUE').setCheck('Number');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_looks_blocks');
        this.setTooltip('Change a graphic effect by an amount.');
    },
};

javascriptGenerator.forBlock.ace_looks_change_effect = function (block, generator) {
    const effect = block.getFieldValue('EFFECT');
    const value = generator.valueToCode(block, 'VALUE', Order.NONE) || '25';

    return `runtime.changeEffectBy(${JSON.stringify(effect)}, ${value});\n`;
};

Blockly.Blocks.ace_looks_set_effect = {
    init() {
        this.appendDummyInput()
            .appendField('set')
            .appendField(new Blockly.FieldDropdown(LOOKS_EFFECT_OPTIONS), 'EFFECT')
            .appendField('effect to');
        this.appendValueInput('VALUE').setCheck('Number');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_looks_blocks');
        this.setTooltip('Set a graphic effect to a value.');
    },
};

javascriptGenerator.forBlock.ace_looks_set_effect = function (block, generator) {
    const effect = block.getFieldValue('EFFECT');
    const value = generator.valueToCode(block, 'VALUE', Order.NONE) || '0';

    return `runtime.setEffectTo(${JSON.stringify(effect)}, ${value});\n`;
};

Blockly.Blocks.ace_looks_clear_effects = {
    init() {
        this.appendDummyInput().appendField('clear graphic effects');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_looks_blocks');
        this.setTooltip('Clear all graphic effects on the sprite.');
    },
};

javascriptGenerator.forBlock.ace_looks_clear_effects = function () {
    return 'runtime.clearGraphicEffects();\n';
};

Blockly.Blocks.ace_looks_show = {
    init() {
        this.appendDummyInput().appendField('show');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_looks_blocks');
        this.setTooltip('Make the sprite visible.');
    },
};

javascriptGenerator.forBlock.ace_looks_show = function () {
    return 'runtime.show();\n';
};

Blockly.Blocks.ace_looks_hide = {
    init() {
        this.appendDummyInput().appendField('hide');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_looks_blocks');
        this.setTooltip('Hide the sprite.');
    },
};

javascriptGenerator.forBlock.ace_looks_hide = function () {
    return 'runtime.hide();\n';
};

const LAYER_EDGE_OPTIONS = [
    ['front', 'front'],
    ['back', 'back'],
];

Blockly.Blocks.ace_looks_go_to_layer = {
    init() {
        this.appendDummyInput()
            .appendField('go to')
            .appendField(new Blockly.FieldDropdown(LAYER_EDGE_OPTIONS), 'EDGE')
            .appendField('layer');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_looks_blocks');
        this.setTooltip('Move the sprite to the front or back layer.');
    },
};

javascriptGenerator.forBlock.ace_looks_go_to_layer = function (block) {
    const edge = block.getFieldValue('EDGE');

    return `runtime.goToLayer(${JSON.stringify(edge)});\n`;
};

const LAYER_DIR_OPTIONS = [
    ['forward', 'forward'],
    ['backward', 'backward'],
];

Blockly.Blocks.ace_looks_go_layers = {
    init() {
        this.appendDummyInput()
            .appendField('go')
            .appendField(new Blockly.FieldDropdown(LAYER_DIR_OPTIONS), 'DIRECTION');
        this.appendValueInput('LAYERS').setCheck('Number');
        this.appendDummyInput().appendField('layers');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_looks_blocks');
        this.setTooltip('Move the sprite forward or backward by layers.');
    },
};

javascriptGenerator.forBlock.ace_looks_go_layers = function (block, generator) {
    const direction = block.getFieldValue('DIRECTION');
    const layers = generator.valueToCode(block, 'LAYERS', Order.NONE) || '1';

    return `runtime.goLayers(${JSON.stringify(direction)}, ${layers});\n`;
};

const COSTUME_PROP_OPTIONS = [
    ['number', 'number'],
    ['name', 'name'],
];

Blockly.Blocks.ace_looks_costume = {
    init() {
        this.appendDummyInput()
            .appendField('costume')
            .appendField(new Blockly.FieldDropdown(COSTUME_PROP_OPTIONS), 'PROP');
        this.setOutput(true, null);
        this.setStyle('ace_looks_blocks');
        this.setTooltip('The current costume number or name.');
    },
};

javascriptGenerator.forBlock.ace_looks_costume = function (block) {
    const prop = block.getFieldValue('PROP');

    return [`runtime.getCostume(${JSON.stringify(prop)})`, Order.FUNCTION_CALL];
};

Blockly.Blocks.ace_looks_backdrop = {
    init() {
        this.appendDummyInput()
            .appendField('backdrop')
            .appendField(new Blockly.FieldDropdown(COSTUME_PROP_OPTIONS), 'PROP');
        this.setOutput(true, null);
        this.setStyle('ace_looks_blocks');
        this.setTooltip('The current backdrop number or name.');
    },
};

javascriptGenerator.forBlock.ace_looks_backdrop = function (block) {
    const prop = block.getFieldValue('PROP');

    return [`runtime.getBackdrop(${JSON.stringify(prop)})`, Order.FUNCTION_CALL];
};

Blockly.Blocks.ace_looks_size = {
    init() {
        this.appendDummyInput().appendField('size');
        this.setOutput(true, 'Number');
        this.setStyle('ace_looks_blocks');
        this.setTooltip('The sprite’s size as a percentage.');
    },
};

javascriptGenerator.forBlock.ace_looks_size = function () {
    return ['runtime.getSize()', Order.FUNCTION_CALL];
};

Blockly.Blocks.ace_sound_play = {
    init() {
        this.appendDummyInput()
            .appendField('start sound')
            .appendField(new Blockly.FieldDropdown(() => getSoundDropdownOptions()), 'SOUND');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_sound_blocks');
        this.setTooltip('Start playing a sound without waiting for it to finish.');
    },
};

javascriptGenerator.forBlock.ace_sound_play = function (block) {
    const sound = block.getFieldValue('SOUND');

    return `await runtime.startSound(${JSON.stringify(sound)});\n`;
};

Blockly.Blocks.ace_sound_play_until_done = {
    init() {
        this.appendDummyInput()
            .appendField('play sound')
            .appendField(new Blockly.FieldDropdown(() => getSoundDropdownOptions()), 'SOUND')
            .appendField('until done');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_sound_blocks');
        this.setTooltip('Play a sound and wait until it finishes.');
    },
};

javascriptGenerator.forBlock.ace_sound_play_until_done = function (block) {
    const sound = block.getFieldValue('SOUND');

    return `await runtime.playSound(${JSON.stringify(sound)}, true);\n`;
};

Blockly.Blocks.ace_sound_stop_all = {
    init() {
        this.appendDummyInput().appendField('stop all sounds');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_sound_blocks');
        this.setTooltip('Stop every sound that is playing.');
    },
};

javascriptGenerator.forBlock.ace_sound_stop_all = function () {
    return 'runtime.stopAllSounds();\n';
};

const SOUND_EFFECT_OPTIONS = [
    ['pitch', 'pitch'],
    ['pan left/right', 'pan left/right'],
];

Blockly.Blocks.ace_sound_change_effect = {
    init() {
        this.appendDummyInput()
            .appendField('change')
            .appendField(new Blockly.FieldDropdown(SOUND_EFFECT_OPTIONS), 'EFFECT')
            .appendField('effect by');
        this.appendValueInput('VALUE').setCheck('Number');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_sound_blocks');
        this.setTooltip('Change a sound effect by an amount.');
    },
};

javascriptGenerator.forBlock.ace_sound_change_effect = function (block, generator) {
    const effect = block.getFieldValue('EFFECT');
    const value = generator.valueToCode(block, 'VALUE', Order.NONE) || '10';

    return `runtime.changeSoundEffectBy(${JSON.stringify(effect)}, ${value});\n`;
};

Blockly.Blocks.ace_sound_set_effect = {
    init() {
        this.appendDummyInput()
            .appendField('set')
            .appendField(new Blockly.FieldDropdown(SOUND_EFFECT_OPTIONS), 'EFFECT')
            .appendField('effect to');
        this.appendValueInput('VALUE').setCheck('Number');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_sound_blocks');
        this.setTooltip('Set a sound effect to a value.');
    },
};

javascriptGenerator.forBlock.ace_sound_set_effect = function (block, generator) {
    const effect = block.getFieldValue('EFFECT');
    const value = generator.valueToCode(block, 'VALUE', Order.NONE) || '100';

    return `runtime.setSoundEffectTo(${JSON.stringify(effect)}, ${value});\n`;
};

Blockly.Blocks.ace_sound_clear_effects = {
    init() {
        this.appendDummyInput().appendField('clear sound effects');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_sound_blocks');
        this.setTooltip('Clear all sound effects.');
    },
};

javascriptGenerator.forBlock.ace_sound_clear_effects = function () {
    return 'runtime.clearSoundEffects();\n';
};

Blockly.Blocks.ace_sound_change_volume = {
    init() {
        this.appendValueInput('VOLUME').setCheck('Number').appendField('change volume by');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_sound_blocks');
        this.setTooltip('Change volume for sounds.');
    },
};

javascriptGenerator.forBlock.ace_sound_change_volume = function (block, generator) {
    const volume = generator.valueToCode(block, 'VOLUME', Order.NONE) || '-10';

    return `runtime.changeVolumeBy(${volume});\n`;
};

Blockly.Blocks.ace_sound_set_volume = {
    init() {
        this.appendValueInput('VOLUME').setCheck('Number').appendField('set volume to');
        this.appendDummyInput().appendField('%');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_sound_blocks');
        this.setTooltip('Set volume for sounds (0–100).');
    },
};

javascriptGenerator.forBlock.ace_sound_set_volume = function (block, generator) {
    const volume = generator.valueToCode(block, 'VOLUME', Order.NONE) || '100';

    return `runtime.setSoundVolume(${volume});\n`;
};

Blockly.Blocks.ace_sound_volume = {
    init() {
        this.appendDummyInput().appendField('volume');
        this.setOutput(true, 'Number');
        this.setStyle('ace_sound_blocks');
        this.setTooltip('The current sound volume (0–100).');
    },
};

javascriptGenerator.forBlock.ace_sound_volume = function () {
    return ['runtime.getVolume()', Order.FUNCTION_CALL];
};

Blockly.Blocks.ace_event_sprite_clicked = {
    init() {
        this.appendDummyInput().appendField('when this sprite clicked');
        this.appendStatementInput('STACK');
        this.setStyle('ace_event_hat');
        this.setTooltip('Runs when the learner clicks this sprite on the stage.');
    },
};

javascriptGenerator.forBlock.ace_event_sprite_clicked = function (block, generator) {
    const branch = generator.statementToCode(block, 'STACK');

    return `runtime.onSpriteClicked(runtime.getActiveSpriteId(), async () => {\n${branch}});\n`;
};

const KEY_OPTIONS = [
    ['space', 'space'],
    ['up arrow', 'ArrowUp'],
    ['down arrow', 'ArrowDown'],
    ['left arrow', 'ArrowLeft'],
    ['right arrow', 'ArrowRight'],
];

Blockly.Blocks.ace_event_key_pressed = {
    init() {
        this.appendDummyInput()
            .appendField('when')
            .appendField(new Blockly.FieldDropdown(KEY_OPTIONS), 'KEY')
            .appendField('key pressed');
        this.appendStatementInput('STACK');
        this.setStyle('ace_event_hat');
        this.setTooltip('Runs when the learner presses a key while the program is running.');
    },
};

javascriptGenerator.forBlock.ace_event_key_pressed = function (block, generator) {
    const key = block.getFieldValue('KEY');
    const branch = generator.statementToCode(block, 'STACK');

    return `runtime.onKeyPressed(${JSON.stringify(key)}, async () => {\n${branch}});\n`;
};

Blockly.Blocks.ace_event_backdrop_switches = {
    init() {
        this.appendDummyInput()
            .appendField('when backdrop switches to')
            .appendField(new Blockly.FieldDropdown(BACKDROP_OPTIONS), 'BACKDROP');
        this.appendStatementInput('STACK');
        this.setStyle('ace_event_hat');
        this.setTooltip('Runs when the stage switches to the chosen backdrop.');
    },
};

javascriptGenerator.forBlock.ace_event_backdrop_switches = function (block, generator) {
    const backdrop = block.getFieldValue('BACKDROP');
    const branch = generator.statementToCode(block, 'STACK');

    return `runtime.onBackdropSwitched(${JSON.stringify(backdrop)}, async () => {\n${branch}});\n`;
};

const GREATER_THAN_SENSOR_OPTIONS = [
    ['loudness', 'loudness'],
    ['timer', 'timer'],
];

Blockly.Blocks.ace_event_greater_than = {
    init() {
        this.appendDummyInput()
            .appendField('when')
            .appendField(new Blockly.FieldDropdown(GREATER_THAN_SENSOR_OPTIONS), 'SENSOR')
            .appendField('>');
        this.appendValueInput('VALUE').setCheck('Number');
        this.appendStatementInput('STACK');
        this.setStyle('ace_event_hat');
        this.setTooltip('Runs when loudness or timer goes above the given value.');
    },
};

javascriptGenerator.forBlock.ace_event_greater_than = function (block, generator) {
    const sensor = block.getFieldValue('SENSOR');
    const value = generator.valueToCode(block, 'VALUE', Order.NONE) || '10';
    const branch = generator.statementToCode(block, 'STACK');

    return `runtime.onGreaterThan(${JSON.stringify(sensor)}, ${value}, async () => {\n${branch}});\n`;
};

Blockly.Blocks.ace_event_broadcast = {
    init() {
        this.appendValueInput('MESSAGE').setCheck('String').appendField('broadcast');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_event_blocks');
        this.setTooltip('Tell other scripts to run.');
    },
};

javascriptGenerator.forBlock.ace_event_broadcast = function (block, generator) {
    const message = generator.valueToCode(block, 'MESSAGE', Order.NONE) || "''";

    return `await runtime.broadcast(${message});\n`;
};

Blockly.Blocks.ace_event_broadcast_and_wait = {
    init() {
        this.appendValueInput('MESSAGE').setCheck('String').appendField('broadcast');
        this.appendDummyInput().appendField('and wait');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_event_blocks');
        this.setTooltip('Broadcast a message and wait until receiving scripts finish.');
    },
};

javascriptGenerator.forBlock.ace_event_broadcast_and_wait = function (block, generator) {
    const message = generator.valueToCode(block, 'MESSAGE', Order.NONE) || "''";

    return `await runtime.broadcastAndWait(${message});\n`;
};

Blockly.Blocks.ace_event_broadcast_received = {
    init() {
        this.appendDummyInput()
            .appendField('when I receive')
            .appendField(new Blockly.FieldTextInput('message1'), 'MESSAGE');
        this.appendStatementInput('STACK');
        this.setStyle('ace_event_hat');
        this.setTooltip('Runs when another script broadcasts this message.');
    },
};

javascriptGenerator.forBlock.ace_event_broadcast_received = function (block, generator) {
    const message = block.getFieldValue('MESSAGE');
    const branch = generator.statementToCode(block, 'STACK');

    return `runtime.onBroadcastReceived(${JSON.stringify(message)}, async () => {\n${branch}});\n`;
};

Blockly.Blocks.ace_control_wait = {
    init() {
        this.appendValueInput('SECONDS').setCheck('Number').appendField('wait');
        this.appendDummyInput().appendField('seconds');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_control_blocks');
        this.setTooltip('Pause the script for a number of seconds.');
    },
};

javascriptGenerator.forBlock.ace_control_wait = function (block, generator) {
    const seconds = generator.valueToCode(block, 'SECONDS', Order.NONE) || '1';

    return `await runtime.waitSeconds(${seconds});\n`;
};

Blockly.Blocks.ace_control_wait_until = {
    init() {
        this.appendValueInput('CONDITION').setCheck('Boolean').appendField('wait until');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_control_blocks');
        this.setTooltip('Wait until the condition becomes true.');
    },
};

javascriptGenerator.forBlock.ace_control_wait_until = function (block, generator) {
    const condition = generator.valueToCode(block, 'CONDITION', Order.NONE) || 'false';

    return `await runtime.waitUntil(async () => (${condition}));\n`;
};

Blockly.Blocks.ace_control_forever = {
    init() {
        this.appendDummyInput().appendField('forever');
        this.appendStatementInput('DO');
        this.setPreviousStatement(true, null);
        this.setStyle('ace_control_blocks');
        this.setTooltip('Repeat the blocks inside forever.');
    },
};

javascriptGenerator.forBlock.ace_control_forever = function (block, generator) {
    const branch = generator.statementToCode(block, 'DO');

    return `while (true) {\n  await runtime.checkLoop();\n${branch}}\n`;
};

Blockly.Blocks.ace_control_stop = {
    init() {
        this.appendDummyInput()
            .appendField('stop')
            .appendField(
                new Blockly.FieldDropdown([
                    ['all', 'ALL'],
                    ['this script', 'THIS'],
                ]),
                'TARGET',
            );
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_control_blocks');
        this.setTooltip('Stop scripts that are running.');
    },
};

javascriptGenerator.forBlock.ace_control_stop = function (block) {
    const target = block.getFieldValue('TARGET');

    return target === 'THIS' ? 'runtime.stopThisScript();\n' : 'runtime.stopAll();\n';
};

Blockly.Blocks.ace_control_clone_start = {
    init() {
        this.appendDummyInput().appendField('when I start as a clone');
        this.appendStatementInput('STACK');
        this.setStyle('ace_event_hat');
        this.setTooltip('Runs when a clone of this sprite is created.');
    },
};

javascriptGenerator.forBlock.ace_control_clone_start = function (block, generator) {
    const branch = generator.statementToCode(block, 'STACK');

    return `runtime.onCloneStart(async () => {\n${branch}});\n`;
};

const CLONE_TARGET_OPTIONS = [['myself', 'myself']];

Blockly.Blocks.ace_control_create_clone = {
    init() {
        this.appendDummyInput()
            .appendField('create clone of')
            .appendField(new Blockly.FieldDropdown(CLONE_TARGET_OPTIONS), 'TARGET');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_control_blocks');
        this.setTooltip('Create a clone of this sprite.');
    },
};

javascriptGenerator.forBlock.ace_control_create_clone = function (block) {
    const target = block.getFieldValue('TARGET');

    return `await runtime.createCloneOf(${JSON.stringify(target)});\n`;
};

Blockly.Blocks.ace_control_delete_clone = {
    init() {
        this.appendDummyInput().appendField('delete this clone');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_control_blocks');
        this.setTooltip('Delete this clone (does nothing on the original sprite).');
    },
};

javascriptGenerator.forBlock.ace_control_delete_clone = function () {
    return 'runtime.deleteThisClone();\n';
};

const TOUCHING_OPTIONS = [
    ['edge', 'edge'],
    ['mouse-pointer', 'mouse-pointer'],
];

Blockly.Blocks.ace_sensing_touching = {
    init() {
        this.appendDummyInput()
            .appendField('touching')
            .appendField(new Blockly.FieldDropdown(TOUCHING_OPTIONS), 'TARGET');
        this.setOutput(true, 'Boolean');
        this.setStyle('ace_sensing_blocks');
        this.setTooltip('True when the sprite is touching the edge or the mouse pointer.');
    },
};

javascriptGenerator.forBlock.ace_sensing_touching = function (block) {
    const target = block.getFieldValue('TARGET');

    if (target === 'mouse-pointer') {
        return ['runtime.isTouchingMouse()', Order.FUNCTION_CALL];
    }

    return ['runtime.isTouchingEdge()', Order.FUNCTION_CALL];
};

Blockly.Blocks.ace_sensing_mouse_x = {
    init() {
        this.appendDummyInput().appendField('mouse x');
        this.setOutput(true, 'Number');
        this.setStyle('ace_sensing_blocks');
        this.setTooltip('X position of the mouse on the stage.');
    },
};

javascriptGenerator.forBlock.ace_sensing_mouse_x = function () {
    return ['runtime.getMouseX()', Order.FUNCTION_CALL];
};

Blockly.Blocks.ace_sensing_mouse_y = {
    init() {
        this.appendDummyInput().appendField('mouse y');
        this.setOutput(true, 'Number');
        this.setStyle('ace_sensing_blocks');
        this.setTooltip('Y position of the mouse on the stage.');
    },
};

javascriptGenerator.forBlock.ace_sensing_mouse_y = function () {
    return ['runtime.getMouseY()', Order.FUNCTION_CALL];
};

Blockly.Blocks.ace_sensing_key_pressed = {
    init() {
        this.appendDummyInput()
            .appendField('key')
            .appendField(new Blockly.FieldDropdown(KEY_OPTIONS), 'KEY')
            .appendField('pressed?');
        this.setOutput(true, 'Boolean');
        this.setStyle('ace_sensing_blocks');
        this.setTooltip('True while the key is held down.');
    },
};

javascriptGenerator.forBlock.ace_sensing_key_pressed = function (block) {
    const key = block.getFieldValue('KEY');

    return [`runtime.isKeyPressed(${JSON.stringify(key)})`, Order.FUNCTION_CALL];
};

Blockly.Blocks.ace_sensing_timer = {
    init() {
        this.appendDummyInput().appendField('timer');
        this.setOutput(true, 'Number');
        this.setStyle('ace_sensing_blocks');
        this.setTooltip('Seconds since the program started running.');
    },
};

javascriptGenerator.forBlock.ace_sensing_timer = function () {
    return ['runtime.getTimer()', Order.FUNCTION_CALL];
};

const COLOUR_OPTIONS = [
    ['red', '#ff0000'],
    ['green', '#00ff00'],
    ['blue', '#0000ff'],
    ['yellow', '#ffff00'],
    ['orange', '#ff8800'],
    ['purple', '#9900ff'],
    ['black', '#000000'],
    ['white', '#ffffff'],
];

Blockly.Blocks.ace_pen_down = {
    init() {
        this.appendDummyInput().appendField('pen down');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_pen_blocks');
        this.setTooltip('Start drawing with the pen as the sprite moves.');
    },
};

javascriptGenerator.forBlock.ace_pen_down = function () {
    return 'runtime.penDown();\n';
};

Blockly.Blocks.ace_pen_up = {
    init() {
        this.appendDummyInput().appendField('pen up');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_pen_blocks');
        this.setTooltip('Stop drawing with the pen.');
    },
};

javascriptGenerator.forBlock.ace_pen_up = function () {
    return 'runtime.penUp();\n';
};

Blockly.Blocks.ace_pen_set_color = {
    init() {
        this.appendDummyInput()
            .appendField('set pen color to')
            .appendField(new Blockly.FieldDropdown(COLOUR_OPTIONS), 'COLOR');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_pen_blocks');
        this.setTooltip('Set the pen color.');
    },
};

javascriptGenerator.forBlock.ace_pen_set_color = function (block) {
    const color = block.getFieldValue('COLOR');

    return `runtime.setPenColorTo(${JSON.stringify(color)});\n`;
};

Blockly.Blocks.ace_pen_change_size = {
    init() {
        this.appendValueInput('SIZE').setCheck('Number').appendField('change pen size by');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_pen_blocks');
        this.setTooltip('Change the pen thickness.');
    },
};

javascriptGenerator.forBlock.ace_pen_change_size = function (block, generator) {
    const size = generator.valueToCode(block, 'SIZE', Order.NONE) || '1';

    return `runtime.changePenSizeBy(${size});\n`;
};

Blockly.Blocks.ace_pen_set_size = {
    init() {
        this.appendValueInput('SIZE').setCheck('Number').appendField('set pen size to');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_pen_blocks');
        this.setTooltip('Set the pen thickness.');
    },
};

javascriptGenerator.forBlock.ace_pen_set_size = function (block, generator) {
    const size = generator.valueToCode(block, 'SIZE', Order.NONE) || '1';

    return `runtime.setPenSizeTo(${size});\n`;
};

Blockly.Blocks.ace_pen_clear = {
    init() {
        this.appendDummyInput().appendField('erase all');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_pen_blocks');
        this.setTooltip('Clear all pen marks from the stage.');
    },
};

javascriptGenerator.forBlock.ace_pen_clear = function () {
    return 'runtime.clearPen();\n';
};

Blockly.Blocks.ace_sensing_touching_color = {
    init() {
        this.appendDummyInput()
            .appendField('touching color')
            .appendField(new Blockly.FieldDropdown(COLOUR_OPTIONS), 'COLOR')
            .appendField('?');
        this.setOutput(true, 'Boolean');
        this.setStyle('ace_sensing_blocks');
        this.setTooltip('True when the sprite is touching the chosen color.');
    },
};

javascriptGenerator.forBlock.ace_sensing_touching_color = function (block) {
    const color = block.getFieldValue('COLOR');

    return [`runtime.isTouchingColor(${JSON.stringify(color)})`, Order.FUNCTION_CALL];
};

Blockly.Blocks.ace_sensing_color_touching = {
    init() {
        this.appendDummyInput()
            .appendField('color')
            .appendField(new Blockly.FieldDropdown(COLOUR_OPTIONS), 'COLOR_A')
            .appendField('is touching')
            .appendField(new Blockly.FieldDropdown(COLOUR_OPTIONS), 'COLOR_B')
            .appendField('?');
        this.setOutput(true, 'Boolean');
        this.setStyle('ace_sensing_blocks');
        this.setTooltip('True when the first color is touching the second color.');
    },
};

javascriptGenerator.forBlock.ace_sensing_color_touching = function (block) {
    const colorA = block.getFieldValue('COLOR_A');
    const colorB = block.getFieldValue('COLOR_B');

    return [
        `runtime.isColorTouchingColor(${JSON.stringify(colorA)}, ${JSON.stringify(colorB)})`,
        Order.FUNCTION_CALL,
    ];
};

const DISTANCE_TARGET_OPTIONS = [['mouse-pointer', 'mouse-pointer']];

Blockly.Blocks.ace_sensing_distance = {
    init() {
        this.appendDummyInput()
            .appendField('distance to')
            .appendField(new Blockly.FieldDropdown(DISTANCE_TARGET_OPTIONS), 'TARGET');
        this.setOutput(true, 'Number');
        this.setStyle('ace_sensing_blocks');
        this.setTooltip('Distance from this sprite to the mouse pointer.');
    },
};

javascriptGenerator.forBlock.ace_sensing_distance = function (block) {
    const target = block.getFieldValue('TARGET');

    return [`runtime.distanceTo(${JSON.stringify(target)})`, Order.FUNCTION_CALL];
};

Blockly.Blocks.ace_sensing_ask = {
    init() {
        this.appendValueInput('MESSAGE').setCheck('String').appendField('ask');
        this.appendDummyInput().appendField('and wait');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_sensing_blocks');
        this.setTooltip('Ask a question and wait for an answer.');
    },
};

javascriptGenerator.forBlock.ace_sensing_ask = function (block, generator) {
    const msg = generator.valueToCode(block, 'MESSAGE', Order.NONE) || "''";

    return `await runtime.askAndWait(${msg});\n`;
};

Blockly.Blocks.ace_sensing_answer = {
    init() {
        this.appendDummyInput().appendField('answer');
        this.setOutput(true, 'String');
        this.setStyle('ace_sensing_blocks');
        this.setTooltip('The most recent answer from ask and wait.');
    },
};

javascriptGenerator.forBlock.ace_sensing_answer = function () {
    return ['runtime.getAnswer()', Order.FUNCTION_CALL];
};

Blockly.Blocks.ace_sensing_mouse_down = {
    init() {
        this.appendDummyInput().appendField('mouse down?');
        this.setOutput(true, 'Boolean');
        this.setStyle('ace_sensing_blocks');
        this.setTooltip('True while the mouse button is held down.');
    },
};

javascriptGenerator.forBlock.ace_sensing_mouse_down = function () {
    return ['runtime.isMouseDown()', Order.FUNCTION_CALL];
};

const DRAG_MODE_OPTIONS = [
    ['draggable', 'draggable'],
    ['not draggable', 'not draggable'],
];

Blockly.Blocks.ace_sensing_set_drag_mode = {
    init() {
        this.appendDummyInput()
            .appendField('set drag mode')
            .appendField(new Blockly.FieldDropdown(DRAG_MODE_OPTIONS), 'MODE');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_sensing_blocks');
        this.setTooltip('Allow or prevent dragging this sprite.');
    },
};

javascriptGenerator.forBlock.ace_sensing_set_drag_mode = function (block) {
    const mode = block.getFieldValue('MODE');

    return `runtime.setDragMode(${JSON.stringify(mode)});\n`;
};

Blockly.Blocks.ace_sensing_loudness = {
    init() {
        this.appendDummyInput().appendField('loudness');
        this.setOutput(true, 'Number');
        this.setStyle('ace_sensing_blocks');
        this.setTooltip('Current loudness level.');
    },
};

javascriptGenerator.forBlock.ace_sensing_loudness = function () {
    return ['runtime.getLoudness()', Order.FUNCTION_CALL];
};

Blockly.Blocks.ace_sensing_reset_timer = {
    init() {
        this.appendDummyInput().appendField('reset timer');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_sensing_blocks');
        this.setTooltip('Reset the timer to zero.');
    },
};

javascriptGenerator.forBlock.ace_sensing_reset_timer = function () {
    return 'runtime.resetTimer();\n';
};

const CURRENT_PROPERTY_OPTIONS = [
    ['year', 'year'],
    ['month', 'month'],
    ['date', 'date'],
    ['day of week', 'day of week'],
    ['hour', 'hour'],
    ['minute', 'minute'],
    ['second', 'second'],
];

Blockly.Blocks.ace_sensing_current = {
    init() {
        this.appendDummyInput()
            .appendField('current')
            .appendField(new Blockly.FieldDropdown(CURRENT_PROPERTY_OPTIONS), 'PROPERTY');
        this.setOutput(true, 'Number');
        this.setStyle('ace_sensing_blocks');
        this.setTooltip('A part of the current date or time.');
    },
};

javascriptGenerator.forBlock.ace_sensing_current = function (block) {
    const property = block.getFieldValue('PROPERTY');

    return [`runtime.getCurrent(${JSON.stringify(property)})`, Order.FUNCTION_CALL];
};

Blockly.Blocks.ace_sensing_username = {
    init() {
        this.appendDummyInput().appendField('username');
        this.setOutput(true, 'String');
        this.setStyle('ace_sensing_blocks');
        this.setTooltip('The current username.');
    },
};

javascriptGenerator.forBlock.ace_sensing_username = function () {
    return ['runtime.getUsername()', Order.FUNCTION_CALL];
};

Blockly.Blocks.ace_sensing_online = {
    init() {
        this.appendDummyInput().appendField('online?');
        this.setOutput(true, 'Boolean');
        this.setStyle('ace_sensing_blocks');
        this.setTooltip('True when the browser reports an online connection.');
    },
};

javascriptGenerator.forBlock.ace_sensing_online = function () {
    return ['runtime.isOnline()', Order.FUNCTION_CALL];
};

javascriptGenerator.addReservedWords('runtime,await');

javascriptGenerator.INFINITE_LOOP_TRAP = 'await runtime.checkLoop();\n';
