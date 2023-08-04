import React from 'react'

const FooterComponent = () => {
  return (
    <div className="bg-slate-900 fixed bottom-0 inset-x-0">
      <div className="flex flex-col md:flex-row justify-between w-full px-8 md:py-4 text-black">
        <div className="block text-sm text-white mx-auto lg:m-0 py-2 ">
          © 2023 Sefruit App™. All Rights Reserved.
        </div>

        <div className="py-2 text-sm text-center mx-auto lg:m-0">
          <ul className="flex flex-wrap gap-4 items-center text-sm font-medium text-white sm:mb-0">
            <li>
                <i className="fa-brands fa-whatsapp fa-lg mr-1"></i>
                <a href="#" className="hover:underline ">WhatsApp</a>
            </li>
            <li>
                <i className="fa-regular fa-envelope fa-lg mr-1"></i>
                <a href="#" className="hover:underline ">Email</a>
            </li>
            <li>
              <i className="fa-brands fa-github fa-lg mr-1"></i>
                <a href="#" className="hover:underline ">Github</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default FooterComponent
