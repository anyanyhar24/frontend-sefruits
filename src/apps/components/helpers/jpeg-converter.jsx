import jpeg from 'jpeg-js'

const dataURItoJPG = (dataURI) => {
  const byteString = atob(dataURI.split(',')[1])
  const uint8Array = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i)
  }
  const rawImageData = {
    data: uint8Array,
    width: 150,
    height: 150
  }
  const jpegImageData = jpeg.encode(rawImageData, 90)
  const jpegBase64 = `data:image/jpeg;base64,${jpegImageData.data}`
  return jpegBase64
}

export default dataURItoJPG
