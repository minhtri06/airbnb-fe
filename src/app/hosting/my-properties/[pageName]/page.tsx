'use client'

import React from 'react'

const page = ({
  params,

  searchParams,
}: {
  params: { pageName: string }
  searchParams: any
}) => {
  console.log(searchParams)
  return <div>{params.pageName}</div>
}

export default page
