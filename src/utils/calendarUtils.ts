/**
 * 產生 Google Calendar 連結
 */
export const generateGoogleCalendarUrl = (data: {
  title: string;
  startTime: string; // yyyy-MM-dd HH:mm
  location: string;
  details: string;
}) => {
  const start = new Date(data.startTime.replace(/-/g, '/'));
  const end = new Date(start.getTime() + 90 * 60 * 1000); // 預設 90 分鐘

  const format = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, '');
  
  const url = new URL('https://www.google.com/calendar/render');
  url.searchParams.append('action', 'TEMPLATE');
  url.searchParams.append('text', data.title);
  url.searchParams.append('dates', `${format(start)}/${format(end)}`);
  url.searchParams.append('details', data.details);
  url.searchParams.append('location', data.location);
  
  return url.toString();
};

/**
 * 產生並下載 iCal (.ics) 檔案
 */
export const downloadIcalFile = (data: {
  title: string;
  startTime: string;
  location: string;
  details: string;
}) => {
  const start = new Date(data.startTime.replace(/-/g, '/'));
  const end = new Date(start.getTime() + 90 * 60 * 1000);

  const format = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, '');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PROID:-//Xingang Bagua Maze//NONSGML v1.0//EN',
    'BEGIN:VEVENT',
    `DTSTART:${format(start)}`,
    `DTEND:${format(end)}`,
    `SUMMARY:${data.title}`,
    `LOCATION:${data.location}`,
    `DESCRIPTION:${data.details.replace(/\n/g, '\\n')}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'event.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
