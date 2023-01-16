import * as React from "react"
import { Link } from "gatsby"

export const Head = () => <title>Not found</title>

const NotFoundPage = () => {
  return (
    <>
    <main className="p-4">
      <h1 className="text-5xl py-5">404 :( </h1>
      <h1>This page isn't working press link below to go back to homepage</h1>
        <Link to="/" className="text-3xl">Go to homepage </Link>
    </main>
    </>
  )
}

export default NotFoundPage
