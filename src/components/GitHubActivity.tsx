import { getRecentRepos } from '@/lib/github';
import { GitHubActivityGrid } from '@/components/GitHubActivityGrid';

interface GitHubActivityProps {
  limit?: number;
}

export async function GitHubActivity({ limit = 6 }: GitHubActivityProps) {
  const repos = await getRecentRepos(limit);

  if (repos.length === 0) return null;

  return <GitHubActivityGrid repos={repos} />;
}
