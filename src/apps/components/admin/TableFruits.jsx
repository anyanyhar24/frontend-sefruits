import React, { useEffect, useState } from 'react'
import FruitsSourceAPI from '../../api/resources/FruitsSource'
import ToastNotification from '../helpers/ToasNotify'
import Swal from 'sweetalert2'
import SpinnerElement from '../helpers/SpinnerElement'
import { NavLink } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

const TableFruits = () => {
  const [fruits, setFruits] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalFruits, setTotalFruits] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const limit = 5

  const getAllFruits = async (page, limit) => {
    setIsLoading(true)
    try {
      const response = await FruitsSourceAPI.getAllFruitsByPaginate(page, limit)
      setFruits(response.fruits)
      setCurrentPage(response.page)
      setTotalFruits(response.totalFruits)
      setTotalPages(response.totalPages)
      console.log(response)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
    setIsLoading(false)
  }

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1)
  }

  const deleteFruits = async (id) => {
    setIsLoading(true)
    try {
      const response = await FruitsSourceAPI.deleteFruitById(id)
      const currentDevices = fruits.filter(fruit => fruit.id !== id)
      if (currentDevices.length > 0) {
        getAllFruits(currentPage, limit)
      } else {
        const prevPage = currentPage > 1 ? currentPage - 1 : 1
        getAllFruits(prevPage, limit)
      }
      ToastNotification.toastSuccess(response)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
    setIsLoading(false)
  }

  const alertDeleteFruits = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Anda Ingin Hapus Buah?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFruits(id)
      }
    })
  }

  useEffect(() => {
    getAllFruits(currentPage, limit)
  }, [currentPage])

  return (
    <>
      {
        isLoading && <SpinnerElement/>
      }
      <div className='w-full bg-white shadow p-5'>
        <div className='
          flex
          justify-between
          items-end
        '>
          <h1
            className='
              font-bold
              text-lg
              lg:text-3xl
            '
          >
            Daftar Buah
          </h1>

          <NavLink to='/fruits/addNewFruits'>
            <button
              type='button'
              className='
                p-2
                md:p-3
                px-3
                md:px-4
                bg-blue-500
                hover:bg-blue-300
                active:bg-blue-200
                shadow-md
                transition-all
                ease-out
                duration-200
                font-semibold
                text-sm
                text-white
                rounded
              '
            >
              <span className='hidden md:inline-block mr-2'>Tambah Buah</span>
              <i className="fa-brands fa-apple"></i>
            </button>
          </NavLink>
        </div>

        <div className="mt-6 overflow-x-auto w-full border">
          <table className=" w-full divide-y-2 divide-gray-200 text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 whitespace-nowrap">
              <tr>
                <th className="px-4 py-3">
                    No
                </th>
                <th className="px-4 py-3">
                    Nama
                </th>
                <th className="px-4 py-3">
                    Kandungan Air(g)
                </th>
                <th className="px-4 py-3 text-center">
                    Kalori (Kal)
                </th>
                <th className="px-4 py-3 text-center">
                    Protein(g)
                </th>
                <th className="px-4 py-3 text-center">
                    Lemak(g)
                </th>
                <th className="px-4 py-3 text-center">
                    Karbohidrat(g)
                </th>
                <th className="px-4 py-3">
                    Vitamin
                </th>
                <th className="px-4 py-3 text-center">
                    Aksi
                </th>
              </tr>
            </thead>
            <tbody
              className='whitespace-nowrap'
            >
              { fruits.map((fruit, index) => (
                <tr
                  key={index}
                  className={`bg-white hover:bg-gray-50 ${index === fruits.length - 1 ? 'border-b-0' : 'border-b'}`}>
                  <td className="px-4 py-3 font-bold">
                    {index + 1 + (currentPage - 1) * limit}
                  </td>
                  <td className="px-4 py-3">
                    { fruit.name }
                  </td>
                  <td className="px-4 py-3 text-center">
                    { fruit.waterPerGram }
                  </td>
                  <td className="px-4 py-3 text-center">
                    { fruit.calorie }
                  </td>
                  <td className="px-4 py-3 text-center">
                    { fruit.protein }
                  </td>
                  <td className="px-4 py-3 text-center">
                    { fruit.fat }
                  </td>
                  <td className="px-4 py-3 text-center">
                    { fruit.carbohydrate }
                  </td>
                  <td className="px-4 py-3">
                    { fruit.vitamin }
                  </td>
                  <td className="px-4 py-3 flex justify-center gap-2 text-white font-semibold">
                    <NavLink to={`/fruits/detail/${fruit.id}`}>
                      <button
                        className='
                          bg-yellow-400
                          hover:bg-yellow-300
                          active:bg-yellow-200
                          py-2
                          px-4
                          rounded
                        '
                      >
                        Edit
                      </button>
                    </NavLink>
                    <button
                      onClick={() => alertDeleteFruits(fruit.id)}
                      className='
                        bg-red-400
                        hover:bg-red-300
                        active:bg-red-200
                        py-2
                        px-4
                        rounded
                      '
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
              }
            </tbody>
          </table>
        </div>
        <p
          className='inline-block my-2 mt-5 text-sm'
        >
          Total Buah : { totalFruits }, Page: { totalFruits ? currentPage : 0 } of { totalPages }
        </p>
        <div className='my-2'>
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            onPageChange={handlePageChange}
            forcePage={currentPage - 1}
            containerClassName={'pagination flex justify-start border border-gray-300 w-fit rounded-md p-2'}
            activeClassName={'bg-blue-500 text-white'}
            previousLabel={<span className="px-2">previous</span>}
            nextLabel={<span className="px-2">next</span>}
            breakClassName={'border-r border-gray-300'}
            breakLinkClassName={'px-2'}
            pageClassName={'border-r border-gray-300'}
            pageLinkClassName={'px-2'}
          />
        </div>
      </div>
    </>
  )
}

export default TableFruits
