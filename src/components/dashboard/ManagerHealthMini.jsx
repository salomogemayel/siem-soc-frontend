import { CheckCircle, Info } from "lucide-react";
import Tooltips from "../../components/Tooltip.jsx";

export default function ManagerHealthMini({ manager, onRefresh }) {
    return (
        <div className="flex h-full flex-col gap-3 rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
                <h2 className="m-0 text-lg font-semibold text-slate-900">Wazuh Manager</h2>
                <Tooltips content="Status koneksi dan informasi versi Wazuh Manager" icon={Info}>
                    <Info size={16} className="text-slate-400 cursor-help" />
                </Tooltips>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-3">
                <div className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-[10px] bg-emerald-500 text-white">
                    <CheckCircle size={28} />
                </div>

                <div>
                    <strong className="text-sm text-slate-900">
                        {manager ? "Terhubung" : "Tidak Diketahui"}
                    </strong>
                    <p className="m-0 mt-1 text-sm text-slate-500">
                        Sistem terhubung dengan Wazuh Manager.
                    </p>
                </div>
            </div>

            <div>
                <div className="flex justify-between border-b border-slate-100 py-2 text-sm">
                    <span className="text-slate-500">Versi</span>
                    <strong className="text-slate-900">
                        {manager?.info?.version || "-"}
                    </strong>
                </div>

                <div className="flex justify-between border-b border-slate-100 py-2 text-sm">
                    <span className="text-slate-500">Node</span>
                    <strong className="text-slate-900">
                        {manager?.info?.node_name || manager?.info?.name || "-"}
                    </strong>
                </div>

                <div className="flex justify-between border-b border-slate-100 py-2 text-sm">
                    <span className="text-slate-500">Type</span>
                    <strong className="text-slate-900">
                        {manager?.info?.type || "Manager"}
                    </strong>
                </div>
            </div>

            <button
                type="button"
                onClick={onRefresh}
                className="mt-auto h-[38px] rounded-[10px] bg-blue-600 font-semibold text-white transition hover:bg-blue-700"
            >
                Refresh Dashboard
            </button>
        </div>
    );
}