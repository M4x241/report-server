import { Controller, Get, Param, Res } from '@nestjs/common';
import { BasicReportService } from './basic-report.service';
import { Response } from 'express';

@Controller('basic-report')
export class BasicReportController {
  constructor(private readonly basicReportService: BasicReportService) {}

  @Get()
  hello(@Res() response: Response) {
    const pdfDoc = this.basicReportService.hello();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Wolf Code';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  async employmentLetter(@Res() response: Response) {
    const pdfDoc = await this.basicReportService.employmentLetter();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment Letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
  @Get('employment-letter/:id')
  async employmentLetterID(@Res() response: Response, @Param('id') id: string) {
    const pdfDoc = await this.basicReportService.employmentLetterById(+id);

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment Letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
  @Get('countries')
  async countries(@Res() response: Response) {
    const pdfDoc = await this.basicReportService.getCountry();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Countries-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
