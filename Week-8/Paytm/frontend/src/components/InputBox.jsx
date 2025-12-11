export function InputBox({ label,placeholder }){
    return <div>
        <div className ="text-sm font-medium text-left py-2">
            {label}
        </div>
        <input type="text" placeholder={placeholder} className="border rounded px-2 py-1 w-full"/>
    </div>
}