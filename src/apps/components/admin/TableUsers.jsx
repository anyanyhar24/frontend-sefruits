import React, { useEffect, useState } from 'react'
import UsersSourceAPI from '../../api/resources/UsersSource'
import ToastNotification from '../helpers/ToasNotify'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
import SpinnerElement from '../helpers/SpinnerElement'
import ReactPaginate from 'react-paginate'

const TableUsers = () => {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const limit = 5

  const getAllUsers = async (page, limit) => {
    setIsLoading(true)
    try {
      const response = await UsersSourceAPI.getAllUsersByPaginate(page, limit)
      setUsers(response.users)
      setCurrentPage(response.page)
      setTotalUsers(response.totalUsers)
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

  const deleteUsers = async (id) => {
    setIsLoading(true)
    try {
      const response = await UsersSourceAPI.deleteUserById(id)
      const currentDevices = users.filter(user => user.id !== id)
      if (currentDevices.length > 0) {
        getAllUsers(currentPage, limit)
      } else {
        const prevPage = currentPage > 1 ? currentPage - 1 : 1
        getAllUsers(prevPage, limit)
      }
      ToastNotification.toastSuccess(response)
    } catch (error) {
      ToastNotification.toastError(error.response.data.message)
    }
    setIsLoading(false)
  }

  const alertDeleteUsers = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Anda Ingin Hapus Pengguna?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUsers(id)
      }
    })
  }

  useEffect(() => {
    getAllUsers(currentPage, limit)
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
            Daftar Pengguna
          </h1>

          <NavLink to='/user/addNewUser'>
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
              <span className='hidden md:inline-block mr-2'>Tambah pengguna</span>
              <i className="fa-solid fa-user-plus"></i>
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
                    Nama Lengkap
                </th>
                <th className="px-4 py-3">
                    Username
                </th>
                <th className="px-4 py-3">
                    Email
                </th>
                <th className="px-4 py-3">
                    No Handphone
                </th>
                <th className="px-4 py-3">
                    Alamat
                </th>
                <th className="px-4 py-3 text-center">
                    Aksi
                </th>
              </tr>
            </thead>
            <tbody
              className='whitespace-nowrap'
            >
              { users.map((user, index) => (
                <tr
                  key={index}
                  className={`bg-white hover:bg-gray-50 ${index === users.length - 1 ? 'border-b-0' : 'border-b'}`}>
                  <td className="px-4 py-3 font-bold">
                    {index + 1 + (currentPage - 1) * limit}
                  </td>
                  <td className="px-4 py-3">
                    { user.fullname }
                  </td>
                  <td className="px-4 py-3">
                    { user.username }
                  </td>
                  <td className="px-4 py-3">
                    { user.email }
                  </td>
                  <td className="px-4 py-3">
                    { user.phoneNumber }
                  </td>
                  <td className="px-4 py-3">
                    { user.address }
                  </td>
                  <td className="px-4 py-3 flex justify-center gap-2 text-white font-semibold">
                    <NavLink to={`/user/profile/${user.id}`}>
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
                      onClick={() => alertDeleteUsers(user.id)}
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
          Total Users : { totalUsers }, Page: { totalUsers ? currentPage : 0 } of { totalPages }
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

export default TableUsers
