import { ShieldCheck, Layers, ListChecks } from "lucide-react";

export default function RulesSummary({ total, displayed, page }) {
    return (
        <div className="rules-summary-grid">
            <div className="rules-summary-card">
                <ShieldCheck size={24} />
                <div>
                    <span>Total Rules</span>
                    <strong>{total}</strong>
                </div>
            </div>

            {/*<div className="rules-summary-card">*/}
            {/*    <Layers size={24} />*/}
            {/*    <div>*/}
            {/*        <span>Displayed</span>*/}
            {/*        <strong>{displayed}</strong>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div className="rules-summary-card">*/}
            {/*    <ListChecks size={24} />*/}
            {/*    <div>*/}
            {/*        <span>Current Page</span>*/}
            {/*        <strong>{page}</strong>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}