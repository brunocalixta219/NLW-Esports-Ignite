import { useState, useEffect } from 'react'

import axios from 'axios'

import * as Dialog from '@radix-ui/react-dialog'

import './styles/main.css'
import logoImage from './assets/logo.svg'

import GameBanner from './components/GameBannes'
import CreateAddBanner from './components/CreateAdBanner'
import { CreateAddModal } from './components/CreateAdModal'


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

const App = () => {
  const [games, setGames] = useState<Game[]>([])

  const getGames = () => {
    axios('http://localhost:3000/games')
    .then(res => setGames(res.data))
}

  useEffect(() => getGames(), [])
  
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center py-20">
      <img src={logoImage} alt="Logo" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.</h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} />)}
      </div>
      
      <Dialog.Root>
        <CreateAddBanner />
        <CreateAddModal />
      </Dialog.Root>
    </div>
   )}


export default App
