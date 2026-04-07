import { useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Resource } from '../../types';
import { Plus, Trash2, ExternalLink } from 'lucide-react';

interface ResourceHubProps {
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  subjects: { code: string; name: string }[];
  resources: Resource[];
  setResources: Dispatch<SetStateAction<Resource[]>>;
}

const resourceSections = [
  { id: 'youtube' as const, label: 'YouTube Links', placeholder: 'Video title' },
  { id: 'notes' as const, label: 'Notes (Drive Links)', placeholder: 'Note title' },
  { id: 'question' as const, label: 'Question Papers', placeholder: 'Paper title' },
  { id: 'important' as const, label: 'Important Questions', placeholder: 'Question title' }
];

export default function ResourceHub({ selectedSubject, subjects, resources, setResources }: ResourceHubProps) {
  const [addingType, setAddingType] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const subjectResources = useMemo(
    () => resources.filter((resource) => resource.subjectCode === selectedSubject),
    [resources, selectedSubject]
  );

  const handleAdd = (type: string) => {
    if (!title.trim()) return;
    const newResource: Resource = {
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      subjectCode: selectedSubject,
      type: type as Resource['type'],
      title: title.trim(),
      link: link.trim(),
      createdAt: new Date().toISOString()
    };
    setResources([newResource, ...resources]);
    setTitle('');
    setLink('');
    setAddingType(null);
  };

  const handleDelete = (id: string) => {
    setResources(resources.filter((resource) => resource.id !== id));
  };

  const selectedSubjectName = subjects.find(s => s.code === selectedSubject)?.name || selectedSubject;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-deep p-4">
        <div className="text-lg font-semibold text-green-100">{selectedSubjectName} Resources</div>
      </div>

      {resourceSections.map((section) => {
        const sectionResources = subjectResources.filter(r => r.type === section.id);
        return (
          <div key={section.id} className="rounded-xl border border-border bg-deep p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-semibold text-green-100">{section.label}</h3>
              <button
                onClick={() => setAddingType(section.id)}
                className="flex items-center gap-2 rounded-lg border border-accent bg-accent/10 px-3 py-2 text-sm text-accent hover:bg-accent/20"
              >
                <Plus size={16} />
                Add Resource
              </button>
            </div>

            {addingType === section.id && (
              <div className="mb-4 rounded-lg border border-border bg-bg p-4">
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder={section.placeholder}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-green-100 outline-none focus:border-accent"
                  />
                  <input
                    type="url"
                    placeholder="Link (optional)"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-green-100 outline-none focus:border-accent"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAdd(section.id)}
                      className="rounded-lg bg-accent px-4 py-2 text-sm text-bg hover:bg-accent/90"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setAddingType(null)}
                      className="rounded-lg border border-border bg-bg px-4 py-2 text-sm text-green-100 hover:border-accent"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {sectionResources.map((resource) => (
                <div key={resource.id} className="flex items-center justify-between rounded-lg border border-border bg-bg p-3">
                  <div className="flex-1">
                    <div className="font-medium text-green-100">{resource.title}</div>
                    {resource.link && (
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent hover:underline flex items-center gap-1"
                      >
                        <ExternalLink size={12} />
                        Link
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(resource.id)}
                    className="ml-2 rounded p-1 text-muted hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {sectionResources.length === 0 && (
                <div className="text-center text-muted py-4">No resources yet</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
