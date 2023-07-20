import Form from '@/components/Form'
import Modal from '@/components/Modal'
import React from 'react'

const page = () => {
  return (
      <Modal>
         <h1 className="bg-gradient-to-r from-purple-500 via-pink-600 to-rose-500 bg-clip-text text-transparent text-center display text-3xl md:text-4xl font-bold pt-4">
         Upload Project                </h1>
        <Form />
      </Modal>
  )
}

export default page