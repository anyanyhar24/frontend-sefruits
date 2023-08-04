/* eslint-disable no-unneeded-ternary */
import React, { useState } from 'react'
import ToastNotification from '../helpers/ToasNotify'
import PredictionAPI from '../../api/resources/PredictionSource'
import FruitsSourceAPI from '../../api/resources/FruitsSource'
import SpinnerElement from '../helpers/SpinnerElement'
import CardFruits from './CardFruits'

const FormUploadsFile = () => {
  const [selectedImageUrl, setSelectedImageUrl] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [detectionResult, setDetectionResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    setSelectedImage(file)

    const imageUrl = URL.createObjectURL(file)
    setSelectedImageUrl(imageUrl)
    setDetectionResult(null)
  }

  const handleDetectionResult = async () => {
    setIsLoading(true)
    if (selectedImageUrl) {
      const formData = new FormData()
      formData.append('image', selectedImage)
      try {
        const response = await PredictionAPI.predict(formData)
        getFruitByName(response)
      } catch (error) {
        ToastNotification.toastError(error.response.data.message)
      }
    }
    setIsLoading(false)
  }

  const getFruitByName = async (name) => {
    setIsLoading(true)
    try {
      const response = await FruitsSourceAPI.getFruitByName(name)
      setDetectionResult(response)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
    setIsLoading(false)
  }

  return (
    <>
      { isLoading && <SpinnerElement/> }
      <div
        className='
          w-full
          flex
          flex-col
          gap-5
          justify-center
          items-center
          p-3
        '
      >
        <div
          className='
            flex
            flex-col
            justify-center
            items-center
            gap-4
            w-fit
          '
        >
          <h1
            className='
              font-semibold
              md:text-xl
            '
          >
            Upload Gambar Buah
          </h1>

          <div>
            <input
              type='file'
              onChange={handleImageUpload}
              className='
                w-full
                border
                bg-gray-800
                text-white
                rounded-xl
                p-2
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                hover:bg-gray-700
                transition-colors
                duration-300
              '
            />
          </div>

          <div
            className='
              border-black
              border-2
              border-dashed
              p-2
              flex
              justify-center
              items-center
              w-full
            '
          >
            {
              selectedImageUrl
                ? (
                    <img
                      src={selectedImageUrl}
                      className='
                        w-full
                        h-64
                        object-cover
                        object-center
                      '
                    />
                  )
                : (
                    <h1>Gambar anda akan tampil disini</h1>
                  )
            }
          </div>

          <button
            type='button'
            onClick={handleDetectionResult}
            className={
              `
                w-full
                py-2
                shadow-md
                text-white
                transition-all
                ease-out
                duration-150
                ${
                  selectedImageUrl
                  ? 'bg-blue-500 hover:bg-blue-300 active:bg-blue-200'
                  : 'cursor-not-allowed bg-blue-300'
                }
              `
            }
            disabled={selectedImageUrl ? false : true}
          >
            Identifikasi
          </button>
        </div>
        {
          detectionResult &&
          <CardFruits fruit={detectionResult}/>
        }
      </div>
    </>
  )
}

export default FormUploadsFile
