import * as React from "react"
import { Link } from "gatsby"


const NotFoundPage = () => {
  return (
    <main>
      <h1>this page isnt working press link below to go back to homepage</h1>
        <Link to="/">Go home</Link>.
    </main>
  )
}

export default NotFoundPage

export const Head = () => <title>Not found</title>