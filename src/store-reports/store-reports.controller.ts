import { Controller, Get, Param } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('orders/:orderId')
  async getOderReport(@Param('orderId') orderId: string) {
    // return this.storeReportsService.getOrderByIdReport(+orderId);
    return 'hola mundo';
  }
}
