import type { Resource } from '../types';
import { defaultResources } from '../data/defaultResources';

type StoredResource = Partial<Resource> & Pick<Resource, 'subjectCode' | 'title' | 'link'>;
type DefaultResource = (typeof defaultResources)[number];

function createResourceId(prefix: string) {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${prefix}-${Math.random().toString(36).slice(2)}`;
}

function normalizeResourceType(type: Resource['type'] | DefaultResource['type']): Resource['type'] {
  return type === 'papers' ? 'question' : type;
}

function toResource(resource: StoredResource | DefaultResource, fallbackPrefix: string): Resource {
  const createdAt = typeof resource.createdAt === 'string' ? resource.createdAt : new Date(0).toISOString();

  return {
    id: typeof resource.id === 'string' && resource.id ? resource.id : createResourceId(fallbackPrefix),
    subjectCode: resource.subjectCode,
    type: normalizeResourceType(resource.type ?? 'notes'),
    title: resource.title,
    link: resource.link,
    createdAt
  };
}

function dedupeResources(resources: Resource[]) {
  const seenLinks = new Set<string>();

  return resources.filter((resource) => {
    const normalizedLink = resource.link.trim();
    if (!normalizedLink) {
      return true;
    }

    if (seenLinks.has(normalizedLink)) {
      return false;
    }

    seenLinks.add(normalizedLink);
    return true;
  });
}

export function hydrateResources(storedValue: unknown, initialValue: Resource[]) {
  const existingResources = Array.isArray(storedValue)
    ? storedValue
        .filter(
          (resource): resource is StoredResource =>
            !!resource &&
            typeof resource === 'object' &&
            typeof resource.subjectCode === 'string' &&
            typeof resource.title === 'string' &&
            typeof resource.link === 'string'
        )
        .map((resource) => toResource(resource, 'resource'))
    : initialValue;

  const normalizedDefaults = defaultResources.map((resource, index) =>
    toResource(resource, `default-resource-${index}`)
  );

  return dedupeResources([...existingResources, ...normalizedDefaults]);
}
