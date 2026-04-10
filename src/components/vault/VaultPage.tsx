import { useMemo } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Note, FileRecord, Resource, SubjectTopics, TopicProgress } from '../../types';
import NotesEditor from './NotesEditor';
import FileUploader from './FileUploader';
import ImportantTopics from './ImportantTopics';

interface VaultPageProps {
  selectedSubject: string;
  subjects: { code: string; name: string }[];
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
  files: FileRecord[];
  setFiles: Dispatch<SetStateAction<FileRecord[]>>;
  resources: Resource[];
  topics: SubjectTopics[];
  setTopics: Dispatch<SetStateAction<SubjectTopics[]>>;
  progress: TopicProgress[];
  setProgress: Dispatch<SetStateAction<TopicProgress[]>>;
}

export default function VaultPage({ selectedSubject, notes, setNotes, files, setFiles, resources, topics, setTopics, progress, setProgress }: VaultPageProps) {
  const subjectNotes = useMemo(() => notes.filter((note) => note.subjectCode === selectedSubject), [notes, selectedSubject]);
  const subjectFiles = useMemo(() => files.filter((file) => file.subjectCode === selectedSubject), [files, selectedSubject]);
  const subjectResources = useMemo(() => resources.filter((resource) => resource.subjectCode === selectedSubject), [resources, selectedSubject]);

  const handleSave = (note: Note) => {
    setNotes([note, ...notes]);
  };

  const handleUpload = (file: FileRecord) => {
    setFiles([file, ...files]);
  };

  const handleDeleteFile = (fileId: string) => {
    setFiles(files.filter((file) => file.id !== fileId));
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
                      <div className="font-semibold text-text">{note.title}</div>
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
                    className="flex w-full items-center justify-between rounded-xl border border-border bg-bg p-3 text-left text-sm text-text hover:bg-surface"
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
          <FileUploader subjectCode={selectedSubject} files={subjectFiles} onUpload={handleUpload} onDelete={handleDeleteFile} />
          <ImportantTopics selectedSubject={selectedSubject} topics={topics} setTopics={setTopics} progress={progress} setProgress={setProgress} />
        </div>
      </div>
    </div>
  );
}
