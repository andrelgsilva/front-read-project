export interface Book {
  id: string;
  title: string;
  author: string;
  progress: number;
  currentPage?: number;
  totalPages?: number;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  currentlyReading: string;
  progress: number;
}

export interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  hasReading: boolean;
  readingTime?: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}
