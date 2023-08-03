'use client'

import React from 'react'

const page = ({ params }: { params: { pageName: string } }) => {
  return <div>{params.pageName}</div>
}

export default page
