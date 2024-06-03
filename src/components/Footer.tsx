import { Typography } from "@material-tailwind/react"
import logoImage from "../assets/Images/logo.png"
import { About } from "./About"
import { Link } from "react-router-dom"
const currentYear = new Date().getFullYear()
export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    }
  }
  return (
    <footer className="p-6  w-full dark:bg-gray-800  mt-40 bg-zinc-950">
      <About />
      <div className="container max-w-7xl flex items-center justify-center gap-10">
        <Link onClick={scrollToTop} className="flex items-center" to="/">
          <img src={logoImage} alt="logo" className="w-12 h-12 rounded-full " />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="flex items-center space-x-4 text-sm">
          <Link onClick={scrollToTop} className="hover:underline" to="/">
            Home
          </Link>
          <Link onClick={scrollToTop} className="hover:underline" to="/contactUs">
            Contact Us
          </Link>
        </nav>
      </div>
      <div className="mt-6 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flexRow md:justify-between">
        <Typography
          variant="small"
          className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
        >
          &copy; {currentYear} <a href="https://material-tailwind.com/">Kalli_stack</a>. All Rights
          Reserved.
        </Typography>
        <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
          <Typography
            as="a"
            href="https://github.com/fakhraldeen18"
            className="opacity-80 transition-opacity hover:opacity-100"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </Typography>
          <Typography
            as="a"
            href="https://www.linkedin.com/in/fakhrdeenalfallatah/"
            className="opacity-80 transition-opacity hover:opacity-100"
          >
            <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 21" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
              />
            </svg>
          </Typography>
        </div>
      </div>
    </footer>
  )
}
