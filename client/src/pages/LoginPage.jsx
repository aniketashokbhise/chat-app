import React, { useState } from 'react'
import assets from '../assets/assets'

const LoginPage = () => {

  const [currState, setCurrentState] = useState("Sign up")

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")

  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault()

    // Step 1 → Step 2 (Bio)
    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return
    }
  }

  return (
    <div>
      <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

        {/* Left Logo */}
        <img
          src={assets.logo_big}
          alt="Logo"
          className='w-[min(30vw,250px)]'
        />

        {/* Right Form */}
        <form
          onSubmit={handleSubmit}
          className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg w-[350px]'
        >

          {/* Header */}
          <h2 className='font-medium text-2xl flex justify-between items-center'>

            {currState}

            {/* Back Button */}
            {isDataSubmitted && (
              <img
                src={assets.arrow_icon}
                alt="Back"
                className='w-5 cursor-pointer'
                onClick={() => setIsDataSubmitted(false)}
              />
            )}

          </h2>

          {/* Full Name */}
          {currState === "Sign up" && !isDataSubmitted && (
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder='Full Name'
              required
              className='p-2 border border-gray-500 rounded-md focus:outline-none'
            />
          )}

          {/* Email + Password */}
          {!isDataSubmitted && (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter Email'
                required
                className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                required
                className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
              />
            </>
          )}

          {/* Bio */}
          {currState === "Sign up" && isDataSubmitted && (
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder='Provide a short bio...'
              required
              className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md hover:opacity-90 transition'
          >
            {currState === "Sign up"
              ? (isDataSubmitted ? "Finish Signup" : "Next")
              : "Login Now"}
          </button>

          {/* Terms */}
          <div className='flex items-center gap-2 text-sm text-gray-400'>
            <input type="checkbox" required />
            <p>Agree to the terms & privacy policy</p>
          </div>

          {/* Switch Login / Signup */}
          <div className='text-sm text-gray-400'>

            {currState === "Sign up" ? (
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setCurrentState("Login")
                    setIsDataSubmitted(false)
                  }}
                  className='text-violet-500 cursor-pointer font-medium'
                >
                  Login here
                </span>
              </p>
            ) : (
              <p>
                Create an account{" "}
                <span
                  onClick={() => setCurrentState("Sign up")}
                  className='text-violet-500 cursor-pointer font-medium'
                >
                  Click here
                </span>
              </p>
            )}

          </div>

        </form>
      </div>
    </div>
  )
}

export default LoginPage
