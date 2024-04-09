import { FulfillmentsService } from './fulfillments.service';
export declare class FulfillmentsController {
    private readonly fulfillmentService;
    constructor(fulfillmentService: FulfillmentsService);
    getOne(): Promise<any>;
}
