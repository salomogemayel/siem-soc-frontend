export default function PageHeader({ title, description }) {
    return (
        <div>
            <h1 className="m-0 text-2xl font-bold text-slate-900 md:text-[28px]">
                {title}
            </h1>

            {description && (
                <p className="m-0 mt-2 text-sm text-slate-500 md:text-base">
                    {description}
                </p>
            )}
        </div>
    );
}