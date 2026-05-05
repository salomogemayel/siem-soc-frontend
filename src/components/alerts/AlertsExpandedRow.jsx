export default function AlertExpandedRow({ alert }) {
    return (
        <tr className="expanded-row">
            <td></td>

            <td colSpan="8">
                <div className="alert-details">
                    <p>
                        <strong>Groups:</strong>{" "}
                        {alert.groups?.length ? alert.groups.join(", ") : "-"}
                    </p>

                    <p>
                        <strong>MITRE ID:</strong>{" "}
                        {alert.mitre_id?.length ? alert.mitre_id.join(", ") : "-"}
                    </p>

                    <p>
                        <strong>Timestamp:</strong> {alert.timestamp}
                    </p>

                    <pre>{JSON.stringify(alert, null, 2)}</pre>
                </div>
            </td>
        </tr>
    );
}