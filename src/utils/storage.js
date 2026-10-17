export const readStorage = (key, fallback = null) => {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
};

export const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    return;
  }
};

export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
    return;
  }
};

export const readNumber = (key) => {
  const value = Math.floor(Number(readStorage(key)));
  return Number.isFinite(value) && value > 0 ? value : 0;
};

export const readList = (key) => {
  try {
    const parsed = JSON.parse(readStorage(key, "[]"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};
