import {ButtonHTMLAttributes} from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

interface DayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    selected: boolean;
}

const DayButton = (props: DayButtonProps) => {

    return <ToggleGroup.Item 
                {...props}
                type="button"
                className={`py-[7px] px-3 rounded ${props.selected ? 'bg-violet-500' : 'bg-zinc-900'}`}
                value={props.value}
                >{props.children}
            </ToggleGroup.Item>
}

export default DayButton;