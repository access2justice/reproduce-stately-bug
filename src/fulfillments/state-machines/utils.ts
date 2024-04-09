import { Project } from 'ts-morph';
import { SendEventDto } from '../dto/send-event.dto';

export const compileMachineEventsInterface = (
  filePath: string,
): SendEventDto[] => {
  const project = new Project({
    // Specify TypeScript settings if needed
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
        if (
          n.getText().includes('events:') &&
          n.getText().includes('initial:') &&
          n.getText().includes('states:')
        ) {
          const properties = (n as any).getProperties();
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

                  s.filter((k) => k.constructor.name === 'TypeLiteralNode').map(
                    (t) => {
                      const eventObject = {};
                      const props = t.getProperties();
                      props.map((pS) => {
                        if (pS.getStructure().name === 'type') {
                          eventObject['name'] = pS
                            .getStructure()
                            .type.replaceAll("'", '');
                        } else {
                          eventObject['params'] = Object.assign(
                            eventObject['params'] || {},
                            {
                              [pS.getStructure().name]: pS
                                .getStructure()
                                .type.replaceAll("'", ''),
                            },
                          );
                        }
                      });
                      events.push(eventObject);
                    },
                  );
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
