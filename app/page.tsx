import Image from "next/image";
import image from '@/public/images/pic2.jpg'
import ScoreBoard from "./component/scoreboard";
export default function Home() {
  return (
    <div className="bg-image">
      <Image src={image} alt="bg-image" className="h-full w-full fixed top-0 left-0 object-cover"/>
      <div className="inset-0 fixed h-full w-full bg-[#1e1d1d8f] flex justify-center items-center">
        <div className="h-[95%] md:w-[85%] w-[95%] bg-[#333333b6] backdrop-blur-md rounded-[30px] drop-shadow-2xl border border-[#ccc]/20 overflow-y-auto overflow-x-hidden scrollbar">
        <ScoreBoard />
        </div>
      </div>
    </div>
  )
}