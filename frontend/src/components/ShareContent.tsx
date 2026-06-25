import { cn } from "../lib/utils"
import { textVariants } from "./styles/typography"
import { useShareContent } from "../store/shareContentModal"
import { Copy, X } from "lucide-react"
import Button from "./Button"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"

type InputPropsType = {
    inputValue: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

function ShareContent({inputValue, setInputValue}: InputPropsType) {
    const {isOpen, closeModal} = useShareContent((state) => state)

    const copyValue = async () => {
        await navigator.clipboard.writeText(inputValue);
    };

  const mutation = useMutation({
        mutationKey: ["getShareLink"],
        mutationFn: async () => {
            const res = await axios.post('http://localhost:5000/api/v1/brain/share', {share: false}, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            return res.data
        },
        onSuccess: () => {
            toast.success("Share link disabled!")
            setInputValue(`No link available!`)
        }
    })

  return (
    <>
        {isOpen && <div onClick={closeModal} className="bg-black/40 z-50 fixed inset-0 flex justify-center items-center backdrop-blur-xs">
            <div onClick={(e) => e.stopPropagation()} className="bg-white relative border-border rounded-2xl px-5 py-4 w-[25%]">
                <X onClick={closeModal} className="absolute top-2 right-4 cursor-pointer" />
              <div></div>
                <div className="flex pt-3 flex-col items-center justify-center">
                    <div className={cn(textVariants({variant: "h2"}))}>Share Your Second Brain</div>
                    <div className="text-sm text-gray-500 py-3">
                        <p>Share your entire collection of notes, documents, tweets and videos with others. They'll be able to import your content into their own Second Brain.</p>
                    </div>
                </div>

                <div className="flex mt-5 mb-2">
                    <input type="text" placeholder={inputValue} className="outline outline-border rounded-l-lg  w-full px-3 py-1" disabled  />
                    <div onClick={() => copyValue()} className="flex cursor-pointer items-center px-2 justify-center outline outline-border rounded-r-lg">
                        <Copy size={17} />
                    </div>
                </div>

                <div>
                    <Button onClick={() => mutation.mutate()} className="w-full mt-2 bg-red-400" variant={"primary"}>Disable Link</Button>
                </div>
            </div>
        </div>}
    </>
  )
}

export default ShareContent