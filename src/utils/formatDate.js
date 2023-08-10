const defaultOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const formatDate = ({
  dateStr = new Date(),
  daysLater = 0,
  options = defaultOptions,
  dateInput = false,
} = {}) => {
  const date = new Date(dateStr);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  date.setDate(date.getDate() + daysLater);
  return dateInput ? date.toISOString().split('T')[0] : date.toLocaleDateString('en-US', options);
};

export default formatDate;
