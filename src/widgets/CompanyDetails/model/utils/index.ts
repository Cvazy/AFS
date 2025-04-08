export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}.${month}.${year}`;
};

export const formatCompanyTypes = (types: string[]): string => {
  return types
    .map((type) =>
      type
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    )
    .join(", ");
};

export const parseDateInput = (input: string): string => {
  const [day, month, year] = input.split(".");
  return new Date(`${year}-${month}-${day}`).toISOString();
};
