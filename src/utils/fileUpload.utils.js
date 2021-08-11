        // read the contents of each file
        export const readFileContents = async (file, setProcess) => {
            return new Promise((resolve, reject) => {
                let fileReader = new FileReader();
                // start reading the file, once done, the result contains the content of the file as text string
               
                fileReader.onload = () => {
                    // result is a domstring, parse
                    resolve(JSON.parse(fileReader.result));
                };
                fileReader.onerror = reject;
                fileReader.onprogress= function(data) {
                    if(data.lengthComputable) {
                        let result = parseInt(((data.loaded / data.total) * 100), 10 );
                        setProcess(result)
                    }
                }
                if (file && file.type.match('.json')){
                    fileReader.readAsText(file);
                }else{
                    alert("need to be the right file format")
                }
               
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