import UserMenu from "./UserMenu";
import NotificationBell from "./notifications/NotificationBell";

export default function Navbar() {
    return (
        <header className="flex min-h-[78px] items-center justify-end border-b border-slate-200 bg-white px-5 md:px-7">
            <div className="flex items-center gap-3">
                <NotificationBell />
                <UserMenu />
            </div>
        </header>
    );
}