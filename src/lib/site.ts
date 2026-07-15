export const REPOSITORY_NAME = 'Eduardo_Sacahui_Resume';
export const PRODUCTION_SITE_URL = `https://bernydotjar.github.io/${REPOSITORY_NAME}`;

export const basePath = process.env.NODE_ENV === 'production' ? `/${REPOSITORY_NAME}` : '';

export const withBasePath = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
};
