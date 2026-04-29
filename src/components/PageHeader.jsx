export default function PageHeader({ title, description }) {
    return (
        <div className="page-header">
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
}