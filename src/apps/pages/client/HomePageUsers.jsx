import React, { useState } from 'react'
import FormUploadsFile from '../../components/common/FormUploadsFile'
import WebcamComponent from '../../components/common/WebcamComponent'
import Layout from './Layout'

const HomePageUsers = () => {
  const [asImage, setAsImage] = useState(true)
  const [asWebCam, setAsWebcam] = useState(false)

  const handleComponentWebCam = () => {
    setAsWebcam(true)
    setAsImage(false)
  }

  const handleComponentImage = () => {
    setAsImage(true)
    setAsWebcam(false)
  }

  return (
    <Layout>
      <div className='flex flex-col gap-12 md:gap-2 p-5 lg:p-28 mb-20'>
        <div className='basis-1/2'>
          <div className='flex flex-col gap-3 text-center md:text-left'>
            <p className='font-semibold text-sky-900 md:text-lg'>
                Halo selamat datang di SeFruit App!
            </p>
            <h1 className='font-bold text-3xl md:text-4xl text-sky-900'>
              Klasifikasi Buah dengan Gambar dan Kamera
            </h1>
            <p className='font-medium text-slate-400 text-sm'>
              Didukung dengan teknologi Machine Learning
            </p>

            <div className='text-white flex flex-row gap-2 justify-center md:justify-start mt-4'>
              <button
                onClick={handleComponentImage}
                className={
                  `p-2 shadow rounded-lg transition-all erase-out duration-200
                  ${asImage
                    ? 'cursor-not-allowed bg-red-300'
                    : 'bg-red-400 hover:bg-red-300 active:bg-red-200'
                  }`
                }
              >
                <span>
                  Deteksi Gambar
                </span>
                <div className='hidden lg:inline-block'>
                  <i className="fa-solid fa-image ml-2"></i>
                </div>
              </button>

              <button
                onClick={handleComponentWebCam}
                className={
                  `p-2 shadow rounded-lg transition-all erase-out duration-200
                  ${
                    asWebCam
                    ? 'cursor-not-allowed bg-red-300'
                    : 'bg-red-400 hover:bg-red-300 active:bg-red-200'
                  }`
                }
              >
                <span>
                  Deteksi WebCam
                </span>
                <div className='hidden lg:inline-block'>
                  <i className="fa-solid fa-camera ml-2"></i>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className='basis-1/2'>
        {
          asImage
            ? <FormUploadsFile/>
            : <WebcamComponent/>
        }
        </div>
      </div>
    </Layout>
  )
}

export default HomePageUsers
