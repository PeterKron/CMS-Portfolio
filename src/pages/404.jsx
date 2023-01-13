import * as React from "react"
import { Link } from "gatsby"

export const Head = () => <title>Not found</title>

const NotFoundPage = () => {
  return (
    <>
    <main class="p-4">
      <h1>This page isnt working press link below to go back to homepage</h1>
        <Link to="/">Go to homepage </Link>
    </main>
    </>
  )
}

export default NotFoundPage
