/** Forked from https://github.com/Marvinified/use-file-upload/blob/38f855eab840cfa8e682e08b29e2524e7d098ba7/src/index.js

    The npm package for the repo is not compatible with React 18, and the logic is fairly simple.
 */
import React, { useState } from "react";
// import styles from './styles.module.css'

function createInputComponent(multiple: boolean, accept: string) {
  const el = document.createElement("input");
  // set input config
  el.type = "file";
  el.accept = accept;
  el.multiple = multiple;
  // return file input element
  return el;
}

export interface ParsedFile {
  source: string;
  name: string;
  size: number;
  file: File;
}
export const useFileUpload = () => {
  const [files, setFiles] = useState<ParsedFile[] | null>(null);
  let userCallback = () => {};

  // Handle onChange event
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedFiles = [];
    const target = e.target;

    // Loop through files
    for (const fileIndex in target?.files) {
      // check if index is a number
      // @ts-ignore
      if (isNaN(fileIndex)) {
        continue;
      }

      // get file object
      const file = target.files[fileIndex];

      // select properties

      const parsedFile = {
        source: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        file, // original file object
      };

      // add to parsed file list
      parsedFiles.push(parsedFile);
    }

    // remove event listener after operation
    target.removeEventListener("change", onChange as any);

    // remove input element after operation
    target.remove();

    // update files state hook

    if (target.multiple) {
      setFiles(parsedFiles);
      return userCallback(parsedFiles);
    }

    setFiles(parsedFiles[0]);
    return userCallback(parsedFiles[0]);
    // user specified callback
  };

  // Handle upload
  const uploadFile = (
    { accept, multiple } = { accept: "", multiple: false },
    cb
  ) => {
    if (typeof cb === "function") {
      userCallback = cb;
    }
    // create virtual input element
    const inputEL = createInputComponent(multiple, accept);
    // add event listener
    inputEL.addEventListener("change", onChange as any);
    inputEL.click();
  };

  return React.useMemo(() => [files, uploadFile] as const, [files]);
};
