export const generateApiKey = () => {
  const array = new Uint8Array(24);
  crypto.getRandomValues(array);
  const hex = Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
  return `pa_live_${hex}`;
};
