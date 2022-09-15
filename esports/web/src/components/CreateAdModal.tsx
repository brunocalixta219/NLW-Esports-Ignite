import {useState, useEffect, FormEvent} from 'react'

import axios from 'axios';

import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { GameController, Check } from 'phosphor-react'

import DayButton from './Form/DayButton'
import Input from './Form/Input'

interface Game {
    id: string;
    title: string;
  }

export function CreateAddModal() {
    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>(['1'])
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)

    const getGames = () => {
        axios('http://localhost:3000/games')
        .then(res => setGames(res.data))
    }

    const handleCreateAd = async (event: FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement)
        
        const data = Object.fromEntries(formData)

        if (data.name){
            return
        }

        try {
            axios.post(`http://localhost:3000/games/${data.game}/ads`, 
                {
                    name: data.name,
                    yearsPlaying: Number(data.yearsPlayind),
                    discord: data.discord,
                    weekDays: weekDays.map(Number),
                    hourStart: data.hourStart,
                    hourEnd: data.hourEnd,
                    useVoiceChannel: useVoiceChannel
                })

            alert('Anúncio criado com sucesso!')
        } catch(err) {
            console.log('handleCreateAdd Error: ',err)
        }
        
    }

    useEffect(() => getGames(), [])

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>

            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3x-l font-black">Publique um anúncio</Dialog.Title>
            <form className="mt-8 flex flex-col gap-3" onSubmit={handleCreateAd}>
                <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">Qual o game?</label>
                <select 
                    id="game" 
                    name="game"
                    className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                    defaultValue=""
                >
                    <option disabled value="">Selecione o game que deseja jogar</option>
                    {games.map(game => <option key={game.id} value={game.id}>{game.title}</option>)}

                </select>
                </div>

                <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)?</label>
                <Input id="name" name="game" type="text" placeholder='Como você é conhecido dentro do game?'
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                    <Input id="yearsPlaying" name="yearsPlaying" type="number" placeholder='Tudo bem ser zero'/>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="discord">Qual seu Discord?</label>
                    <Input id="discord" name="discord" type="text" placeholder='User#0000'/>
                </div>
                </div>

                <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                    <ToggleGroup.Root 
                        value={weekDays}
                        onValueChange={setWeekDays}
                        className='grid grid-cols-4 gap-2' 
                        type="multiple"
                        >
                        <DayButton title="Domingo" value="1" selected={weekDays.includes("1")}>D</DayButton>
                        <DayButton title="Segunda" value="2" selected={weekDays.includes("2")}>S</DayButton>
                        <DayButton title="Terça" value="3" selected={weekDays.includes("3")}>T</DayButton>
                        <DayButton title="Quarta" value="4" selected={weekDays.includes("4")}>Q</DayButton>
                        <DayButton title="Quinta" value="5" selected={weekDays.includes("5")}>Q</DayButton>
                        <DayButton title="Sexta" value="6" selected={weekDays.includes("6")}>S</DayButton>
                        <DayButton title="Sábado" value="7" selected={weekDays.includes("7")}>S</DayButton>
                    </ToggleGroup.Root>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="discord">Qual horário do dia?</label>
                    <div className="grid grid-cols-2 gap-2">
                        <Input id="hoursStart" name="hoursStart" type="time" placeholder='De'/>
                        <Input id="hoursEnd" name="hoursEnd" type="time" placeholder='Até'/>
                    </div>
                </div>
                </div>

                <label className="mt-2 flex gap-2 text-sm items-center">

                    <Checkbox.Root className="w-6 h-6 rounded bg-zinc-900 p-1"
                        checked={useVoiceChannel}
                        onCheckedChange={(checked) => {
                            if (checked === true) {
                                setUseVoiceChannel(true)
                            } else {
                                setUseVoiceChannel(false)
                            }
                        }}
                    >
                        <Checkbox.Indicator >
                            <Check className="w-4 h-4 text-emerald-400"/>
                        </Checkbox.Indicator>
                    </Checkbox.Root>

                Costumo me conectar ao chat de voz
                </label>

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
  )
}