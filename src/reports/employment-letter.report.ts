import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';

const style: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 50, 0, 20],
  },
  body: {
    margin: [0, 0, 0, 50],
    alignment: 'justify',
  },
  signature: {
    fontSize: 14,
    bold: true,
    margin: [0, 0, 0, 30],
  },
  footer: {
    fontSize: 10,
    bold: true,
    alignment: 'center',
    margin: [0, 0, 0, 20],
  },
};

export const getEmploymentLetterReport = (): TDocumentDefinitions => {
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
        text: `Yo, [Nombre del Empleador], en mi calidad de [Cargo del Empleador] de [Nombre de la Empresa], por medio de la presente certifico que [Nombre del Empleado] ha sido empleado en nuestra empresa desde el [Fecha de Inicio del Empleado].\n
Durante su empleo, el Sr./Sra. [Nombre del Empleado] ha desempeñado el cargo de [Cargo del Empleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.\n
La jornada laboral del Sr./ Sra. [Nombre del Empleado] es de [Número de Horas] horas semanales, con un horario de [Horario de Trabajo], cumpliendo con las políticas y
procedimientos establecidos por la empresa. Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.\n\n`,
        style: 'body',
      },
      {
        text: `Atentamente, \n`,
        style: 'signature',
      },
      {
        text: `[Nombre del Empleador]
        [Cargo del Empleador]
        [Nombre de la Empresa]
        [Fecha de Emisión]`,
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
