export const get = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
};

export const set = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
};
