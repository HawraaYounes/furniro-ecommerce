import React from 'react'
import { useRouteError } from 'react-router-dom'
import NotFoundError from './NotFoundError'
import Nav from '../components/Nav'

const ErrorPage = () => {
    const error=useRouteError()
    let content
    console.log("error status:", error.status)
    if(error.status===404){
        console.log("404 error")
        content=<NotFoundError/>
    }else{
        console.log("hhhhhhh")
        content=
            <p>An error occured</p>
    }
  return (
    <>
      <Nav/>
      {content}
    </>
  )
}

export default ErrorPage
