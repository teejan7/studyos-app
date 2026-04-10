import type { SubjectTopics, TopicProgress } from '../types';

export function topicKey(subjectCode: string, module: string, topic: string) {
  return `${subjectCode}::${module}::${topic}`;
}

export function isTopicProgress(item: unknown): item is TopicProgress {
  if (!item || typeof item !== 'object') return false;
  const candidate = item as TopicProgress;
  return (
    typeof candidate.subjectCode === 'string' &&
    typeof candidate.module === 'string' &&
    typeof candidate.topic === 'string' &&
    typeof candidate.completed === 'boolean'
  );
}

export function sanitizeTopicProgress(progress: TopicProgress[]) {
  return progress.filter(isTopicProgress);
}

export function mergeTopics(defaultTopics: SubjectTopics[], storedTopics: SubjectTopics[]) {
  const storedBySubject = new Map(storedTopics.map((item) => [item.subjectCode, item]));
  const merged = defaultTopics.map((defaultSubject) => {
    const storedSubject = storedBySubject.get(defaultSubject.subjectCode);
    if (!storedSubject) return defaultSubject;

    return {
      subjectCode: defaultSubject.subjectCode,
      modules: {
        ...defaultSubject.modules,
        ...storedSubject.modules
      }
    };
  });

  storedTopics.forEach((storedSubject) => {
    if (!defaultTopics.some((defaultSubject) => defaultSubject.subjectCode === storedSubject.subjectCode)) {
      merged.push(storedSubject);
    }
  });

  return merged;
}

export function getSubjectTopics(topics: SubjectTopics[], subjectCode: string) {
  return topics.find((item) => item.subjectCode === subjectCode)?.modules ?? {};
}

export function getCompletedTopicSet(progress: TopicProgress[]) {
  return new Set(progress.filter((item) => item.completed).map((item) => topicKey(item.subjectCode, item.module, item.topic)));
}

export function getSubjectTopicStats(topics: SubjectTopics[], progress: TopicProgress[], subjectCode: string) {
  const modules = getSubjectTopics(topics, subjectCode);
  const completedTopics = getCompletedTopicSet(progress);
  const allTopics = Object.entries(modules).flatMap(([module, moduleTopics]) =>
    moduleTopics.map((topic) => ({ module, topic }))
  );
  const completed = allTopics.filter((item) => completedTopics.has(topicKey(subjectCode, item.module, item.topic))).length;
  const total = allTopics.length;
  const percentage = total ? Math.round((completed / total) * 100) : 0;

  return { completed, total, percentage };
}
