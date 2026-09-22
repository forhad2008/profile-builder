import React from 'react';
import { PortfolioData } from '../../types/portfolio';
import { NeoMinimalistTemplate } from './NeoMinimalistTemplate';
import { DarkModernTechTemplate } from './DarkModernTechTemplate';
import { BentoCreativeTemplate } from './BentoCreativeTemplate';
import { ExecutiveSerifTemplate } from './ExecutiveSerifTemplate';
import { BrutalistIndieTemplate } from './BrutalistIndieTemplate';
import { AuroraGradientTemplate } from './AuroraGradientTemplate';
import { TerminalConsoleTemplate } from './TerminalConsoleTemplate';
import { ArtisanEarthTemplate } from './ArtisanEarthTemplate';
import { SplitScreenTemplate } from './SplitScreenTemplate';
import { Showcase3DVisualTemplate } from './Showcase3DVisualTemplate';

interface Props {
  data: PortfolioData;
}

export const TemplateRenderer: React.FC<Props> = ({ data }) => {
  switch (data.themeConfig.templateId) {
    case 'minimal':
      return <NeoMinimalistTemplate data={data} />;
    case 'darktech':
      return <DarkModernTechTemplate data={data} />;
    case 'bento':
      return <BentoCreativeTemplate data={data} />;
    case 'executive':
      return <ExecutiveSerifTemplate data={data} />;
    case 'brutalist':
      return <BrutalistIndieTemplate data={data} />;
    case 'aurora':
      return <AuroraGradientTemplate data={data} />;
    case 'terminal':
      return <TerminalConsoleTemplate data={data} />;
    case 'artisan':
      return <ArtisanEarthTemplate data={data} />;
    case 'splitscreen':
      return <SplitScreenTemplate data={data} />;
    case 'showcase':
      return <Showcase3DVisualTemplate data={data} />;
    default:
      return <NeoMinimalistTemplate data={data} />;
  }
};
