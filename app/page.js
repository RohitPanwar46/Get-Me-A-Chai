/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center flex-col text-white h-[44vh] gap-4 px-4 md:px-6 lg:px-8">
        <div className="font-bold text-3xl md:text-5xl flex items-center justify-center gap-2 text-center">
          Get Me A Chai
          <span className="pb-3">
            <img width={60} className="" src="/tea.gif" alt="tea" />
          </span>
        </div>
        <p className="text-center text-sm md:text-lg">
          A crowding platform for creators. Get funded by your fans and followers. Start now!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <Link href={"/login"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Start here
            </button>
          </Link>
          <Link href={"/about"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Read more
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="mt-10 mb-24">
        <h2 className="text-white text-xl md:text-2xl font-bold w-auto text-center">
          Your Fans can buy you a Chai
        </h2>
        <div className="flex flex-wrap justify-around items-center my-10 gap-8 md:gap-12 px-4">
          {[
            { img: "/man.gif", title: "Fans want to help", desc: "your fans are available to support you" },
            { img: "/coin.gif", title: "Fans want to contribute", desc: "your fans are willing to contribute financially" },
            { img: "/group.gif", title: "Fans want to collaborate", desc: "your fans are ready to collaborate with you" },
          ].map(({ img, title, desc }, index) => (
            <div key={index} className="flex flex-col items-center justify-center gap-2 text-white text-center">
              <img
                width={60}
                className="bg-gray-500 rounded-full p-1"
                src={img}
                alt={title}
              />
              <div className="font-bold text-md">{title}</div>
              <p className="text-sm md:text-base">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="mt-10 mb-24 flex flex-col items-center justify-center gap-10 px-4 md:px-6">
        <h2 className="text-white text-xl md:text-2xl font-bold w-auto text-center">More about you</h2>
        <h2 className="text-white text-lg md:text-xl font-bold w-auto text-center">I completed this YouTube course</h2>
        <div className="w-full flex justify-center">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/tVzUXW6siu0?si=uSOqYbi-htKT2iOP" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>
    </>
  );
}
