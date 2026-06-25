/** Prefijo para GitHub Pages (`/agencia-demo`). Vacío en desarrollo local. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Ruta pública con basePath (imágenes, videos en /public). */
export function assetPath(path: string): string {
  if (!path || path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}
