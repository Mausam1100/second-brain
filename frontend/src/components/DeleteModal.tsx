import { cn } from "../lib/utils"
import Button from "./Button"
import { textVariants } from "./styles/typography"
import { useDeleteModal } from "../store/deleteModal"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"

function DeleteModal() {
    const queryClient = useQueryClient()
    const {isOpen, closeModal} = useDeleteModal((state) => state)
    const noteId = useDeleteModal((state) => state.noteId)
    const mutation = useMutation({
        mutationKey: ["deleteContent"],
        mutationFn: (id: string) =>
            axios.delete(`http://localhost:5000/api/v1/content/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }),
        onSuccess: () => {
            toast.success("Content deleted successfully")
            closeModal()
            queryClient.invalidateQueries({queryKey: ["getContent"]})
        }
    })
  return (
    <>
        {isOpen && <div onClick={closeModal} className="bg-black/40 z-50 fixed inset-0 flex justify-center items-center backdrop-blur-xs">
            <div onClick={(e) => e.stopPropagation()} className="bg-white relative border-border rounded-2xl px-5 py-4 w-[25%]">
                <div className="flex pt-3 flex-col items-center justify-center">
                    <div className={cn(textVariants({variant: "h2"}))}>Delete Content</div>
                    <div className="text-center text-sm text-gray-500 py-3">
                        <p>Are you sure you want to delete this content?</p>
                        <p>This action cannot be undone.</p>
                    </div>
                </div>

                <div className="flex gap-x-3 mt-5 mb-2">
                    <Button onClick={closeModal} className="w-[50%] bg-gray-200 text-black">Cancel</Button>
                    <Button onClick={() => mutation.mutate(noteId!)} className="w-[50%] bg-red-500 text-white">Delete</Button>
                </div>
            </div>
        </div>}
    </>
  )
}

export default DeleteModal