import { Button } from '@mui/material'
import React from 'react'

export const AddBtn = ({increase, handleClick}) => {
  return (
    <Button variant='outlined' onClick={() => handleClick(increase)}>+{increase}</Button>
  )
}
