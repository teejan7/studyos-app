import { useMemo } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Note, FileRecord, Resource, SubjectProgress } from '../../types';
import NotesEditor from './NotesEditor';
import FileUploader from './FileUploader';
import ModuleAccordion from './ModuleAccordion';

interface VaultPageProps {
  selectedSubject: string;
  subjects: { code: string; name: string }[];
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
  files: FileRecord[];
  setFiles: Dispatch<SetStateAction<FileRecord[]>>;
  resources: Resource[];
  progress: SubjectProgress[];
  setProgress: Dispatch<SetStateAction<SubjectProgress[]>>;
}

export default function VaultPage({ selectedSubject, subjects, notes, setNotes, files, setFiles, resources, progress, setProgress }: VaultPageProps) {
  const subjectNotes = useMemo(() => notes.filter((note) => note.subjectCode === selectedSubject), [notes, selectedSubject]);
  const subjectFiles = useMemo(() => files.filter((file) => file.subjectCode === selectedSubject), [files, selectedSubject]);
  const subjectResources = useMemo(() => resources.filter((resource) => resource.subjectCode === selectedSubject), [resources, selectedSubject]);
  const progressItem = progress.find((item) => item.subjectCode === selectedSubject);

  const handleSave = (note: Note) => {
    setNotes([note, ...notes]);
  };

  const handleUpload = (file: FileRecord) => {
    setFiles([file, ...files]);
  };

  const handleToggleModule = (index: number) => {
    if (!progressItem) return;
    const update = progress.map((item) =>
      item.subjectCode === selectedSubject
        ? {
            ...item,
            modulesCompleted: item.modulesCompleted.map((value, idx) => (idx === index ? !value : value))
          }
        : item
    );
    setProgress(update);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[0.65fr_0.35fr]">
        <div className="space-y-4">
          <NotesEditor subjectCode={selectedSubject} notes={notes} onSave={handleSave} />
          <div className="rounded-xl border border-border bg-deep p-4">
            <div className="text-sm uppercase tracking-[0.18em] text-muted">Notes archive</div>
            <div className="mt-4 space-y-3">
              {subjectNotes.length ? (
                subjectNotes.map((note) => (
                  <div key={note.id} className="rounded-xl border border-border bg-bg p-3 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-semibold text-green-100">{note.title}</div>
                      <div className="text-xs text-muted">Module {note.module}</div>
                    </div>
                    <div className="mt-2 text-xs text-muted">{new Date(note.createdAt).toLocaleString()}</div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted">No notes saved. Create one above.</p>
              )}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-deep p-4">
            <div className="text-sm uppercase tracking-[0.18em] text-muted">External Resources</div>
            <div className="mt-4 space-y-3">
              {subjectResources.length ? (
                subjectResources.map((resource) => (
                  <button
                    type="button"
                    key={resource.id}
                    onClick={() => window.open(resource.link, '_blank')}
                    className="flex w-full items-center justify-between rounded-xl border border-border bg-bg p-3 text-left text-sm text-green-100 hover:bg-surface"
                  >
                    <span>{resource.title}</span>
                    <span className="text-xs uppercase tracking-[0.18em] text-muted">{resource.type}</span>
                  </button>
                ))
              ) : (
                <p className="text-sm text-muted">No external resources for this subject yet.</p>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <FileUploader subjectCode={selectedSubject} files={subjectFiles} onUpload={handleUpload} />
          <div className="rounded-xl border border-border bg-deep p-4">
            <div className="text-sm uppercase tracking-[0.18em] text-muted">Module tracker</div>
            <div className="mt-4 space-y-2">
              {progressItem?.modulesCompleted.map((item, index) => (
                <ModuleAccordion key={index} moduleIndex={index} completed={item} onToggle={() => handleToggleModule(index)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
