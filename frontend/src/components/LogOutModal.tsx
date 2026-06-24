import { useMutation } from "@tanstack/react-query"
import { cn } from "../lib/utils"
import { useLogOutModal } from "../store/logOutModal"
import Button from "./Button"
import { textVariants } from "./styles/typography"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function LogOutModal() {
    const {isOpen, closeModal} = useLogOutModal((state) => state)
    const navigate = useNavigate()

    const mutation = useMutation ({
        mutationKey: ["logOut"],
        mutationFn: async () => {
            await axios.post('http://localhost:5000/api/v1/user/logout', {}, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
        },
        onSuccess: () => {
            localStorage.removeItem("token")
            toast.success("User logged out successfully")
            closeModal()
            navigate('/sign-in')
        }
    })
  return (
    <>
        {isOpen && <div onClick={closeModal} className="bg-black/40 z-50 fixed inset-0 flex justify-center items-center backdrop-blur-xs">
            <div onClick={(e) => e.stopPropagation()} className="bg-white relative border-border rounded-2xl px-5 py-4 w-[25%]">
                <div className="flex pt-3 flex-col items-center justify-center">
                    <div className={cn(textVariants({variant: "h2"}))}>Log out!</div>
                    <div className="text-center text-sm text-gray-500 py-3">
                        <p>Are you sure you want to log out?</p>
                        <p>This action cannot be undone.</p>
                    </div>
                </div>

                <div className="flex gap-x-3 mt-5 mb-2">
                    <Button onClick={closeModal} className="w-[50%] bg-gray-200 text-black">Cancel</Button>
                    <Button disabled={mutation.isPending} onClick={() => mutation.mutate()} className="w-[50%] bg-red-500 text-white">Log Out</Button>
                </div>
            </div>
        </div>}
    </>
  )
}

export default LogOutModal