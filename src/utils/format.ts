export const formatWalletAddress = (
  address: string,
  start = 4,
  end = 5
): string => {
  if (!address || address.length < start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date";

  const userLocale = navigator.language || "en-US";

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: userLocale.startsWith("en") ? "short" : "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formatter = new Intl.DateTimeFormat(userLocale, options);
  return formatter.format(date).replace(",", " ·");
};
