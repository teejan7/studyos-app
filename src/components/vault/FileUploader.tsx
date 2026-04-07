import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { FileRecord } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface FileUploaderProps {
  subjectCode: string;
  files: FileRecord[];
  onUpload: (file: FileRecord) => void;
}

export default function FileUploader({ subjectCode, files, onUpload }: FileUploaderProps) {
  const [error, setError] = useState('');

  const handleFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const record: FileRecord = {
      id: uuidv4(),
      subjectCode,
      name: file.name,
      type: file.type,
      size: file.size,
      createdAt: new Date().toISOString()
    };

    if (file.size <= 2500000) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          record.dataUrl = reader.result;
          onUpload(record);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setError('File too large for inline storage; metadata saved only.');
      onUpload(record);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-deep p-4">
      <div className="text-sm uppercase tracking-[0.18em] text-muted">Upload attachments</div>
      <input type="file" accept="application/pdf,image/*,.doc,.docx" onChange={handleFiles} className="mt-3 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-green-100" />
      {error && <div className="mt-2 text-sm text-warn">{error}</div>}
      <div className="mt-4 space-y-2">
        {files.length ? (
          files.map((file) => (
            <div key={file.id} className="flex items-center justify-between rounded-lg border border-border bg-bg px-3 py-2 text-sm">
              <span>{file.name}</span>
              {file.dataUrl ? (
                <a className="text-accent hover:underline" href={file.dataUrl} download={file.name}>
                  Download
                </a>
              ) : (
                <span className="text-xs text-muted">Metadata saved only</span>
              )}
            </div>
          ))
        ) : (
          <div className="text-sm text-muted">No attachments yet for this subject.</div>
        )}
      </div>
    </div>
  );
}
