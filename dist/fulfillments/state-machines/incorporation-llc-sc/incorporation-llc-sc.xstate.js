"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.machine = void 0;
const xstate_1 = require("xstate");
exports.machine = (0, xstate_1.setup)({
    types: {
        context: {},
        events: {},
    },
    guards: {
        'Order Contains Contribution in Kind': function ({ context, event }) {
            return true;
        },
        'No consent ZKB': function ({ context, event }) {
            return true;
        },
        'IF Contains Capital Payment Confirmation': function ({ context, event }) {
            return true;
        },
        'Paid In Capital Contribution Documents are Correct': function ({ context, event, }) {
            return true;
        },
        'Signed Properly': function ({ context, event }) {
            return true;
        },
        'Ordered VAT': function ({ context, event }) {
            return true;
        },
        'Ordered AHV': function ({ context, event }) {
            return true;
        },
        'Information is Correct, no Issue': function ({ context, event }) {
            return true;
        },
        'Information is Incorrect/Missing': function ({ context, event }) {
            return true;
        },
        'Express Incorporation OR Payment Full': function ({ context, event }) {
            console.log('Express Incorporation OR Payment Full');
            return true;
        },
        'Documents Correct': function ({ context, event }) {
            return true;
        },
        Full: function ({ context, event }) {
            return true;
        },
        'Full Payment': function ({ context, event }) {
            return true;
        },
        '(MIxed) Contiribution in Kind Documents are Correct': function ({ context, event, }) {
            return true;
        },
    },
    schemas: {
        events: {
            '': {
                type: 'object',
                properties: {},
            },
            Payment: {
                type: 'object',
                properties: {},
                description: '.',
            },
            'Operator Cancels': {
                type: 'object',
                properties: {},
            },
            'ZKB Approves Client': {
                type: 'object',
                properties: {},
            },
            'Operator Raises Issue': {
                type: 'object',
                properties: {},
            },
            'Client Submits LawLift': {
                type: 'object',
                properties: {},
            },
            'Operator Handles Issue': {
                type: 'object',
                properties: {},
            },
            'ZKB Disapproves Client': {
                type: 'object',
                properties: {},
            },
            'Notary Submits Feedback': {
                type: 'object',
                properties: {},
            },
            'Operator Processes Data': {
                type: 'object',
                properties: {},
                description: '',
            },
            'Client Submits Documents': {
                type: 'object',
                properties: {},
            },
            'Client Submits Passports': {
                type: 'object',
                properties: {},
                description: 'Verify whether a valid copy of the passport was received and stored to the database.',
            },
            'ZKB Escalates Compliance': {
                type: 'object',
                properties: {},
            },
            'SOGC Confirms Registration': {
                type: 'object',
                properties: {},
            },
            'ZKB Initiates Compliance Check': {
                type: 'object',
                properties: {},
            },
            'Operator Checks Final Documents': {
                type: 'object',
                properties: {},
            },
            'Operator Handles Issue via Notary': {
                type: 'object',
                properties: {},
            },
            'Client Pays Capital Deposit to ZKB': {
                type: 'object',
                properties: {},
            },
            'Operator Fulfills AHV Registration': {
                type: 'object',
                properties: {},
            },
            'Operator Fulfills VAT Registration': {
                type: 'object',
                properties: {},
            },
            'Operator Processes Notary Submission': {
                type: 'object',
                properties: {},
            },
            'Operator Submits Shareholders Register': {
                type: 'object',
                properties: {},
            },
            'Client Submits Correct/Missing Information': {
                type: 'object',
                properties: {},
            },
            'Commercial Registry Raises Issue via Notary': {
                type: 'object',
                properties: {},
            },
            'ZKB Submits Capital Deposit Feedback to Jurata': {
                type: 'object',
                properties: {},
            },
            'Operator Handles Issue with Commercial Registry': {
                type: 'object',
                properties: {},
            },
            'Operator Submits Request for Capital Deposit to ZKB': {
                type: 'object',
                properties: {},
            },
            'ZKB Sends Capital Deposit Payment Instruction to Jurata': {
                type: 'object',
                properties: {},
            },
            'ZKB Sends Capital Deposit Payment Instructions to Client': {
                type: 'object',
                properties: {},
            },
        },
    },
}).createMachine({
    context: {},
    id: 'Incorporation KG (Version 4)',
    initial: 'Data Preparation',
    on: {
        'Operator Cancels': {
            target: '#Incorporation KG (Version 4).Cancelled',
        },
    },
    states: {
        'Data Preparation': {
            initial: 'Intake',
            onDone: {
                target: 'Document Collection',
            },
            states: {
                Intake: {
                    type: 'parallel',
                    onDone: {
                        target: 'Pending Data Processing by Operator',
                    },
                    states: {
                        LawLift: {
                            initial: 'Waiting',
                            states: {
                                Waiting: {
                                    on: {
                                        'Client Submits LawLift': {
                                            target: 'Received',
                                        },
                                    },
                                },
                                Received: {
                                    type: 'final',
                                },
                            },
                        },
                        Passports: {
                            initial: 'Waiting',
                            states: {
                                Waiting: {
                                    on: {
                                        'Client Submits Passports': {
                                            target: 'Received',
                                        },
                                    },
                                },
                                Received: {
                                    type: 'final',
                                },
                            },
                        },
                        'Payment Requirement': {
                            initial: 'Start',
                            states: {
                                Start: {
                                    always: {
                                        guard: ({ context }) => {
                                            console.log('pup');
                                            return true;
                                        },
                                        target: 'Fulfilled',
                                    },
                                },
                                Fulfilled: {
                                    type: 'final',
                                },
                            },
                        },
                    },
                },
                'Pending Data Processing by Operator': {
                    on: {
                        'Operator Processes Data': [
                            {
                                target: 'Approved',
                                guard: {
                                    type: 'Information is Correct, no Issue',
                                },
                            },
                            {
                                target: 'Waiting for Correct/Missing Information from Client',
                                guard: {
                                    type: 'Information is Incorrect/Missing',
                                },
                            },
                        ],
                    },
                },
                Approved: {
                    type: 'final',
                },
                'Waiting for Correct/Missing Information from Client': {
                    on: {
                        'Client Submits Correct/Missing Information': {
                            target: 'Pending Data Processing by Operator',
                        },
                    },
                },
            },
        },
        'Document Collection': {
            type: 'parallel',
            onDone: {
                target: 'Incorporation Act with Notary',
            },
            states: {
                'Capital Contribution': {
                    initial: 'Pending Capital Contribution Handling by Operator',
                    on: {
                        'Operator Raises Issue': {
                            target: '#Incorporation KG (Version 4).Document Collection.Capital Contribution.Pending Issue Handling by Operator',
                        },
                    },
                    states: {
                        'Pending Capital Contribution Handling by Operator': {
                            on: {
                                'Operator Submits Request for Capital Deposit to ZKB': {
                                    target: 'ZKB',
                                },
                            },
                            always: [
                                {
                                    target: 'Pending (Mixed) Contribution in Kind Handling by Operator',
                                    guard: {
                                        type: 'Order Contains Contribution in Kind',
                                    },
                                },
                                {
                                    target: 'Waiting for Capital Deposit Payment Confirmation from Client',
                                    guard: {
                                        type: 'No consent ZKB',
                                    },
                                },
                            ],
                        },
                        'Pending (Mixed) Contribution in Kind Handling by Operator': {
                            on: {
                                'Operator Checks Final Documents': {
                                    target: 'Approved',
                                    guard: {
                                        type: '(MIxed) Contiribution in Kind Documents are Correct',
                                    },
                                },
                            },
                        },
                        'Waiting for Capital Deposit Payment Confirmation from Client': {
                            on: {
                                'Client Submits Documents': {
                                    target: 'Pending Final Documents Check from Operator',
                                    guard: {
                                        type: 'IF Contains Capital Payment Confirmation',
                                    },
                                },
                            },
                        },
                        ZKB: {
                            initial: 'Waiting for Capital Deposit Feedback from ZKB',
                            states: {
                                'Waiting for Capital Deposit Feedback from ZKB': {
                                    on: {
                                        'ZKB Initiates Compliance Check': {
                                            target: 'Waiting for 1st Compliance Check by ZKB',
                                        },
                                    },
                                },
                                'Waiting for 1st Compliance Check by ZKB': {
                                    on: {
                                        'ZKB Escalates Compliance': {
                                            target: 'Waiting for Escalated Compliance Check by ZKB',
                                        },
                                        'ZKB Approves Client': {
                                            target: 'Approved',
                                        },
                                        'ZKB Disapproves Client': {
                                            target: 'Disapproved',
                                        },
                                    },
                                },
                                'Waiting for Escalated Compliance Check by ZKB': {
                                    on: {
                                        'ZKB Approves Client': {
                                            target: 'Approved',
                                        },
                                        'ZKB Disapproves Client': {
                                            target: 'Disapproved',
                                        },
                                    },
                                },
                                Approved: {
                                    initial: 'Waiting for Capital Deposit Payment Instruction from ZKB to Client',
                                    states: {
                                        'Waiting for Capital Deposit Payment Instruction from ZKB to Client': {
                                            on: {
                                                'ZKB Sends Capital Deposit Payment Instructions to Client': {
                                                    target: 'Waiting for Payment by Client',
                                                },
                                            },
                                        },
                                        'Waiting for Payment by Client': {
                                            on: {
                                                'Client Pays Capital Deposit to ZKB': {
                                                    target: 'Waiting for Capital Deposit Payment Confirmation by ZKB',
                                                },
                                            },
                                        },
                                        'Waiting for Capital Deposit Payment Confirmation by ZKB': {
                                            on: {
                                                'ZKB Sends Capital Deposit Payment Instruction to Jurata': {
                                                    target: '#Incorporation KG (Version 4).Document Collection.Capital Contribution.Pending Final Documents Check from Operator',
                                                },
                                            },
                                        },
                                    },
                                },
                                Disapproved: {
                                    on: {
                                        'ZKB Submits Capital Deposit Feedback to Jurata': {
                                            target: '#Incorporation KG (Version 4).Document Collection.Capital Contribution.Waiting for Capital Deposit Payment Confirmation from Client',
                                        },
                                    },
                                },
                            },
                        },
                        Approved: {
                            type: 'final',
                        },
                        'Pending Final Documents Check from Operator': {
                            on: {
                                'Operator Checks Final Documents': [
                                    {
                                        target: 'Approved',
                                        guard: {
                                            type: 'Paid In Capital Contribution Documents are Correct',
                                        },
                                    },
                                    {
                                        target: 'Pending Issue Handling by Operator',
                                    },
                                ],
                            },
                        },
                        'Pending Issue Handling by Operator': {
                            on: {
                                'Operator Handles Issue': {
                                    target: 'Pending Final Documents Check from Operator',
                                },
                            },
                        },
                    },
                },
                'Signing of Documents': {
                    initial: 'Waiting for Documents from Client',
                    states: {
                        'Waiting for Documents from Client': {
                            on: {
                                'Client Submits Documents': {
                                    target: 'Pending Final Documents Check from Operator',
                                },
                            },
                        },
                        'Pending Final Documents Check from Operator': {
                            on: {
                                'Operator Checks Final Documents': [
                                    {
                                        target: 'Approved',
                                        guard: {
                                            type: 'Signed Properly',
                                        },
                                    },
                                    {
                                        target: 'Waiting for Documents from Client',
                                    },
                                ],
                            },
                        },
                        Approved: {
                            type: 'final',
                        },
                    },
                },
                'Payment Requirement': {
                    initial: 'Start',
                    states: {
                        Start: {
                            always: [
                                {
                                    target: 'Paid',
                                    guard: {
                                        type: 'Full Payment',
                                    },
                                },
                                {
                                    target: 'Waiting for Payment from Client',
                                },
                            ],
                        },
                        Paid: {
                            type: 'final',
                        },
                        'Waiting for Payment from Client': {
                            on: {
                                Payment: {
                                    target: 'Paid',
                                    guard: {
                                        type: 'Full',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        'Incorporation Act with Notary': {
            initial: 'Pending Processing by Operator',
            onDone: {
                target: 'Registration at Commercial Registry',
            },
            states: {
                'Pending Processing by Operator': {
                    on: {
                        'Operator Processes Notary Submission': {
                            target: 'Waiting for Incorporation by Notary',
                        },
                    },
                },
                'Waiting for Incorporation by Notary': {
                    on: {
                        'Notary Submits Feedback': [
                            {
                                target: 'Incorporated',
                                guard: {
                                    type: 'Documents Correct',
                                },
                            },
                            {
                                target: 'Pending Processing by Operator',
                            },
                        ],
                    },
                },
                Incorporated: {
                    type: 'final',
                },
            },
        },
        'Registration at Commercial Registry': {
            initial: 'Waiting for Registration Confirmation by Commercial Registry',
            onDone: {
                target: 'Finalization',
            },
            states: {
                'Waiting for Registration Confirmation by Commercial Registry': {
                    on: {
                        'SOGC Confirms Registration': {
                            target: 'Registered',
                        },
                        'Commercial Registry Raises Issue via Notary': {
                            target: 'Pending Issue Handling by Operator',
                        },
                    },
                },
                Registered: {
                    type: 'final',
                },
                'Pending Issue Handling by Operator': {
                    on: {
                        'Operator Handles Issue with Commercial Registry': {
                            target: 'Waiting for Registration Confirmation by Commercial Registry',
                        },
                        'Operator Handles Issue via Notary': {
                            target: '#Incorporation KG (Version 4).Incorporation Act with Notary.Pending Processing by Operator',
                        },
                    },
                },
            },
        },
        Finalization: {
            type: 'parallel',
            onDone: {
                target: 'Completed',
            },
            states: {
                'Shareholder Register': {
                    initial: 'Pending Submission by Operator',
                    states: {
                        'Pending Submission by Operator': {
                            on: {
                                'Operator Submits Shareholders Register': {
                                    target: 'Submitted',
                                },
                            },
                        },
                        Submitted: {
                            type: 'final',
                        },
                    },
                },
                'Value Added Tax Registration': {
                    initial: 'Start',
                    states: {
                        Start: {
                            always: [
                                {
                                    target: 'Pending Fulfillment by Operator',
                                    guard: {
                                        type: 'Ordered VAT',
                                    },
                                },
                                {
                                    target: 'Not Ordered',
                                },
                            ],
                        },
                        'Pending Fulfillment by Operator': {
                            on: {
                                'Operator Fulfills VAT Registration': {
                                    target: 'Fulfilled',
                                },
                            },
                        },
                        'Not Ordered': {
                            type: 'final',
                        },
                        Fulfilled: {
                            type: 'final',
                        },
                    },
                },
                'AHV Registration': {
                    initial: 'Start',
                    states: {
                        Start: {
                            always: [
                                {
                                    target: 'Pending Fulfillment by Operator',
                                    guard: {
                                        type: 'Ordered AHV',
                                    },
                                },
                                {
                                    target: 'Not Ordered',
                                },
                            ],
                        },
                        'Pending Fulfillment by Operator': {
                            on: {
                                'Operator Fulfills AHV Registration': {
                                    target: 'Fulfilled',
                                },
                            },
                        },
                        'Not Ordered': {
                            type: 'final',
                        },
                        Fulfilled: {
                            type: 'final',
                        },
                    },
                },
            },
        },
        Completed: {
            type: 'final',
        },
        Cancelled: {
            type: 'final',
        },
    },
});
//# sourceMappingURL=incorporation-llc-sc.xstate.js.map