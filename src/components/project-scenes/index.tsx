import type { ComponentType } from 'react';
import type { ProjectTheme } from '@/data/projects';
import { NightRoundsScene } from './NightRoundsScene';
import { LedgerScene } from './LedgerScene';
import { SetsScene } from './SetsScene';
import { RouteScene } from './RouteScene';
import { CampaignScene } from './CampaignScene';
import { RankingScene } from './RankingScene';
import { TerminalScene } from './TerminalScene';

const SCENES: Record<ProjectTheme, ComponentType> = {
  'night-rounds': NightRoundsScene,
  ledger: LedgerScene,
  sets: SetsScene,
  route: RouteScene,
  campaign: CampaignScene,
  ranking: RankingScene,
  terminal: TerminalScene,
};

/** The small looping animation that shows what a project does. */
export function ProjectScene({ theme }: { theme: ProjectTheme }) {
  const Scene = SCENES[theme];
  return <Scene />;
}
