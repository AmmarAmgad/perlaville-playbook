export const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/perlaville-playbook" : "";

export function assetPath(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${cleanPath}`;
}
