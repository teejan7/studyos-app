import { useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Resource } from '../../types';

interface ResourceHubProps {
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  subjects: { code: string; name: string }[];
  resources: Resource[];
  setResources: Dispatch<SetStateAction<Resource[]>>;
}

const resourceTypes = [
  { id: 'youtube', label: 'YouTube' },
  { id: 'notes', label: 'Notes' },
  { id: 'question', label: 'Question Papers' }
] as const;

type ResourceType = (typeof resourceTypes)[number]['id'];

export default function ResourceHub({ selectedSubject, setSelectedSubject, subjects, resources, setResources }: ResourceHubProps) {
  const [activeType, setActiveType] = useState<ResourceType>('youtube');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [subjectCode, setSubjectCode] = useState(selectedSubject);

  const subjectResources = useMemo(
    () => resources.filter((resource) => resource.subjectCode === subjectCode && resource.type === activeType),
    [resources, subjectCode, activeType]
  );

  const handleAdd = () => {
    if (!title.trim() || !link.trim()) return;
    const newResource: Resource = {
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      subjectCode,
      type: activeType,
      title: title.trim(),
      link: link.trim(),
      createdAt: new Date().toISOString()
    };
    setResources([newResource, ...resources]);
    setTitle('');
    setLink('');
    setSelectedSubject(subjectCode);
  };

  const handleCancel = () => {
    setTitle('');
    setLink('');
    setActiveType('youtube');
    setSubjectCode(selectedSubject);
  };

  const handleDelete = (id: string) => {
    setResources(resources.filter((resource) => resource.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-deep p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.18em] text-muted">Resource Hub</div>
            <div className="mt-2 text-lg font-semibold text-green-100">Store quick links for every subject</div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="text-xs uppercase tracking-[0.18em] text-muted">Subject</label>
            <select
              value={subjectCode}
              onChange={(event) => {
                setSubjectCode(event.target.value);
                setSelectedSubject(event.target.value);
              }}
              className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-green-100 outline-none focus:border-accent"
            >
              {subjects.map((subject) => (
                <option key={subject.code} value={subject.code} className="bg-bg text-green-100">
                  {subject.code}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-deep p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {resourceTypes.map((type) => (
              <button
                type="button"
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`rounded-full border px-3 py-2 text-sm transition ${
                  activeType === type.id ? 'border-accent bg-accent/10 text-accent' : 'border-border bg-bg text-green-100 hover:border-accent'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
          <div className="text-sm text-muted">Showing {resourceTypes.find((item) => item.id === activeType)?.label} links for {subjectCode}</div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.65fr_0.35fr]">
        <div className="space-y-4 rounded-xl border border-border bg-[#0f1f0f] p-4">
          <div className="text-sm uppercase tracking-[0.18em] text-muted">Add new resource</div>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted">Resource type</label>
              <select
                value={activeType}
                onChange={(event) => setActiveType(event.target.value as ResourceType)}
                className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-green-100 outline-none focus:border-accent"
              >
                {resourceTypes.map((type) => (
                  <option key={type.id} value={type.id} className="bg-bg text-green-100">
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted">Title</label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Enter resource title"
                className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-green-100 outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted">Link</label>
              <input
                value={link}
                onChange={(event) => setLink(event.target.value)}
                placeholder="https://"
                className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-green-100 outline-none focus:border-accent"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleAdd}
                disabled={!title.trim() || !link.trim()}
                className="rounded-lg border border-border bg-accent px-4 py-2 text-sm font-semibold text-bg transition disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg border border-border bg-bg px-4 py-2 text-sm text-green-100 transition hover:bg-surface"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-[#0f1f0f] p-4">
          <div className="text-sm uppercase tracking-[0.18em] text-muted">Subject selector</div>
          <p className="mt-2 text-sm text-green-100">Change the active subject here to save or browse resources for that topic.</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-[#0f1f0f] p-4">
        <div className="text-sm uppercase tracking-[0.18em] text-muted">Resources</div>
        <div className="mt-4 space-y-3">
          {subjectResources.length ? (
            subjectResources.map((resource) => (
              <div key={resource.id} className="rounded-xl border border-[#1a3a1a] bg-[#0f1f0f] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="font-semibold text-green-100">{resource.title}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">{resource.type === 'youtube' ? 'YouTube' : resource.type === 'notes' ? 'Notes' : 'Question Paper'}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => window.open(resource.link, '_blank')}
                      className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-green-100 hover:bg-surface"
                    >
                      Open
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(resource.id)}
                      className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-green-100 hover:bg-surface"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted">No resources stored for this subject and type yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
