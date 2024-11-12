'use client'
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { BiMoon, BiSun } from "react-icons/bi";

export const ThemeSwitcher = () =>{
const [mounted, setMounted] = useState(false);
const {theme,setTheme} = useTheme();

useEffect(()=>{
    setMounted(true)
},[]);

if(!mounted){
    return null
}

return (
<>
{
    theme === 'light' ? 
    (
        <BiSun 
        size={25}
        onClick={()=>setTheme('dark')}
        className="cursor-pointer "
        fill="black"
        />
    ) :
    (
        <BiMoon 
        size={25}
        onClick={()=>setTheme('light')}
        className="cursor-pointer"
        fill="white"
        />
    )
}
</>
)

}