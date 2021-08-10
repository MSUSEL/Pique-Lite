        // read the contents of each file
        export const readFileContents = async (file) => {
            return new Promise((resolve, reject) => {
                let fileReader = new FileReader();
                // start reading the file, once done, the result contains the content of the file as text string
               
                fileReader.onload = () => {
                    // result is a domstring, parse
                    resolve(JSON.parse(fileReader.result));
                };
                fileReader.onerror = reject;
                fileReader.readAsText(file);
            })
        }

        export const readAllFiles = async (allFiles) => {
            const results = await Promise.all(
                allFiles.map(async (file, index) => {
                    const fileContent = await readFileContents(file);
                    return {
                        "fileName": file.name,
                        "fileContent": fileContent,
                        "versionNumber": index + 1
                    }
                })
            );
            return results;
        }