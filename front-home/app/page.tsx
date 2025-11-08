import { Header } from '@/components/home/Header'
import { Calendar } from '@/components/home/Calendar'
import { Progresso } from '@/components/home/Progresso'
import { AtividadeAmigos } from '@/components/home/AtividadeAmigos'
import { SeusLivros } from '@/components/home/SeusLivros'
import { Navigation } from '@/components/home/Navigation'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-24">
      <Header />
      <Calendar />
      <Progresso />
      <AtividadeAmigos />
      <SeusLivros />
      <Navigation />
    </main>
  )
}
