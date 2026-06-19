export default function AlertExpandedRow({ alert }) {
    return (
        <tr className="bg-slate-50">
            <td></td>

            <td colSpan="8" className="p-3.5">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="m-0 mb-2 text-sm text-slate-700">
                        <strong>Groups:</strong>{" "}
                        {alert.groups?.length ? alert.groups.join(", ") : "-"}
                    </p>

                    <p className="m-0 mb-2 text-sm text-slate-700">
                        <strong>MITRE ID:</strong>{" "}
                        {alert.mitre_id?.length ? alert.mitre_id.join(", ") : "-"}
                    </p>

                    <p className="m-0 mb-2 text-sm text-slate-700">
                        <strong>Timestamp:</strong> {alert.timestamp}
                    </p>

                    <pre className="mt-3 overflow-x-auto rounded-[10px] bg-slate-900 p-3 text-xs text-slate-200">
                        {JSON.stringify(alert, null, 2)}
                    </pre>
                </div>
            </td>
        </tr>
    );
}