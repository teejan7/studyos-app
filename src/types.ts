export interface Exam {
  code: string;
  name: string;
  date: string;
  slot: string;
}

export interface Note {
  id: string;
  subjectCode: string;
  module: number;
  title: string;
  content: string;
  createdAt: string;
}

export interface Resource {
  id: string;
  subjectCode: string;
  type: 'youtube' | 'notes' | 'question' | 'important';
  title: string;
  link: string;
  createdAt: string;
}

export interface Question {
  id: string;
  subjectCode: string;
  module: number;
  text: string;
  type: '2mark' | '5mark' | '10mark' | 'partA' | 'partB';
  starred: boolean;
  year?: number;
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

export interface SubjectProgress {
  subjectCode: string;
  percentage: number;
  modulesCompleted: boolean[];
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
