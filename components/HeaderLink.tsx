import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { signOut, useSession } from 'next-auth/react';

interface HeaderLinkProps {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> | any
  text: string
  avatar?: boolean
  feed?: boolean
  active?: boolean
  hidden?: boolean
}
const HeaderLink = ({ Icon, text, avatar, feed, active, hidden }: HeaderLinkProps) => {
  const { data: session} = useSession();

  return (
    <div className={`${hidden && "hidden md:inline-flex"} cursor-pointer flex justify-center flex-col items-center ${feed ? "text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 space-y-1" : "text-gray-500 hover:text-gray-700"} ${active && "!text-black dark:!text-white"}`}
      onClick={() => avatar && signOut()}
    >
      {/* dado que mando un componente por props va capitalizado */}
      {/* cada vez que quiera estilizar sobre algo de material tengo que poner la ! que es !important */}
      {avatar ? <Icon className="!h-7 !w-7 lg:!-mb-1 " src={session?.user?.image || "/images/default-image.jpg"} /> : <Icon />}
      <h4 className={`text-sm ${feed && "hidden lg:flex justify-center w-full mx-auto"}`}>{text}</h4>
      {active && (<span className="hidden lg:inline-flex h-0.5 w-[calc(100%+20px)] bg-black dark:bg-white rounded-t-full" />)}
    </div>
  )
}
export default HeaderLink;