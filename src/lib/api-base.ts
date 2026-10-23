const DEVELOPMENT_API_BASE_URL = 'http://localhost:3001/api/v1';

export function getApiBaseUrl(): string {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  const baseUrl = configuredBaseUrl ||
    (process.env.NODE_ENV === 'development' ? DEVELOPMENT_API_BASE_URL : undefined);

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is required outside development.');
  }

  let parsedBaseUrl: URL;
  try {
    parsedBaseUrl = new URL(baseUrl);
  } catch {
    throw new Error('NEXT_PUBLIC_API_BASE_URL must be an absolute HTTP or HTTPS URL.');
  }

  if (!['http:', 'https:'].includes(parsedBaseUrl.protocol)) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL must use HTTP or HTTPS.');
  }
  if (process.env.NODE_ENV === 'production' && parsedBaseUrl.protocol !== 'https:') {
    throw new Error('NEXT_PUBLIC_API_BASE_URL must use HTTPS in production.');
  }
  if (parsedBaseUrl.username || parsedBaseUrl.password) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL must not contain credentials.');
  }

  return baseUrl.replace(/\/+$/, '');
}
