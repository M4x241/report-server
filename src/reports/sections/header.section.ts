import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

const currentDate: Content = {
  text: DateFormatter.getDDMMMYYYY(new Date()),
  alignment: 'right',
  margin: [0, 20, 10, 20],
  width: 150,
};

interface HeaderOptions {
  title?: string;
  subtittle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { title, subtittle, showLogo = true, showDate = true } = options;
  const headerlogo: Content = showLogo ? logo : null;
  const headerDate: Content = showDate ? currentDate : null;
  const headerSubTittle: Content = subtittle
    ? {
        text: subtittle,
        bold: true,
        fontSize: 18,
        alignment: 'center',
      }
    : null;

  const headerTitle: Content = title
    ? {
        stack: [
          {
            text: title,
            style: {
              bold: true,
              fontSize: 24,
              alignment: 'center',
              margin: [0, 100, 0, 0],
            },
          },
          headerSubTittle,
        ],
      }
    : null;
  return {
    columns: [headerlogo, headerTitle, headerDate],
  };
};
