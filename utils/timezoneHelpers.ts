export interface CurrentTimezoneInfo {
  hours: string;
  minutes: string;
  period?: string;
  cityName: string;
  gmtOffset: string;
  isDaytime: boolean;
}

export function getCurrentTimezoneInfo(): CurrentTimezoneInfo {
  const now = new Date();
  const userLocale = Intl.DateTimeFormat().resolvedOptions().locale;
  const userOptions = Intl.DateTimeFormat(userLocale, {
    hour: 'numeric',
  }).resolvedOptions();
  const timezone = userOptions.timeZone;
  const timeString = now.toLocaleTimeString(userLocale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: userOptions.hour12,
    timeZone: timezone,
  });
  const [time, period] = timeString.split(' ');
  const [hours, minutes] = time.split(':');

  const cityName = timezone.split('/').pop()?.replace('_', ' ') ?? timezone;
  const gmtOffset =
    new Intl.DateTimeFormat(userLocale, {
      timeZone: timezone,
      timeZoneName: 'short',
    })
      .formatToParts(now)
      .find((part) => part.type === 'timeZoneName')?.value ?? '';

  const hour = now.getHours();
  const isDaytime = hour >= 6 && hour < 18;

  return {
    hours: Number(hours) < 10 ? `0${hours}` : hours,
    minutes,
    period: period,
    cityName,
    gmtOffset,
    isDaytime,
  };
}
