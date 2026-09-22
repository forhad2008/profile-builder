export type TemplateId =
  | 'minimal'
  | 'darktech'
  | 'bento'
  | 'executive'
  | 'brutalist'
  | 'aurora'
  | 'terminal'
  | 'artisan'
  | 'splitscreen'
  | 'showcase';

export type ColorPalette =
  | 'indigo'
  | 'emerald'
  | 'rose'
  | 'amber'
  | 'violet'
  | 'cyan'
  | 'monochrome'
  | 'coral';

export type FontPairing =
  | 'sans'
  | 'serif'
  | 'mono'
  | 'display'
  | 'editorial';

export type ThemeMode = 'dark' | 'light' | 'auto';
export type DeviceViewport = 'desktop' | 'laptop' | 'tablet' | 'mobile';

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  dribbble?: string;
  behance?: string;
  instagram?: string;
  youtube?: string;
  website?: string;
  discord?: string;
  email?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  avatar: string;
  email: string;
  phone?: string;
  location: string;
  availableForWork: boolean;
  statusText: string;
  resumeUrl?: string;
  yearsOfExperience: number;
  completedProjects: number;
  satisfiedClients: number;
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  level: number; // 1 - 100
  icon?: string;
  years?: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  metrics?: string;
  year?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  description?: string;
  gpa?: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  avatar: string;
  text: string;
  rating: number; // 1-5
  projectRef?: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  date?: string;
  url?: string;
  badge?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  iconName?: string;
  items: CustomSectionItem[];
}

export interface ThemeConfig {
  templateId: TemplateId;
  colorPalette: ColorPalette;
  fontPairing: FontPairing;
  mode: ThemeMode;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  layoutDensity: 'compact' | 'comfortable' | 'spacious';
  showSections: {
    hero: boolean;
    about: boolean;
    skills: boolean;
    projects: boolean;
    experience: boolean;
    education: boolean;
    testimonials: boolean;
    custom: boolean;
    contact: boolean;
  };
}

export interface PortfolioData {
  personal: PersonalInfo;
  socials: SocialLinks;
  skills: SkillItem[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  testimonials: TestimonialItem[];
  customSections: CustomSection[];
  themeConfig: ThemeConfig;
}

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  tagline: string;
  description: string;
  category: string;
  recommendedFor: string;
  thumbnailGradient: string;
  badge: string;
}
