import { MessageSquareWarningIcon } from "lucide-react";

const RateLimitUI = () => {

    return (
        <div className='bg-white/10 border border-white/20 rounded-xl p-2 flex gap-2'>
            <div className="border bg-primary/10 border-white/20 rounded-lg flex items-center justify-center px-2 grow max-w-14 aspect-square">
                <MessageSquareWarningIcon className="text-primary" />
            </div>
            <div>
                <h4 className="text-xl font-bold text-white">429 Too Many Reuests</h4>
                <p className="text-white/80 text-sm mt-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat ea quos maxime, quas quo maiores natus nam impedit quidem adipisci.</p>
            </div>
        </div>
    )
}

export default RateLimitUI;