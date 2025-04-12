import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { DateFormatter } from 'src/helpers';

interface ReportValues {
  employerName: string;
  employerPosition: string;
  employeeName: string;
  employeestartDate: Date;
  employeePosition: string;
  employeeHours: number;
  employeeWorkSchedule: string;
  employeeCompany: string;
}

const style: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 50, 0, 20],
  },
  body: {
    margin: [0, 0, 0, 90],
    alignment: 'justify',
  },
  signature: {
    fontSize: 14,
    bold: true,
    margin: [0, 60, 0, 30],
  },
  footer: {
    fontSize: 10,
    bold: true,
    alignment: 'center',
    margin: [0, 0, 0, 20],
  },
};

export const getEmploymentLetterReportById = (
  values: ReportValues,
): TDocumentDefinitions => {
  const {
    employerName,
    employerPosition,
    employeeName,
    employeestartDate,
    employeePosition,
    employeeHours,
    employeeWorkSchedule,
    employeeCompany,
  } = values;
  const docDefinition: TDocumentDefinitions = {
    styles: style,
    pageMargins: [40, 60, 40, 60],

    header: headerSection({
      showLogo: true,
      showDate: true,
    }),
    content: [
      {
        text: 'Constacia de empleo',
        style: 'header',
      },
      {
        text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employeeCompany}, por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra empresa desde el ${DateFormatter.getDDMMMYYYY(employeestartDate)}.\n
Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.\n
La jornada laboral del Sr./ Sra. ${employeeName} es de ${employeeHours} horas semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa.\n
Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.\n\n`,
        style: 'body',
      },
      {
        text: `Atentamente:
        ${employerName}
        ${employerPosition}
        ${employeeCompany}
        ${DateFormatter.getDDMMMYYYY(new Date())}`,
        style: 'signature',
      },
    ],

    footer: {
      text: 'Este documento es una constancia  no representa un compromiso laboral.',
      style: `footer`,
    },
  };

  return docDefinition;
};
