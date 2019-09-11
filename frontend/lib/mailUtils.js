import 'moment/locale/de';

import moment from 'moment';

moment.locale('de');

export const formatTimestamp = timestamp => {
  return moment(timestamp).format('DD.MM.YYYY HH:mm');
};

export const bodyHtmlVersion = plainText => {
  let converted = plainText.replace(/\\r\\n/g, '<br/>');
  converted = converted.replace(/\\n/g, '<br/>');

  return converted;
};
