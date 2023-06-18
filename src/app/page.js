'use client'

import React, {useState} from 'react'
import Image from 'next/image'
import profile from '@/assets/default.png'

import {mahasiswa, nilai, titleAspek} from '@/utilities/data'

export default function Home() {
  const [formData, setFormData] = useState({})

  const onFormChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const reGroup = (data) => {
    const result = {}
    for (const key in data) {
      const splitted = key.split('-')
      const aspek = splitted[0]
      const mahasiswa = splitted[1]
      const nilai = data[key]
      if (!(aspek in result)) {
        result[aspek] = {[mahasiswa]: Number(nilai)}
      } else {
        result[aspek][mahasiswa] = Number(nilai)
      }
    }
    return result
  }

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault()
      console.log(reGroup(formData))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='inline-block w-full h-full'>
      <div className='w-full my-8'>
        <p className='text-center text-4xl'>Aplikasi Penilaian Mahasiswa</p>
      </div>
      <form onSubmit={onFormSubmit}>
        <div className='flex flex-row p-2 m-2'>
          <p className='flex-1 text-center mx-1'></p>
          {titleAspek.map((item, idx) => (
            <p key={idx} className='flex-1 text-center mx-1'>
              {item.title}
            </p>
          ))}
        </div>
        {mahasiswa.map((item, idx) => (
          <div key={idx} className='flex flex-row border-solid border-2 border-gray-400 p-2 m-2'>
            <div className='flex flex-1 items-center mx-1'>
              <Image className='rounded-full w-8 h-8 mx-1' src={profile} alt='profile' />
              <p>{item.title}</p>
            </div>
            {titleAspek.map((x, i) => (
              <div key={i} className='relative flex-1 mx-1'>
                <select
                  className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                  name={`${x.name}-${item.name}`}
                  onChange={onFormChange}
                >
                  {nilai.map((item, i) => (
                    <option key={i} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                  <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                    <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className='float-right m-1'>
          <button className='bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'>
            Simpan
          </button>
        </div>
      </form>
    </div>
  )
}
