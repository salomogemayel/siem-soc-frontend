import { ShieldCheck } from "lucide-react";

export default function RulesSummary({ total }) {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="flex items-center gap-3.5 rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm">
                <div className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <ShieldCheck size={24} />
                </div>

                <div>
                    <span className="text-sm font-medium text-slate-500">
                        Total Rules
                    </span>
                    <strong className="mt-1 block text-2xl font-bold text-slate-900">
                        {total}
                    </strong>
                </div>
            </div>
        </div>
    );
}