export default function RulesTable({ rules }) {
    return (
        <div className="table-wrapper">
            <table className="data-table rules-table">
                <thead>
                <tr>
                    <th>Rule ID</th>
                    <th>Level</th>
                    <th>Description</th>
                    <th>Groups</th>
                    <th>PCI DSS</th>
                    <th>MITRE</th>
                </tr>
                </thead>

                <tbody>
                {rules.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="empty-table">
                            No rules found.
                        </td>
                    </tr>
                ) : (
                    rules.map((rule) => (
                        <tr key={rule.id}>
                            <td>
                                <span className="rule-link">#{rule.id}</span>
                            </td>

                            <td>
                  <span className={`level-badge level-${rule.level}`}>
                    {rule.level ?? 0}
                  </span>
                            </td>

                            <td>{rule.description ?? "No description"}</td>

                            <td>
                                {rule.groups?.length
                                    ? rule.groups.slice(0, 4).map((item) => (
                                        <span className="badge" key={item}>
                          {item}
                        </span>
                                    ))
                                    : "-"}
                            </td>

                            <td>{rule.pci_dss?.length ? rule.pci_dss.join(", ") : "-"}</td>

                            <td>{rule.mitre?.id?.length ? rule.mitre.id.join(", ") : "-"}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}