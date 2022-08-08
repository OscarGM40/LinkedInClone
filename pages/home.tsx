import HeaderLink from "#/HeaderLink";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ExploreIcon from "@mui/icons-material/Explore";
import GroupIcon from "@mui/icons-material/Group";
import OndemandVideoSharpIcon from "@mui/icons-material/OndemandVideoSharp";
import type { NextPageContext } from "next";
import Head from "next/head";
import Image from "next/image";
import { ClientSafeProvider, getProviders, getSession, signIn } from "next-auth/react";

interface Props {
  //@ts-ignore
  providers: Record<LiteralUnion<typeof BuiltInProviderType, string>, ClientSafeProvider> | null
}
const Home = ({ providers }: Props) => {

  return (
    <div className="space-y-10 relative">
      <Head>
        <title>LinkedIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-around items-center py-4  max-w-screen-2xl mx-auto">
        {/* Logo */}
        <div className="relative w-36 h-10">
          <Image
            src="/images/li-logo.svg"
            layout="fill"
            objectFit="contain"
            alt="linkedin-logo"
          />
        </div>
        {/* icons */}
        <div className="flex items-center sm:divide-x divide-gray-300">
          {/* cada unidad de un p o un m son 4px luego pr-4 es pr16px */}
          <div className="hidden sm:flex space-x-8 pr-4">
            <HeaderLink Icon={ExploreIcon} text="Discover" />
            <HeaderLink Icon={GroupIcon} text="People" />
            <HeaderLink Icon={OndemandVideoSharpIcon} text="Learning" />
            <HeaderLink Icon={BusinessCenterIcon} text="Jobs" />
          </div>
          <div className="pl-4">
            {/*Sign In Button  */}
            {Object.values(providers!).map((provider) =>
              <button key={provider.name} className="text-blue-700 font-semibold rounded-full border border-blue-700 px-5 py-1.5 transition-all hover:bg-blue-700 hover:text-blue-100"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Sign in with {provider.name}
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="flex flex-col xl:flex-row items-center max-w-screen-lg mx-auto ">
        <div className="space-y-6 xl:space-y-10 ">
          <h1 className="text-3xl md:text-5xl text-amber-800/80 max-w-xl !leading-snug pl-4 xl:pl-0 ">Welcome to your professsional community</h1>
          <div className="space-y-4">
            <div className="intent">
              <h2 className="text-xl">Search for a job</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Find a person you know</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Learn a new skill</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
          </div>
        </div>
        <div className="relative xl:absolute w-80 h-80 xl:w-[650px] xl:h-[650px] top-14 right-5">
          <Image src="/images/li-logo2.svg" layout="fill" priority alt="linkedin-logo2" />
        </div>
      </main>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: NextPageContext) {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}