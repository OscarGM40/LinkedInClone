import Image from "next/image"
import HeaderLink from "./HeaderLink"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import GroupIcon from "@mui/icons-material/Group";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import { Avatar } from "@mui/material";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const Header = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [actualTheme, setActualTheme] = useState<string>("light");
  /* resolvedTheme es el currentTheme */
  const { setTheme, resolvedTheme, theme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    setActualTheme(resolvedTheme! || "light");
  }, [resolvedTheme])

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#1D2226] flex items-center justify-around py-1.5 px-3 focus-within:shadow-lg">
      {/* Left section */}
      <div className="flex items-center space-x-2 w-full max-w-xs">
        {/* solo si tengo acceso al theme muestro esto */}
        {mounted && (
          <>
            {resolvedTheme === "dark" ? (
              <Image src="https://rb.gy/bizvqj" width={45} height={45} alt="dark" />
            ) : (
              <Image src="/images/mini-logo.svg" width={55} height={55} alt="light" />
            )}
          </>
        )}
        <div className="flex items-center space-x-1 dark:md:bg-gray-700 py-2.5 px-4 rounded w-full">
          <SearchRoundedIcon />
          <input type="text" placeholder="Search" className="hidden md:inline-flex bg-transparent text-sm focus:outline-none placeholder-black/70 dark:placeholder:white/75 flex-grow" />
        </div>
      </div>
      {/* Right section */}
      <div className="flex items-center space-x-6 ">
        <HeaderLink Icon={HomeRoundedIcon} text="Home" feed active />
        <HeaderLink Icon={GroupIcon} text="My Network" feed />
        <HeaderLink Icon={BusinessCenterIcon} text="Jobs" feed hidden />
        <HeaderLink Icon={ChatIcon} text="Messaging" feed />
        <HeaderLink Icon={NotificationsIcon} text="Notifications" feed />
        <HeaderLink Icon={Avatar} text="Me" feed avatar hidden />
        <HeaderLink Icon={AppsOutlinedIcon} text="Work" feed hidden />

        {/* dark mode toggle */}
        <div
          className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative ${actualTheme === "dark" ? "justify-end" : "justify-start" }`}
          onClick={() => setTheme(actualTheme === "dark" ? "light" : "dark") } >
          <span className="absolute left-0">🌜</span>

          {/* sintaxis de FramerMotion es simplement motion.<tag> y sus props */}
          <motion.div
            className="w-5 h-5 bg-white rounded-full z-40"
            layout
            transition={spring}
          />
          <span className="absolute right-0.5">🌞</span>
        </div>
      </div>
    </header>
  )
}
export default Header