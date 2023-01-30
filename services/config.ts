// GitHub

const GITHUB_API_HOST = 'https://api.github.com';

export const GITHUB_GRAPHQL_API_URL = `${GITHUB_API_HOST}/graphql`;

export const GITHUB_MARKDOWN_API_URL = `${GITHUB_API_HOST}/markdown`;

export const GITHUB_REPOS_API_URL = `${GITHUB_API_HOST}/repos`;

export const GITHUB_INSTALLATIONS_URL = `${GITHUB_API_HOST}/app/installations`;

export const GITHUB_REPO_INSTALLATION_URL = (repoWithOwner: string) =>
  `${GITHUB_API_HOST}/repos/${repoWithOwner}/installation`;

export const GITHUB_ACCESS_TOKEN_URL = (id: number) =>
  `${GITHUB_INSTALLATIONS_URL}/${id}/access_tokens`;

// Config for caching installation access tokens
export const CACHE_INSTALLATION_ACCESS_TOKENS =
  process.env.CACHE_INSTALLATION_ACCESS_TOKENS === 'true';
export const CACHE_TYPE = process.env.CACHE_TYPE || 'supabase';

// Bit.io
export const CACHE_BIT_IO_KEY = process.env.CACHE_BIT_IO_KEY;
export const CACHE_BIT_IO_URL = process.env.CACHE_BIT_IO_URL;
export const CACHE_BIT_IO_DATABASE = process.env.CACHE_BIT_IO_DATABASE;
export const CACHE_BIT_IO_TABLE = process.env.CACHE_BIT_IO_TABLE || 'installation_access_tokens';

// Supabase
export const SUPABASE_KEY = process.env.SUPABASE_KEY;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_INSTALLATION_ACCESS_TOKENS_TABLE =
  process.env.SUPABASE_INSTALLATION_ACCESS_TOKENS_TABLE || 'installation_access_tokens';

export const SUPABASE_INSTALLATION_ACCESS_TOKENS_URL = `${SUPABASE_URL}/rest/v1/${SUPABASE_INSTALLATION_ACCESS_TOKENS_TABLE}`;
