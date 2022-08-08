import Feed from "#/Feed";
import Header from "#/Header";
import Modal from "#/Modal";
import Sidebar from "#/Sidebar";
import { modalState, modalTypeState } from "atoms/modalAtom";
import { AnimatePresence } from "framer-motion";
import { PostResponse } from "../interfaces/post.interface";
import { GetServerSideProps } from 'next';
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { connectToDatabase } from "../utils/mongodb";
import Widgets from "#/Widgets";
import { IArticle } from "../interfaces/article.interface";



interface HomeProps {
  posts: PostResponse[];
  articles: IArticle[]
}
const Home = ({ posts, articles }: HomeProps) => {
  // console.log({articles})
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // Si no está autenticado, redirigir a /home
      router.push("/home");
    },
  });

  return (
    <div className="bg-[#f3f2ef] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Feed | LinkedIn </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">

          <Sidebar />
          <Feed posts={posts} />
        </div>
        <Widgets articles={articles} />
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          ) as any}
        </AnimatePresence>

      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // checking if the user is authenticated(this is processed in the server)
  const session = await getSession(ctx);
  /* si no la hubiera redireccionamos al login.Permanent a true usará codigo 308 que cachea la ruta forever,pudiendo volver a ella.A false usa statusCode 307 que es temporal y no cachea la ruta.Es lo que quiero,no poder volver hacia atras.Las redirecciones son lo primero en ejecutarse,asi que ni siquiera tengo acceso a /public por ejemplo, mientras ocurren */
  if (!session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      }
    }
  }
  //  Get posts on SSR
  const { db } = await connectToDatabase();
  const posts = await db.collection('posts').find().sort({ _id: -1 }).toArray();
  //  Get Google News API
  const results = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWSAPI_API_KEY}`).then(data => data.json())

  return {
    props: {
      session,
      articles: results.articles,
      posts: posts.map(post => ({
        ...post,
        _id: post._id.toString(),
      }))
    }
  }
}