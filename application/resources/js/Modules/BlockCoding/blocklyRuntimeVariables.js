import * as Blockly from 'blockly/core';
import { Order, javascriptGenerator } from 'blockly/javascript';

function variableIdFromBlock(block) {
    const field = block.getField('VAR');

    return field?.getVariable()?.getId() ?? null;
}

function variableIdExpression(block) {
    const id = variableIdFromBlock(block);

    return id ? JSON.stringify(id) : 'null';
}

export function installRuntimeVariableGenerators() {
    if (javascriptGenerator.__aceRuntimeVariablesInstalled) {
        return;
    }

    javascriptGenerator.forBlock.variables_get = function variablesGet(block) {
        return [`runtime.getVariableById(${variableIdExpression(block)})`, Order.ATOMIC];
    };

    javascriptGenerator.forBlock.variables_set = function variablesSet(block, generator) {
        const value = generator.valueToCode(block, 'VALUE', Order.ASSIGNMENT) || '0';

        return `runtime.setVariableById(${variableIdExpression(block)}, ${value});\n`;
    };

    javascriptGenerator.forBlock.math_change = function mathChange(block, generator) {
        const delta = generator.valueToCode(block, 'DELTA', Order.ADDITION) || '0';

        return `runtime.changeVariableById(${variableIdExpression(block)}, ${delta});\n`;
    };

    javascriptGenerator.forBlock.variables_get_dynamic = function variablesGetDynamic(block) {
        return [`runtime.getVariableById(${variableIdExpression(block)})`, Order.ATOMIC];
    };

    javascriptGenerator.forBlock.variables_set_dynamic = function variablesSetDynamic(block, generator) {
        const value = generator.valueToCode(block, 'VALUE', Order.ASSIGNMENT) || '0';

        return `runtime.setVariableById(${variableIdExpression(block)}, ${value});\n`;
    };

    javascriptGenerator.__aceRuntimeVariablesInstalled = true;
}

function insertMonitorCheckbox(block) {
    const firstInput = block.inputList[0];

    if (firstInput && !block.getField('MONITOR')) {
        firstInput.insertFieldAt(0, new Blockly.FieldCheckbox('FALSE'), 'MONITOR');
    }
}

export function attachVariableMonitorCheckboxes() {
    for (const blockType of ['variables_get', 'lists_length', 'lists_isEmpty']) {
        const definition = Blockly.Blocks[blockType];

        if (!definition || definition.__aceVariableMonitorAttached) {
            continue;
        }

        const originalInit = definition.init;

        definition.init = function initWithVariableMonitorCheckbox() {
            originalInit.call(this);
            insertMonitorCheckbox(this);
        };

        definition.__aceVariableMonitorAttached = true;
    }
}
