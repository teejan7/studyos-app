export interface SemesterConfig {
  semesterName: string;
  branch: string;
  scheme: string;
}

export interface Subject {
  code: string;
  name: string;
  credits: number;
  examDate?: string;
}

export interface SubjectTopics {
  subjectCode: string;
  modules: {
    [moduleName: string]: string[];
  };
}

export interface TopicProgress {
  subjectCode: string;
  module: string;
  topic: string;
  completed: boolean;
}

export interface Note {
  id: string;
  subjectCode: string;
  module: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface Resource {
  id: string;
  subjectCode: string;
  type: 'youtube' | 'notes' | 'papers' | 'custom';
  title: string;
  link: string;
  createdAt: string;
}

export interface Question {
  id: string;
  subjectCode: string;
  module: string;
  question: string;
  markType: string;
  starred: boolean;
  year?: string;
}

export interface FlashCard {
  id: string;
  subjectCode: string;
  front: string;
  back: string;
  mastered: boolean;
  reviewCount: number;
}

export interface Reminder {
  id: string;
  title: string;
  subjectCode: string;
  datetime: string;
  priority: 'high' | 'medium' | 'low';
  done: boolean;
}

export interface FileRecord {
  id: string;
  subjectCode: string;
  name: string;
  type: string;
  size: number;
  createdAt: string;
  dataUrl?: string;
}
