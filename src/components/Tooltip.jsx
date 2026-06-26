import { useState } from "react";

export default function Tooltip({ children, content, icon: Icon }) {
    const [show, setShow] = useState(false);

    return (
        <div
            className="relative inline-block w-full"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            {children}
            {show && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 text-xs text-white bg-slate-800 rounded shadow-xl whitespace-nowrap z-[100] flex items-center gap-2 animate-in fade-in zoom-in duration-200">
                    {/* Logika render ikon */}
                    {Icon && <Icon size={14} className="text-blue-300 shrink-0" />}

                    <span>{content}</span>

                    {/* Panah bawah */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-t-[6px] border-t-slate-800 border-x-[6px] border-x-transparent" />
                </div>
            )}
        </div>
    );
}