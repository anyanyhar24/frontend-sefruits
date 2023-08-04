import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ToastNotification from '../../components/helpers/ToasNotify'
import SpinnerElement from '../helpers/SpinnerElement'
import FruitsSourceAPI from '../../api/resources/FruitsSource'

const FormAddFruit = () => {
  const navigate = useNavigate()

  const [name, setName] = useState(null)
  const [waterPerGram, setWaterPerGram] = useState(null)
  const [calorie, setCalorie] = useState(null)
  const [protein, setProtein] = useState(null)
  const [fat, setFat] = useState(null)
  const [carbohydrate, setCarbohydrate] = useState(null)
  const [vitamin, setVitamin] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddNewFruits = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const data = {
        name,
        waterPerGram,
        calorie,
        protein,
        fat,
        carbohydrate,
        vitamin
      }

      const response = await FruitsSourceAPI.addFruits(data)
      ToastNotification.toastSuccess(response)
      navigate('/fruits')
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
    setIsLoading(false)
  }

  return (
    <>
      { isLoading && <SpinnerElement/> }

      <div className='w-full bg-white shadow p-5'>
        <h1
          className='
            font-bold
            text-lg
            lg:text-3xl
          '
        >
          Tambah Buah Baru
        </h1>

        <form
          onSubmit={handleAddNewFruits}
          className='w-full mt-6'
        >
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6'>

            <div className='flex flex-col gap-1'>
              <label
                className='font-semibold'
              >
                Nama
              </label>
              <input
                type='text'
                onChange={(e) => setName(e.target.value)}
                placeholder='Nama Buah'
                className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label
                className='font-semibold'
              >
                Kandungan Air(g)
              </label>
              <input
                type='text'
                onChange={(e) => setWaterPerGram(e.target.value)}
                placeholder='Masukkan Kandungan Air per gram'
                className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label
                className='font-semibold'
              >
                Kandungan Kalori(g)
              </label>
              <input
                type='text'
                onChange={(e) => setCalorie(e.target.value)}
                placeholder='Masukkan Kandungan Kalori per gram'
                className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label
                className='font-semibold'
              >
                Kandungan Protein(g)
              </label>
              <input
                type='text'
                onChange={(e) => setProtein(e.target.value)}
                placeholder='Masukkan Kandungan protein per gram'
                className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label
                className='font-semibold'
              >
                Kandungan Lemak(g)
              </label>
              <input
                type='text'
                onChange={(e) => setFat(e.target.value)}
                placeholder='Masukkan Kandungan Lemat per gram'
                className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
                required
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label
                className='font-semibold'
              >
                Kandungan Karbohidrat(g)
              </label>
              <input
                type='text'
                onChange={(e) => setCarbohydrate(e.target.value)}
                placeholder='Masukkan Kandungan Lemat per gram'
                className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label
                className='font-semibold'
              >
                Kandungan Vitamin
              </label>
              <input
                type='text'
                onChange={(e) => setVitamin(e.target.value)}
                placeholder='Masukkan Kandungan Lemat per gram'
                className='p-3 rounded border-2 outline-none focus:border-2 focus:border-blue-600 transition-all ease-in-out duration-100'
              />
            </div>

            <div className='mt-4 lg:mt-7'>
              <button
                className='h-[52px] text-white font-semibold shadow-md bg-blue-500 hover:bg-blue-300 active:bg-blue-400 rounded transition-all w-full ease-in-out duration-100'
              >
                Tambah
              </button>
            </div>

          </div>
        </form>
      </div>
    </>
  )
}

export default FormAddFruit
