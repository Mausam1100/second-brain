import { X } from "lucide-react"
import { cn } from "../lib/utils"
import Button from "./Button"
import { textVariants } from "./styles/typography"
import { useModalStore } from "../store/modal"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"

interface ContentType {
  type: "youtube" | "twitter" | "document" | "",
  title: string,
  link: string
}


function Modal() {
  const queryClient = useQueryClient()
  const {isOpen, closeModal} = useModalStore((state) => state)
  const [contentInfo, setContentInfo] = useState<ContentType>({
    type: "",
    title: "",
    link: ""
  })

  const mutation = useMutation({
    mutationKey: ["addContent"],
    mutationFn: (data: ContentType) =>
      axios.post("http://localhost:5000/api/v1/content", data, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["getContent"]})
      toast.success("Content added successfully")
      setContentInfo({
        type: "",
        title: "",
        link: ""
      })
      closeModal()
    },
    onError: (error: AxiosError<{msg: string}>) => {
      const message = error?.response?.data?.msg || "Action failed"
      toast.error(message)
    }
  })

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const{name, value} = e.target
    setContentInfo((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  return (
    <>
        {isOpen && <div onClick={closeModal} className="fixed z-50 inset-0 bg-black/40 flex justify-center backdrop-blur-xs items-center">
            <div onClick={(e) => e.stopPropagation()} className="bg-white w-[30%] relative border border-border rounded-xl px-5 py-4">
              <X onClick={closeModal} className="absolute top-2 right-4 cursor-pointer" />
              <div>
                <div className={cn(textVariants({variant: "h2"}),"py-2 pb-4")}>New Content</div>
                <div>
                  <p className={cn(textVariants({variant: "title"}), "pb-1")}>Title:</p>
                  <div className="w-full flex gap-x-3">
                    <input name="title" onChange={(e) => handleOnChange(e)} value={contentInfo.title} className="rounded-md outline-none w-[75%] py-1 px-2 border border-border" type="text" placeholder="Enter title" />
                    <select name="type" required onChange={(e) => handleOnChange(e)} value={contentInfo.type} className="border outline-none px-2 w-[25%] border-border rounded-lg" >
                      <option value="">Type</option>
                      <option value="youtube">Youtube</option>
                      <option value="twitter">Twitter</option>
                      <option value="document">Document</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <p className={cn(textVariants({variant: "title"}), "pb-1")}>Link:</p>
                  <input name="link" onChange={(e) => handleOnChange(e)} value={contentInfo.link} className="rounded-md outline-none w-full py-1 px-2 border border-border" type="text" placeholder="Enter link" />
                </div>
              </div>

              <div className="pt-5">
                <Button disabled={mutation.isPending} onClick={() => mutation.mutate(contentInfo)} variant={"primary"} className={`w-full ${mutation.isPending? "cursor-not-allowed bg-[#7f7af0]": "cursor-pointer"}`} size={"md"} >{mutation.isPending? "Adding Content":"Add Content"}</Button>
              </div>
            </div>
        </div>}
    </>
  )
}

export default Modal