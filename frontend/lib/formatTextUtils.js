export const formatMarkdownPDF = text => {
  // everything between ** is bold
  if (!text || text.length === 0) return text;

  while (text.indexOf('**') >= 0) {
    const firstPos = text.indexOf('**');
    const nextPos = text.indexOf('**', firstPos + 1);
    const preFirst = text.substring(0, firstPos);
    const actual = text.substring(firstPos + 2, nextPos);
    const afterNext = text.substring(nextPos + 2);

    text =
      preFirst + '<Text style={styles.bold}>' + actual + '</Text>' + afterNext;
  }
  return text;
};
