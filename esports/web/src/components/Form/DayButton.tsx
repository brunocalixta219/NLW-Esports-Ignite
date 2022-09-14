import {ButtonHTMLAttributes} from 'react'

interface DayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{}

const DayButton = (props: DayButtonProps) => {
    return <button 
                {...props}
                type="button"
                className="py-[7px] px-3 bg-zinc-900 active:violet/500 rounded"
            >{props.children}</button>
}

export default DayButton;