import { User } from "lucide-react";

export default function ProfileCard({ user }) {
    const items = [
        ["Full Name", user?.name || "-"],
        ["Email", user?.email || "-"],
        ["Role", user?.role || "SOC Analyst"],
        ["Last Login", user?.last_login_at || "-"],
    ];

    return (
        <div className="h-full rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm">
            <h2 className="m-0 text-lg font-semibold text-slate-900">
                Account Information
            </h2>

            <div className="mt-4 flex flex-col gap-4">
                <div className="grid h-20 w-20 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                    <User size={44} />
                </div>

                <div className="space-y-2.5">
                    {items.map(([label, value]) => (
                        <div
                            key={label}
                            className="flex justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm"
                        >
                            <span className="text-slate-500">{label}</span>
                            <strong className="break-all text-right text-slate-900">
                                {value}
                            </strong>
                        </div>
                    ))}

                    <div className="flex justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm">
                        <span className="text-slate-500">Status</span>
                        <strong className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                            {user?.status || "active"}
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    );
}