import { Controller, Get, Param } from '@nestjs/common';
import { FulfillmentsService } from './fulfillments.service';

@Controller('fulfillments')
export class FulfillmentsController {
  constructor(private readonly fulfillmentService: FulfillmentsService) {}

  @Get()
  async getOne(): Promise<any> {
    await this.fulfillmentService.getStateLoaded();
  }
}
