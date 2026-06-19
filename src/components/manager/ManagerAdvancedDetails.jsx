import { useState } from "react";

export default function ManagerAdvancedDetails({ status, info }) {
    const [open, setOpen] = useState(false);

    const formatValue = (value) => {
        if (value === null || value === undefined) return "-";
        if (typeof value === "object") return JSON.stringify(value);
        return String(value);
    };

    return (
        <div className="rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="m-0 text-lg font-semibold text-slate-900">
                        Advanced Manager Details
                    </h2>
                    <p className="m-0 mt-1 text-sm text-slate-500">
                        Raw Wazuh manager status and information.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="h-10 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    {open ? "Hide Details" : "Show Details"}
                </button>
            </div>

            {open && (
                <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                        <h3 className="m-0 mb-3 text-base font-semibold text-slate-900">
                            Manager Status
                        </h3>

                        <div className="space-y-2">
                            {Object.entries(status).map(([key, value]) => (
                                <div
                                    key={key}
                                    className="flex justify-between gap-3 rounded-lg border border-slate-100 bg-white p-3 text-sm"
                                >
                                    <span className="text-slate-500">{key}</span>
                                    <strong className="break-all text-right text-slate-900">
                                        {formatValue(value)}
                                    </strong>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                        <h3 className="m-0 mb-3 text-base font-semibold text-slate-900">
                            Manager Information
                        </h3>

                        <div className="space-y-2">
                            {Object.entries(info).map(([key, value]) => (
                                <div
                                    key={key}
                                    className="flex justify-between gap-3 rounded-lg border border-slate-100 bg-white p-3 text-sm"
                                >
                                    <span className="text-slate-500">{key}</span>
                                    <strong className="break-all text-right text-slate-900">
                                        {formatValue(value)}
                                    </strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}