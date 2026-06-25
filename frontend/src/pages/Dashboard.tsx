import Button from '../components/Button'
import { Plus, Share2 } from 'lucide-react'
import SideBar from "../components/SideBar"
import { cn } from '../lib/utils'
import { textVariants } from '../components/styles/typography'
import ContentBox from '../components/ContentBox'
import Modal from '../components/Modal'
import { useModalStore } from '../store/modal'
import DeleteModal from '../components/DeleteModal'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LogOutModal from '../components/LogOutModal'
import ShareContent from '../components/ShareContent'
import { useShareContent } from '../store/shareContentModal'
import { useState } from 'react'
import toast from 'react-hot-toast'

type Content = {
  _id: string;
  type: "youtube" | "twitter" | "document";
  title: string;
  link: string;
  contentId: string
};

function Dashboard() {
  const openModal = useModalStore((state) => state.openModal)
  const openModal2 = useShareContent((state) => state.openModal)
  const [inputValue, setInputValue] = useState('Here is the value')

  const mutation = useMutation({
        mutationKey: ["getShareLink"],
        mutationFn: async () => {
            const res = await axios.post('http://localhost:5000/api/v1/brain/share', {share: true}, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            return res.data
        },
        onSuccess: (data) => {
            toast.success("Share link fetched!")
            setInputValue(`http://localhost:5000/api/v1/brain/share/${data.token}`)
        }
    })

  const { data } = useQuery({
  queryKey: ["getContent"],
  queryFn: async () => {
    const res = await axios.get("http://localhost:5000/api/v1/content", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return res.data;
  },
  
  
});
  return (
    <>
        <Modal />
        <DeleteModal />
        <LogOutModal />
        <ShareContent inputValue={inputValue} setInputValue={setInputValue}/>
        

        <div className='grid grid-cols-10 max-w-[1600px] mx-auto'>
          <div className='col-span-2'>
            <SideBar />
          </div>

          <div className="bg-bg-content  col-span-8">
            <div className='flex justify-between items-center pb-5 px-8 pt-5 border-b shadow-xs border-border sticky top-0 bg-bg-content z-40'>
              <div className={cn(textVariants({variant: "h1"}))}>All Notes</div>
              <div className='flex items-center gap-x-4'>
                <Button onClick={() => {
                  openModal2();
                  mutation.mutate()
                }} variant={"secondary"} size={"md"} leftIcon={<Share2 strokeWidth={2} size={20} />} >Share Brain</Button>
                <Button onClick={openModal} variant={"primary"} size={"md"} leftIcon={<Plus strokeWidth={1.75} size={24} />} >Add Content</Button>
              </div>
            </div>

            <div className='grid grid-cols-3 px-8 py-7 gap-x-6 gap-y-5'>
              {data?.content.map((content: Content) => {
                console.log(content)
                return (
                  <ContentBox key={content._id} contentId={content._id} type={content.type} title={content.title} link={content.link} />
                )
              })}
            </div>
          </div>
        </div>
    </>
  )
}

export default Dashboard