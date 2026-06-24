import { Share2, Trash2 } from "lucide-react"
import { cn } from "../lib/utils"
import { textVariants } from "./styles/typography"
import { TwitterTweetEmbed } from "react-twitter-embed";
import { useDeleteModal } from "../store/deleteModal";

interface contentBoxType {
    title: string,
    type: "youtube" | "twitter" | "document",
    link?: string,
    contentId: string
}

function ContentBox({title, type, link, contentId}: contentBoxType) {
    const openModal = useDeleteModal((state) => state.openModal)
    const getEmbedUrl = (url: string) => {
  try {
    let videoId: string | null = null;

    if (url.includes("youtu.be")) {
      videoId = url.split("/").pop() || null;
    } else {
      const parsed = new URL(url);
      videoId = parsed.searchParams.get("v");
    }

    if (!videoId) return null;

    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return null;
  }
};

    const getTweetId = (url: string) => {
  try {
    const match = url.match(/status\/(\d+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};
    
    const embedYoutubeLink =
  type === "youtube" && link ? getEmbedUrl(link) : null;

const embedTwitterLink =
  type === "twitter" && link ? getTweetId(link) : undefined;
  return (
    <>
        <div className="border shadow-sm h-fit border-border bg-white px-4 py-3 rounded-xl">
            <div className="flex items-center justify-between">
                <div>
                    <p className={cn(textVariants({variant: "title"}))}>{title}</p>
                </div>
                
                <div className="flex items-center gap-x-3">
                    <div><Share2 className="cursor-pointer" size={18} color="#9499A1" /></div>
                    <div><Trash2 className="cursor-pointer" onClick={() => openModal(contentId!)} size={20} color="#9499A1" /></div>
                </div>
            </div>

            <div className="py-4">
                <div>
                    {type === "youtube" && embedYoutubeLink && (
                        <iframe
                            height={180}
                            className="w-full rounded-lg"
                            src={embedYoutubeLink}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                        )}
                    
                    {type === "twitter" && embedTwitterLink && (
                        <TwitterTweetEmbed tweetId={embedTwitterLink} />
                        )}
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default ContentBox