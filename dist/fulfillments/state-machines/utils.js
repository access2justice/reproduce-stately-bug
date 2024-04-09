"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileMachineEventsInterface = void 0;
const ts_morph_1 = require("ts-morph");
const compileMachineEventsInterface = (filePath) => {
    const project = new ts_morph_1.Project({
        compilerOptions: {
            strict: true,
        },
    });
    const sourceFile = project.addSourceFileAtPath(filePath);
    const machine = sourceFile.getVariableDeclaration('machine');
    const events = [];
    machine.getChildren().map((n) => {
        if (n.getText().includes('createMachine(')) {
            n.forEachChild((n) => {
                if (n.getText().includes('events:') &&
                    n.getText().includes('initial:') &&
                    n.getText().includes('states:')) {
                    const properties = n.getProperties();
                    for (const property of properties) {
                        if (property.getName() === 'types') {
                            const children = property.getChildren();
                            for (const child of children) {
                                if (child.getText().includes('events: ')) {
                                    const s = child
                                        .getProperties()[0]
                                        .getChildren()[2]
                                        .getChildren()[2]
                                        .getChildren()[0]
                                        .getChildren();
                                    s.filter((k) => k.constructor.name === 'TypeLiteralNode').map((t) => {
                                        const eventObject = {};
                                        const props = t.getProperties();
                                        props.map((pS) => {
                                            if (pS.getStructure().name === 'type') {
                                                eventObject['name'] = pS
                                                    .getStructure()
                                                    .type.replaceAll("'", '');
                                            }
                                            else {
                                                eventObject['params'] = Object.assign(eventObject['params'] || {}, {
                                                    [pS.getStructure().name]: pS
                                                        .getStructure()
                                                        .type.replaceAll("'", ''),
                                                });
                                            }
                                        });
                                        events.push(eventObject);
                                    });
                                }
                            }
                        }
                    }
                }
            });
        }
    });
    return events;
};
exports.compileMachineEventsInterface = compileMachineEventsInterface;
//# sourceMappingURL=utils.js.map