'use client';

import { motion } from 'motion/react';
import { Star, GitFork, Clock, ExternalLink } from 'lucide-react';
import type { GitHubRepo } from '@/lib/github';

function relativeTime(dateString: string) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (diffDays < 1) return 'today';
  if (diffDays < 30) return rtf.format(-diffDays, 'day');
  if (diffDays < 365) return rtf.format(-Math.round(diffDays / 30), 'month');
  return rtf.format(-Math.round(diffDays / 365), 'year');
}

export function GitHubActivityGrid({ repos }: { repos: GitHubRepo[] }) {
  return (
    <motion.div
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {repos.map((repo) => (
        <motion.a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
          }}
          className="group clip-angular-sm border border-neutral-800 bg-neutral-900/50 p-5 flex flex-col gap-3 transition-colors hover:border-glitch-cyan"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-mono text-neutral-100 group-hover:text-white break-all">
              {repo.name}
            </h3>
            <ExternalLink className="h-4 w-4 shrink-0 text-neutral-600 group-hover:text-glitch-cyan transition-colors" />
          </div>
          {repo.description && (
            <p className="text-sm text-neutral-500 line-clamp-2">{repo.description}</p>
          )}
          <div className="mt-auto flex items-center gap-4 text-xs font-mono text-neutral-500 pt-2">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5" /> {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="h-3.5 w-3.5" /> {repo.forks_count}
            </span>
            <span className="flex items-center gap-1 ml-auto">
              <Clock className="h-3.5 w-3.5" /> {relativeTime(repo.pushed_at)}
            </span>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
}
