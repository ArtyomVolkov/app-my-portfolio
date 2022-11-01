import { Language as ELanguage, Tool as ETool, Technology as ETechnology, Development } from '@shared/enums/develop';

interface Entity<T> {
  key: T,
  label: string,
}
export interface Technology extends Entity<ETechnology> {
  type: Development.TECHNOLOGY,
}

export interface Tool extends Entity<ETool> {
  link?: string,
  type: Development.TOOL,
}

export interface Language extends Entity<ELanguage> {
  prefix: string,
  type: Development.PL,
}

export interface Project {
  name: string,
  description: string,
  technologies: Array<Language|Tool|Technology>,
  responsibilities: Array<string>,
  countryCode: string,
  period: string,
}
