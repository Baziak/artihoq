interface FileSystemHandle {
  kind: 'file' | 'directory';
  name: string;
}

interface FileSystemFileHandle extends FileSystemHandle {
  getFile(): Promise<File>;
  createWritable(): Promise<FileSystemWritableFileStream>;
}

interface FileSystemWritableFileStream extends WritableStream {
  write(data: any): Promise<void>;
  close(): Promise<void>;
}

interface FilePickerOptions {
  suggestedName?: string;
  types?: {
    description?: string;
    accept?: {
      [mimeType: string]: string[];
    };
  }[];
  multiple?: boolean;
  excludeAcceptAllOption?: boolean;
}

interface Window {
  showOpenFilePicker: (options?: FilePickerOptions) => Promise<FileSystemFileHandle[]>;
  showSaveFilePicker: (options?: FilePickerOptions) => Promise<FileSystemFileHandle>;
}
