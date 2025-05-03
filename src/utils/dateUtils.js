export const formatDate = (dateString, locale = 'ko-KR') => {
  const date = new Date(dateString);

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateTime = (dateString, locale = 'ko-KR') => {
  const date = new Date(dateString);
  const dateFormat = date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const timeFormat = date.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return `${dateFormat} ${timeFormat}`;
};

export const formatTime = (dateString, locale = 'ko-KR') => {
  const date = new Date(dateString);
  return date.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
