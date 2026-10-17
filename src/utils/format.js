const numberFormatter = new Intl.NumberFormat("pt-BR");

export const formatNumber = (value) => numberFormatter.format(value);
