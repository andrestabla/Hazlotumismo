const dateTimeFormatter = new Intl.DateTimeFormat("es-CO", {
  dateStyle: "medium",
  timeStyle: "short",
});

const dateOnlyFormatter = new Intl.DateTimeFormat("es-CO", {
  dateStyle: "medium",
  timeZone: "UTC",
});

export function formatDateTime(value?: Date | string | null) {
  if (!value) {
    return "Sin fecha";
  }

  return dateTimeFormatter.format(new Date(value));
}

export function formatDateOnly(value?: Date | string | null) {
  if (!value) {
    return "Sin fecha";
  }

  if (typeof value === "string") {
    return dateOnlyFormatter.format(new Date(`${value}T00:00:00.000Z`));
  }

  return dateOnlyFormatter.format(value);
}
