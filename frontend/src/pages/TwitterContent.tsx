import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import DeleteModal from "../components/DeleteModal"
import SideBar from "../components/SideBar"
import { cn } from "../lib/utils"
import { textVariants } from "../components/styles/typography"
import ContentBox from "../components/ContentBox"

type Content = {
  _id: string;
  type: "youtube" | "twitter" | "document";
  title: string;
  link: string;
  contentId: string
};

function TwitterContent() {
    const { data } = useQuery({
        queryKey: ["getContent"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/api/v1/content", {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            return res.data
        },
    })

    const youtubeContent = data?.content?.filter((content: Content) => content.type === "twitter") || [];
  return (
    <>
        <DeleteModal />

        <div className='grid grid-cols-10 mmax-w-[1600px] mx-auto'>
          <div className='col-span-2'>
            <SideBar />
          </div>

          <div className="bg-bg-content px-8 py-7 col-span-8">
            <div className='flex justify-between items-center pb-9'>
              <div className={cn(textVariants({variant: "h1"}))}>Twitter Content</div>
            </div>

            <div className='grid grid-cols-3 gap-x-6 gap-y-5'>
              {youtubeContent.map((content: Content) => {
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

export default TwitterContent