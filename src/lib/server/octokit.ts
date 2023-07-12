import { env } from '$env/dynamic/private';
import { Octokit } from '@octokit/core';

export const octokit = new Octokit({ auth: env.GITHUB_TOKEN });
