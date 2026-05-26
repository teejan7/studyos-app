import type { Resource } from '../types';

type StoredResource = Partial<Resource> & Pick<Resource, 'subjectCode' | 'title' | 'link'>;

function createResourceId(prefix: string) {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${prefix}-${Math.random().toString(36).slice(2)}`;
}

function normalizeResourceType(type: unknown): Resource['type'] {
  if (type === 'youtube' || type === 'notes' || type === 'papers' || type === 'custom') return type;
  if (type === 'question' || type === 'important') return 'papers';
  return 'custom';
}

function toResource(resource: StoredResource, fallbackPrefix: string): Resource {
  return {
    id: typeof resource.id === 'string' && resource.id ? resource.id : createResourceId(fallbackPrefix),
    subjectCode: resource.subjectCode,
    type: normalizeResourceType(resource.type),
    title: resource.title,
    link: resource.link,
    createdAt: typeof resource.createdAt === 'string' ? resource.createdAt : new Date().toISOString()
  };
}

export function hydrateResources(storedValue: unknown, initialValue: Resource[]) {
  if (!Array.isArray(storedValue)) return initialValue;

  return storedValue
    .filter(
      (resource): resource is StoredResource =>
        !!resource &&
        typeof resource === 'object' &&
        typeof resource.subjectCode === 'string' &&
        typeof resource.title === 'string' &&
        typeof resource.link === 'string'
    )
    .map((resource) => toResource(resource, 'resource'));
}
