import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import {
  getCouentriesReport,
  getEmploymentLetterReport,
  getEmploymentLetterReportById,
  getHelloWorldReport,
} from 'src/reports';

@Injectable()
export class BasicReportService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('database connect');
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  //definicion de la creacion de la impresora
  hello() {
    const docDefinition = getHelloWorldReport({
      name: 'Max',
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  employmentLetter() {
    const docDefinition = getEmploymentLetterReport();

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async employmentLetterById(employmentID: number) {
    const employee = await this.employees.findUnique({
      where: {
        id: employmentID,
      },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const docDefinition = getEmploymentLetterReportById({
      employerName: 'Fernando Herrera',
      employerPosition: 'CEO',
      employeeName: employee.name,
      employeestartDate: employee.start_date,
      employeePosition: employee.position,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employeeCompany: 'Wolf Code Corp.',
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async getCountry() {
    const countries = await this.countries.findMany({
      where: {
        local_name: { not: null },
      },
    });
    const docDefinition = getCouentriesReport({ countries });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}
