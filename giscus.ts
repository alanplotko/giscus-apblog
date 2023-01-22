import { IRepoConfig } from './lib/types/giscus';
import { env } from './lib/variables';

export const repoConfig: IRepoConfig = {
  origins: env.origins,
  originsRegex: env.origins_regex,
  defaultCommentOrder: 'oldest',
};
