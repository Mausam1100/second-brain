import { useState } from "react"
import Button from "../components/Button"
import { textVariants } from "../components/styles/typography"
import { cn } from "../lib/utils"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

interface dataType {
  username: string,
  password: string
}

function SignUp() {
  const[username, setUsername] = useState("") 
  const[password, setPassword] = useState("") 
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationKey: ["signUp"],
    mutationFn: (data: dataType) => 
      axios.post('http://localhost:5000/api/v1/user/sign-up', data),
    onSuccess: () => {
      console.log("User register successfully")
      toast.success("User registered successfully.")
    },
    onError: (error: AxiosError<{msg: string}>) => {
      const message = error?.response?.data?.msg || "Signup failed"
      toast.error(message)
    }
  })

  return (
    <>
        <div className="bg-gray-100 w-screen h-screen flex justify-center items-center">
            <div className="bg-white max-w-137.5 w-[27%] border border-border shadow-lg px-12 py-10 rounded-xl">
              <h1 className={cn(textVariants({variant: "h2"}), "text-gray-600 text-center pb-5")}>Register</h1>

              <div>
                <p className={cn(textVariants({variant: "title"}), "pb-1 text-gray-600")}>Username</p>
                <input value={username} onChange={(e) => setUsername(e.target.value)} className="rounded-md outline-none w-full py-1 px-2 border border-border" type="text" placeholder="Enter username" />
              </div>

              <div className="pt-3 pb-7">
                <p className={cn(textVariants({variant: "title"}), "pb-1 text-gray-600")}>Password</p>
                <input value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-md outline-none w-full py-1 px-2 border border-border" type="password" placeholder="Enter password" />
              </div>

              <div>
                <Button disabled={mutation.isPending} onClick={() => mutation.mutate({username, password})} className={`w-full py-2.5 ${mutation.isPending? "cursor-not-allowed bg-[#7f7af0]": "cursor-pointer"}`}>{mutation.isPending? "Signing up": "Sign Up"}</Button>
              </div>
              <div onClick={() => navigate('/sign-in')} className="pt-3 text-right text-blue-600 cursor-pointer underline">
                Already have an account?
              </div>
            </div>
        </div>
    </>
  )
}

export default SignUp