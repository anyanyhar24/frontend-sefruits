import React, { useState } from 'react'
import Layout from './Layout'
import FormUploadsFile from '../../components/common/FormUploadsFile'
import WebcamComponent from '../../components/common/WebcamComponent'

const DashboardAdmin = () => {
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
      <div className='
        w-full
        p-5
        flex
        flex-col
        justify-center
      '>
        <div className='
            mb-3
            w-full
            flex
            justify-between
            items-end
          '
        >
          <h1
            className='
              font-bold
              text-base
              lg:text-3xl
            '
            >
              Fruits Clasification
            </h1>

            <div
              className='
                flex gap-2
                text-white
                text-sm
              '
            >
              <button
                onClick={handleComponentImage}
                className={
                  `
                    px-2
                    py-1
                    md:p-2
                    shadow
                    rounded-lg
                    transition-all
                    ease-out
                    duration-200
                    ${
                      asImage
                      ? 'cursor-not-allowed bg-red-300'
                      : 'bg-red-400 hover:bg-red-300 active:bg-red-200'
                    }
                  `
                }
              >
                <span
                  className='hidden md:inline-block'
                >
                  Deteksi Gambar
                </span>
                <i className="fa-solid fa-image md:ml-2"></i>
              </button>

              <button
                onClick={handleComponentWebCam}
                className={
                  `
                    px-2
                    py-1
                    md:p-2
                    rounded-lg
                    shadow
                    transition-all
                    ease-out
                    duration-200
                    ${
                      asWebCam
                      ? 'cursor-not-allowed bg-red-300'
                      : 'bg-red-400 hover:bg-red-300 active:bg-red-200'
                    }
                  `
                }
              >
                <span
                  className='hidden md:inline-block'
                >
                  Deteksi Webcam
                </span>
                  <i className="fa-solid fa-camera md:ml-2"></i>
              </button>

            </div>
        </div>

        <div
          className='
            mt-3
            md:mt-8
            lg:mt-0
          '
        >
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

export default DashboardAdmin
