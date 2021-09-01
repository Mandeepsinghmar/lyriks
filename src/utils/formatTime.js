export const formatTime = (secs) => {
  const t = new Date(1970, 0, 1);

  t.setSeconds(secs);

  let s = t.toTimeString().substr(0, 8);

  if (secs > 86399) s = Math.floor((t - Date.parse('1/1/70')) / 3600000) + s.substr(2);

  return s.substring(3);
};
