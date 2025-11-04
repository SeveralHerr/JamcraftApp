import { PortfolioProject } from '../entities/PortfolioProject';
import { PORTFOLIO_PROJECTS_DATA } from '../data/portfolio-projects-data';

export class GetPortfolioProjects {
  execute(): PortfolioProject[] {
    return PORTFOLIO_PROJECTS_DATA;
  }
}
