import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { countries as Country } from '@prisma/client';
import { footerSection } from './sections/footer.section';

interface ReportOptions {
  title?: string;
  subtitle?: string;
  countries: Country[];
}

export const getCouentriesReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { title, subtitle, countries } = options;
  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title: title ?? 'Countries Report',
      subtittle: subtitle ?? 'list of countries',
      showLogo: true,
    }),
    footer: function (currentPage, pageCount) {
      const footerdate = footerSection(currentPage, pageCount);
      //return currentPage.toString() + ' of ' + pageCount;
      return footerdate;
    },
    pageMargins: [40, 100, 40, 60],
    content: [
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [50, 50, 50, '*', '*', '*'],
          body: [
            ['ID', 'Iso2', 'Iso3', 'Name', 'Local Name', 'Continent'],
            ...countries.map((country) => [
              country.id.toString(),
              country.iso2,
              country.iso3,
              country.name,
              country.local_name,
              country.continent,
            ]),
          ],
        },
      },
    ],
  };
};
