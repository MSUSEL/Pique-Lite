import { useCallback } from "react";

// The parser function tries to convert file content to type T
// If it throws, we treat that as a validation error
export type FileParser<T> = (file: File) => Promise<T>;

// Callbacks for different file handling events
export interface FileCallbacks<T> {
  onValidFile: (handle: FileSystemFileHandle, parsed: T) => void;
  onInvalidFile: (name: string, reason: string) => void;
  onError?: (error: Error) => void;
}

// Basic validation options (now simpler since parsing errors handle format validation)
export interface FileValidation {
  acceptedTypes?: string[];
  maxSize?: number;
}

export function useFileSelect<T>(
  parser: FileParser<T>,
  validation: FileValidation,
  callbacks: FileCallbacks<T>
) {
  // Helper to validate and parse a single file
  const processFile = useCallback(
    async (handle: FileSystemFileHandle) => {
      try {
        const file = await handle.getFile();

        // Check file size if specified
        if (validation.maxSize && file.size > validation.maxSize) {
          callbacks.onInvalidFile(
            file.name,
            `File size ${file.size} bytes exceeds maximum size of ${validation.maxSize} bytes`
          );
          return;
        }

        // Check file type if specified
        if (validation.acceptedTypes?.length) {
          const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
          if (!validation.acceptedTypes.includes(fileExtension)) {
            callbacks.onInvalidFile(
              file.name,
              `File type ${fileExtension} not in accepted types: ${validation.acceptedTypes.join(
                ", "
              )}`
            );
            return;
          }
        }

        // Try to parse the file - if this throws, it's treated as a validation error
        const parsed = await parser(file);
        callbacks.onValidFile(handle, parsed);
      } catch (err) {
        // Parser errors are treated as validation failures
        callbacks.onInvalidFile(
          handle.name,
          err instanceof Error ? err.message : "Failed to parse file"
        );
      }
    },
    [parser, validation, callbacks]
  );

  // Handler for selecting multiple files
  const selectFiles = useCallback(async () => {
    try {
      const handles = await window.showOpenFilePicker({
        multiple: true,
      });

      // Process all files in parallel
      await Promise.all(handles.map(processFile));
    } catch (err) {
      // Only call onError for real errors, not user cancellation
      if (err instanceof Error && err.name !== "AbortError") {
        callbacks.onError?.(err);
      }
    }
  }, [processFile, callbacks]);

  // Handler for selecting a folder
  const selectFolder = useCallback(async () => {
    try {
      const dirHandle = await window.showDirectoryPicker();
      const fileHandles: FileSystemFileHandle[] = [];

      // Collect only top-level files
      for await (const entry of dirHandle.values()) {
        if (entry.kind === "file") {
          fileHandles.push(entry);
        }
      }

      // Process all files in parallel
      await Promise.all(fileHandles.map(processFile));
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        callbacks.onError?.(err);
      }
    }
  }, [processFile, callbacks]);

  return {
    selectFiles,
    selectFolder,
  };
}
