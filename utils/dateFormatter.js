/**
 * Utility functions for date parsing and formatting.
 */

function getFormattedDateString(date = new Date(), timeZone = 'Asia/Kolkata') {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const parts = formatter.formatToParts(date);
  const month = parts.find(p => p.type === 'month').value;
  const day = parts.find(p => p.type === 'day').value;
  const year = parts.find(p => p.type === 'year').value;
  return `${year}-${month}-${day}`;
}

function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

module.exports = {
  getFormattedDateString,
  isValidDate
};
