interface SideType {
    name: string,
    icon: React.ReactNode,
    isActive: boolean
}

function SideBarType({icon, name, isActive}: SideType) {
  return (
    <>
        <div className={`flex items-center gap-x-4 px-4 mx-3 rounded-lg cursor-pointer my-2 py-2 hover:bg-gray-100 ${isActive? "bg-gray-200": "bg-white"}`}>
            <div>
                {icon}
            </div>
            <div className="text-[#4B515E] text-lg font-normal">{name}</div>
        </div>
    </>
  )
}

export default SideBarType