import { InstallationAccessToken } from '../../lib/types/tokenCache';
import {
  CACHE_BIT_IO_DATABASE,
  CACHE_BIT_IO_KEY,
  CACHE_BIT_IO_TABLE,
  CACHE_BIT_IO_URL,
  CACHE_INSTALLATION_ACCESS_TOKENS,
  CACHE_TYPE,
  SUPABASE_INSTALLATION_ACCESS_TOKENS_URL,
  SUPABASE_KEY,
} from '../config';

async function getTokenFromSupabase(installationId: number) {
  const params = new URLSearchParams({
    select: '*',
    installation_id: `eq.${installationId}`,
  });
  const url = `${SUPABASE_INSTALLATION_ACCESS_TOKENS_URL}?${params}`;

  const response = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Accept: 'application/vnd.pgrst.object+json',
      Range: '0',
    },
  });

  if (!response.ok) return '';

  return await response.json();
}

async function saveTokenToSupabase({
  installation_id,
  token,
  expires_at,
}: InstallationAccessToken) {
  const params = new URLSearchParams({
    installation_id: `eq.${installation_id}`,
  });
  const url = `${SUPABASE_INSTALLATION_ACCESS_TOKENS_URL}?${params}`;

  const body: InstallationAccessToken = {
    installation_id,
    token,
    expires_at,
    updated_at: new Date().toISOString(),
  };

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Accept: 'application/vnd.pgrst.object+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return response.ok;
}

async function getTokenFromBitIo(installationId: number) {
  const url = CACHE_BIT_IO_URL;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${CACHE_BIT_IO_KEY}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query_string: `SELECT * FROM ${CACHE_BIT_IO_TABLE} WHERE installation_id = ${installationId} LIMIT 1;`,
      database_name: CACHE_BIT_IO_DATABASE,
    }),
  });

  if (!response.ok) return '';

  const result = await response.json();
  return result.data.length === 0 ? '' : result.data[0];
}

async function saveTokenToBitIo({ installation_id, token, expires_at }: InstallationAccessToken) {
  const url = CACHE_BIT_IO_URL;
  const query = `INSERT INTO ${CACHE_BIT_IO_TABLE} (installation_id, token, expires_at) VALUES('${installation_id}', '${token}', '${expires_at}') ON CONFLICT (installation_id) DO UPDATE SET token = EXCLUDED.token, expires_at = EXCLUDED.expires_at, updated_at = DEFAULT;`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${CACHE_BIT_IO_KEY}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query_string: query,
      database_name: CACHE_BIT_IO_DATABASE,
    }),
  });

  return response.ok;
}

export async function getCachedAccessToken(installationId: number) {
  if (!CACHE_INSTALLATION_ACCESS_TOKENS) return '';

  let response: InstallationAccessToken = null;
  switch (CACHE_TYPE) {
    case 'supabase': {
      response = await getTokenFromSupabase(installationId);
      break;
    }
    case 'bit.io': {
      response = await getTokenFromBitIo(installationId);
      break;
    }
    default: {
      return '';
    }
  }

  const expiresAt = new Date(response.expires_at).getTime();
  const now = new Date().getTime();
  const intolerance = 300000; // 5 minutes in milliseconds

  if (expiresAt - now < intolerance) return '';

  return response.token;
}

export async function setCachedAccessToken(token: InstallationAccessToken) {
  if (!CACHE_INSTALLATION_ACCESS_TOKENS) return '';

  let response = null;
  switch (CACHE_TYPE) {
    case 'supabase': {
      response = saveTokenToSupabase(token);
      break;
    }
    case 'bit.io': {
      response = saveTokenToBitIo(token);
      break;
    }
    default: {
      return '';
    }
  }

  return response;
}
