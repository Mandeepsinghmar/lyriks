export function replaceImageSize(url, width = 500, height = 500) {
  return url?.replace('{w}', width)?.replace('{h}', height);
}
