import Feed from "@components/Feed";

export default function Home() {
  return (
    <section className="w-full flex flex-center flex-col container mx-auto">
      <h1 className="font-extrabold text-center">Discover & Share</h1>
      <br className="md:hidden" />
      <h1 className="orange_gradient text-center font-extrabold">AI-Powered Prompts</h1>
      <p className="mt-5 max-w-[45ch] text-center">Promptopia is an open source AI prompting tool for modern word to discover, create and share creative prompts</p>
      <Feed/>
    </section>
  )
}
