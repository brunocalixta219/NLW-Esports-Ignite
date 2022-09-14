import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import './styles/main.css'

import logoImage from './assets/logo.svg'
import GameBanner from './components/GameBannes'
import CreateAddBanner from './components/CreateAdBanner'
import { GameController } from 'phosphor-react'
import Input from './components/Form/Input'
import DayButton from './components/Form/DayButton'

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
    fetch('http://localhost:3000/games')
    .then(res => res.json())
    .then(data => setGames(data))
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

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>

          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3x-l font-black">Publique um anúncio</Dialog.Title>
            <form className="mt-8 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">Qual o game?</label>
                <Input id="game" type="text" placeholder='Selecione o game que deseja jogar'
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)?</label>
                <Input id="name" type="text" placeholder='Como você é conhecido dentro do game?'
                  />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input id="yearsPlaying" type="number" placeholder='Tudo bem ser zero'/>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual seu Discord?</label>
                  <Input id="discord" type="text" placeholder='User#0000'/>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                  <div className='grid grid-cols-4 gap-2'>
                    <DayButton title="Domingo">D</DayButton>
                    <DayButton title="Segunda">S</DayButton>
                    <DayButton title="Terça">T</DayButton>
                    <DayButton title="Quarta">Q</DayButton>
                    <DayButton title="Quinta">Q</DayButton>
                    <DayButton title="Sexta">S</DayButton>
                    <DayButton title="Sábado">S</DayButton>
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="discord">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input id="hoursStart" type="time" placeholder='De'/>
                    <Input id="hoursEnd" type="time" placeholder='Até'/>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex gap-2 text-sm">
                <input type="checkbox" />
                Costumo me conectar ao chat de voz
              </div>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close type="button" className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
                <button type="submit" className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3">
                  <GameController size={24}/>
                  Encontrar duo 
                </button>
              </footer>

            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
   )}


export default App
