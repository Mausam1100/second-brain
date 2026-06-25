import { Bird, Brain, FileText, Hash, TvMinimalPlay } from "lucide-react"
import { textVariants } from "./styles/typography"
import { cn } from "../lib/utils"
import SideBarType from "./SideBarType"
import { NavLink, useNavigate} from "react-router-dom"
import { useLogOutModal } from "../store/logOutModal"


function SideBar() {
    const navigate = useNavigate()
    const {openModal} = useLogOutModal((state) => state)

  return (
    <>
        <div className="border-r sticky top-0 border-border h-screen flex flex-col justify-between">
            <div>
                <div className="flex gap-x-2 items-center px-4 py-3 cursor-pointer" onClick={() => navigate('/')}>
                    <div>
                        <Brain size={36} strokeWidth={2} color="#4f45e0" />
                    </div>
                    <div className={cn(textVariants({variant: 'h2'}), "text-gray-700")} >Second Brain</div>
                </div>

                <div>
                    <NavLink to='/twitter-content'>
                        {({isActive}) => (
                            <SideBarType isActive={isActive} name={'Tweets'} icon={<Bird strokeWidth={1.5} size={24} color="#4B515E" />} />
                        )}
                    </NavLink>

                    <NavLink to='/youtube-content'>
                        {({isActive}) => (
                            <SideBarType isActive={isActive} name={'Videos'} icon={<TvMinimalPlay strokeWidth={1.5} size={24} color="#4B515E" />} />
                        )}
                    </NavLink>

                    <NavLink to='/document-content'>
                        {({isActive}) => (
                            <SideBarType isActive={isActive} name={'Documents'} icon={<FileText strokeWidth={1.5} size={23} color="#4B515E" />} />
                        )}
                    </NavLink>

                    <NavLink to='/tags'>
                        {({isActive}) => (
                            <SideBarType isActive={isActive} name={'Tags'} icon={<Hash strokeWidth={1.5} size={24} color="#4B515E" />} />
                        )}
                    </NavLink>
                </div>
            </div>

            <div className="px-4 py-4">
                <div onClick={() => openModal()} className="bg-red-400 cursor-pointer text-center w-full text-white py-2 font-semibold px-4 rounded-lg">
                    Log Out
                </div>
            </div>
        </div>
    </>
  )
}

export default SideBar