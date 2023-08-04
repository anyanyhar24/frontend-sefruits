import React, { useState, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import dataURItoBlob from '../helpers/CaptureConverter'
import PredictionAPI from '../../api/resources/PredictionSource'
import ToastNotification from '../helpers/ToasNotify'
import CardFruits from './CardFruits'
import FruitsSourceAPI from '../../api/resources/FruitsSource'

const WebcamComponent = () => {
  const webcamRef = useRef(null)

  const [isLoading, setIsLoading] = useState(true)
  const [predictionResult, setPredictionResult] = useState(null)

  const videoConstraints = {
    width: 480,
    height: 320,
    facingMode: 'environtment'
  }

  const handleIsLoading = () => setIsLoading(false)

  const predictImage = async (data) => {
    const formData = new FormData()
    formData.append('image', data)
    try {
      const response = await PredictionAPI.predict(formData)
      getFruitByName(response)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
  }

  const getFruitByName = async (name) => {
    setIsLoading(true)
    try {
      const response = await FruitsSourceAPI.getFruitByName(name)
      setPredictionResult(response)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
    setIsLoading(false)
  }

  const getCapture = useCallback(() => {
    const imageCaptureResult = webcamRef.current.getScreenshot()
    const convertImage = dataURItoBlob(imageCaptureResult)

    predictImage(convertImage)
  }, [])

  return (
    <div
      className='
        flex
        flex-col
        w-full
        justify-center
        items-center
      '
    >
      <h1
        className='
          text-xl
          font-semibold
          inline-block
          mb-2
        '
      >
        Perlihatkan Buah dalam frame.
      </h1>
      <div
        className='
          p-2
          border-black
          border-2
          border-dashed
          shadow-md
          flex
          flex-col
          justify-center
          items-center
        '
      >
        {
          isLoading && (<h1 className='font-bold'>Loading...</h1>)
        }
        <Webcam
          audio={false}
          videoConstraints={videoConstraints}
          mirrored={true}
          onLoadedData={handleIsLoading}
          ref={webcamRef}
          screenshotFormat='image/jpeg'
        />
      </div>

      <button
        type='button'
        onClick={getCapture}
        className='
          p-3
          bg-blue-600
          hover:bg-blue-400
          active:bg-blue-300
          rounded
          text-white
          my-3
          shadow-lg
        '
      >
        Prediksi
      </button>

      {
        predictionResult &&
        <CardFruits fruit={predictionResult}/>
      }
    </div>
  )
}

export default WebcamComponent
