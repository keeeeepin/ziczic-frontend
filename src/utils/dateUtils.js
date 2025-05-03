export const formatDate = (dateString, locale = 'ko-KR') => {
  const date = new Date(dateString);

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
