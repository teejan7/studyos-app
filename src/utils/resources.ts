import type { Resource } from '../types';
import { defaultResources } from '../data/defaultResources';

type StoredResource = Partial<Resource> & Pick<Resource, 'subjectCode' | 'title' | 'link'>;
type DefaultResource = (typeof defaultResources)[number];

const REQUIRED_DCC_RESOURCES: DefaultResource[] = [
  {
    subjectCode: 'CST372',
    type: 'notes',
    title: 'DCC',
    link: 'https://drive.google.com/drive/folders/16iTyY-IWAYAXjFvQKD4sYzPgDjb1Cn_e'
  },
  {
    subjectCode: 'CST372',
    type: 'papers',
    title: 'DCC',
    link: 'https://drive.google.com/drive/folders/1oZfc-Ec5zZqsRTv3FYYmOqYaIpdgpHjE'
  }
];

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
  const seenResources = new Set<string>();

  return resources.filter((resource) => {
    const normalizedLink = resource.link.trim();
    const resourceKey = [
      resource.subjectCode.trim().toUpperCase(),
      resource.type,
      resource.title.trim().toLowerCase(),
      normalizedLink
    ].join('::');

    if (!normalizedLink) {
      return true;
    }

    if (seenResources.has(resourceKey)) {
      return false;
    }

    seenResources.add(resourceKey);
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

  const normalizedDefaults = [...defaultResources, ...REQUIRED_DCC_RESOURCES].map((resource, index) =>
    toResource(resource, `default-resource-${index}`)
  );

  return dedupeResources([...existingResources, ...normalizedDefaults]);
}
