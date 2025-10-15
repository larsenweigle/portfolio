import { Background } from "@/components/background"
import { Footer } from "@/components/footer"
import { Portfolio } from "@/components/portfolio"

export default function Home() {
  return (
    <main className="p-inset h-[100dvh] w-full">
      <div className="relative h-full w-full">
        <Background />
        <Portfolio />
        <Footer />
      </div>
    </main>
  )
}
