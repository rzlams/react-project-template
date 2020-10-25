const fileToBase64 = (file) => {
  if(file){
    const contentType = `data:${file.type};base64,`

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (readerEvt) => {
        try {
          resolve(contentType + btoa(readerEvt.target.result))
        } catch(err) {
          reject(err)
        }
      }

      reader.readAsBinaryString(file)
    })
  }
}
