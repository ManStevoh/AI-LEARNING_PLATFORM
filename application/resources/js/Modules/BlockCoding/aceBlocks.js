import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';

Blockly.Blocks.ace_event_green_flag = {
    init() {
        this.appendDummyInput().appendField('when green flag clicked');
        this.appendStatementInput('STACK');
        this.setColour(120);
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
        this.setColour(230);
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
        this.setColour(230);
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
        this.setColour(230);
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
        this.setColour(290);
        this.setTooltip('Show a speech bubble on the sprite.');
    },
};

javascriptGenerator.forBlock.ace_looks_say = function (block, generator) {
    const message = generator.valueToCode(block, 'MESSAGE', Order.NONE) || "''";
    const seconds = generator.valueToCode(block, 'SECONDS', Order.NONE) || '2';

    return `await runtime.say(${message}, ${seconds});\n`;
};

javascriptGenerator.addReservedWords('runtime,await');

javascriptGenerator.INFINITE_LOOP_TRAP = 'await runtime.checkLoop();\n';
