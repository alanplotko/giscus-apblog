export const env = {
  app_id: process.env.GITHUB_APP_ID,
  client_id: process.env.GITHUB_CLIENT_ID,
  client_secret: process.env.GITHUB_CLIENT_SECRET,
  installation_id: process.env.GITHUB_INSTALLATION_ID,
  token: process.env.GITHUB_TOKEN,
  private_key: process.env.GITHUB_PRIVATE_KEY,
  encryption_password: process.env.ENCRYPTION_PASSWORD,
  app_host: process.env.NEXT_PUBLIC_GISCUS_APP_HOST.startsWith('http://')
    ? (process.env.NEXT_PUBLIC_GISCUS_APP_HOST as `http://${string}`)
    : (process.env.NEXT_PUBLIC_GISCUS_APP_HOST as `https://${string}`),
  revalidate_first_page: process.env.NEXT_PUBLIC_REVALIDATE_FIRST_PAGE !== 'false',
  origins: JSON.parse(process.env.ORIGINS || '[]') as string[],
  origins_regex: JSON.parse(process.env.ORIGINS_REGEX || '[]') as string[],
  comments_show_linkback: process.env.COMMENTS_SHOW_LINKBACK !== 'false',
  show_branding: process.env.SHOW_BRANDING !== 'false',
  giscus_setup_complete: process.env.GISCUS_SETUP_COMPLETE === 'true',
} as const;

export const availableThemes = [
  'light',
  'light_high_contrast',
  'light_protanopia',
  'light_tritanopia',
  'dark',
  'dark_high_contrast',
  'dark_protanopia',
  'dark_tritanopia',
  'dark_dimmed',
  'transparent_dark',
  'preferred_color_scheme',
  'custom',
] as const;

export type AvailableTheme = (typeof availableThemes)[number];

export type Theme = AvailableTheme | `/${string}` | `http://${string}` | `https://${string}`;
