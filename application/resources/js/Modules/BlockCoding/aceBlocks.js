import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';
import { SOUND_PRESET_OPTIONS } from './soundEngine.js';

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
            .appendField('turn');
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

Blockly.Blocks.ace_looks_say = {
    init() {
        this.appendValueInput('MESSAGE').setCheck('String').appendField('say');
        this.appendValueInput('SECONDS').setCheck('Number').appendField('for');
        this.appendDummyInput().appendField('seconds');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_looks_blocks');
        this.setTooltip('Show a speech bubble on the sprite.');
    },
};

javascriptGenerator.forBlock.ace_looks_say = function (block, generator) {
    const message = generator.valueToCode(block, 'MESSAGE', Order.NONE) || "''";
    const seconds = generator.valueToCode(block, 'SECONDS', Order.NONE) || '2';

    return `await runtime.say(${message}, ${seconds});\n`;
};

Blockly.Blocks.ace_looks_think = {
    init() {
        this.appendValueInput('MESSAGE').setCheck('String').appendField('think');
        this.appendValueInput('SECONDS').setCheck('Number').appendField('for');
        this.appendDummyInput().appendField('seconds');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_looks_blocks');
        this.setTooltip('Show a thought bubble on the sprite.');
    },
};

javascriptGenerator.forBlock.ace_looks_think = function (block, generator) {
    const message = generator.valueToCode(block, 'MESSAGE', Order.NONE) || "''";
    const seconds = generator.valueToCode(block, 'SECONDS', Order.NONE) || '2';

    return `await runtime.think(${message}, ${seconds});\n`;
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

const BACKDROP_OPTIONS = [
    ['blue sky', '#dbeafe'],
    ['grass', '#bbf7d0'],
    ['sunset', '#fed7aa'],
    ['night', '#1e293b'],
];

Blockly.Blocks.ace_looks_set_backdrop = {
    init() {
        this.appendDummyInput()
            .appendField('switch backdrop to')
            .appendField(new Blockly.FieldDropdown(BACKDROP_OPTIONS), 'COLOR');
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

Blockly.Blocks.ace_sound_play = {
    init() {
        this.appendDummyInput()
            .appendField('play sound')
            .appendField(new Blockly.FieldDropdown(SOUND_PRESET_OPTIONS), 'SOUND');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle('ace_sound_blocks');
        this.setTooltip('Play a built-in sound effect.');
    },
};

javascriptGenerator.forBlock.ace_sound_play = function (block) {
    const sound = block.getFieldValue('SOUND');

    return `await runtime.playSound(${JSON.stringify(sound)});\n`;
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

javascriptGenerator.addReservedWords('runtime,await');

javascriptGenerator.INFINITE_LOOP_TRAP = 'await runtime.checkLoop();\n';
