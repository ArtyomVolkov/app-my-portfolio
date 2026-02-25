import { Development, Language as ELanguage, Technology as ETechnology, Tool as ETool } from '@shared/enums/develop';

interface Entity<T> {
  key: T,
  label: string,
}
export interface Technology extends Entity<typeof ETechnology> {
  type: typeof Development.TECHNOLOGY,
}

export interface Tool extends Entity<typeof ETool> {
  link?: string,
  type: typeof Development.TOOL,
}

export interface Language extends Entity<typeof ELanguage> {
  prefix: string,
  type: typeof Development.PL,
}

export interface Project {
  name: string,
  description: string,
  technologies: Array<Language | Tool | Technology>,
  responsibilities: Array<string>,
  countryCode: string,
  period: string,
}
