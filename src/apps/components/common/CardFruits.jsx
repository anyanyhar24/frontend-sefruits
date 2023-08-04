/* eslint-disable react/prop-types */
import React from 'react'

// eslint-disable-next-line react/prop-types
const CardFruits = ({ fruit }) => {
  return (
    <div
      className='
        w-full
        lg:w-[65%]
        p-4
        px-7
        bg-white
        shadow-md
      '
    >
      <div
        className='
          flex justify-between
        '
      >
        <h1
          className='
            text-md
            capitalize
            font-bold
          '
        >
          Ringkasan Gizi
        </h1>

        <h1
          className='
            text-md
            capitalize
            font-semibold
            text-gray-400
          '
        >
          seFruits App
        </h1>
      </div>

      <h1
        className='
          capitalize
          font-extrabold
          text-2xl
          lg:text-4xl
          mt-4
        '
      >
        {fruit.name}
      </h1>

      <div
        className='
          flex
          flex-col
          lg:flex-row
          justify-around
          gap-4
          w-full
        '
      >
        <div
          className='
            mt-4
            p-6
            bg-sky-400
            rounded-xl
            text-white
            shadow-md
            text-center
          '
        >
          <p
            className='
              text-lg
              lg:text-base
              font-semibold
            '
          >
            Air
          </p>

          <p
            className='
              text-lg
              lg:text-base
              font-semibold
            '
          >
            {fruit.waterPerGram} Gram
          </p>
        </div>

        <div
          className='
            mt-4
            p-6
            bg-lime-400
            rounded-xl
            text-white
            shadow-md
            text-center
          '
        >
          <p
            className='
              text-lg
              lg:text-base
              font-semibold
            '
          >
            Kalori
          </p>

          <p
            className='
              text-lg
              lg:text-base
              font-semibold
            '
          >
            {fruit.calorie} Gram
          </p>
        </div>

        <div
          className='
            mt-4
            p-6
            bg-red-400
            rounded-xl
            text-white
            shadow-md
            text-center
          '
        >
          <p
            className='
              text-lg
              lg:text-base
              font-semibold
            '
          >
            Protein
          </p>

          <p
            className='
              text-lg
              lg:text-base
              font-semibold
            '
          >
            {fruit.protein} Gram
          </p>
        </div>

        <div
          className='
            mt-4
            p-6
            bg-yellow-400
            rounded-xl
            text-white
            shadow-md
            text-center
          '
        >
          <p
            className='
              text-lg
              lg:text-base
              font-semibold
            '
          >
            Lemak
          </p>

          <p
            className='
              text-lg
              lg:text-base
              font-semibold
            '
          >
            {fruit.fat} Gram
          </p>
        </div>

        <div
          className='
            mt-4
            p-6
            bg-teal-400
            rounded-xl
            text-white
            shadow-md
            text-center
          '
        >
          <p
            className='
              text-lg
              lg:text-base
              font-semibold
            '
          >
            Karbohidrat
          </p>

          <p
            className='
              text-lg
              lg:text-base
              font-semibold
            '
          >
            {fruit.carbohydrate} Gram
          </p>
        </div>
      </div>

      <div className='mt-6'>
        <p
          className='
            font-bold
            text-lg
            lg:text-xl
          '
        >
          Kandungan Vitamin:
        </p>
        <p
          className='
            text-sm
            lg:text-xl
            text-gray-500
          '
        >
          {fruit.vitamin}
        </p>
      </div>

    </div>
  )
}

export default CardFruits
