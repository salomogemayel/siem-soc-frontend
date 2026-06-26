import { useEffect, useState } from "react";
import { Edit, KeyRound } from "lucide-react";

import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

import ProfileCard from "../components/profile/ProfileCard";
import EditProfileForm from "../components/profile/EditProfileForm";
import ChangePasswordForm from "../components/profile/ChangePasswordForm";
import SecuritySettings from "../components/profile/SecuritySettings";
import SessionTable from "../components/profile/SessionTable";

import { getProfile } from "../api/profileApi";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editOpen, setEditOpen] = useState(false);
    const [passwordOpen, setPasswordOpen] = useState(false);

    const fetchProfile = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await getProfile();

            if (response.data.success) {
                setUser(response.data.user);
                localStorage.setItem("auth_user", JSON.stringify(response.data.user));
            }
        } catch (err) {
            setError("Failed to load profile data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (loading) return <LoadingState message="Loading profile..." />;
    if (error) return <ErrorState message={error} />;
    if (!user) return <ErrorState message="Profile data not found" />;

    return (
        <section className="space-y-[18px]">
            <PageHeader title="My Profile" description="" />

            <div className="grid grid-cols-1 gap-[18px] xl:grid-cols-12">
                <div className="xl:col-span-5">
                    <ProfileCard user={user} />
                </div>

                <div className="xl:col-span-7">
                    <div className="h-full rounded-[14px] border border-slate-100 bg-white p-4 shadow-sm">
                        <h2 className="m-0 text-lg font-semibold text-slate-900">
                            Account Actions
                        </h2>

                        <p className="m-0 mt-1 text-sm text-slate-500">
                            Manage your account information and password securely.
                        </p>

                        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <button
                                type="button"
                                onClick={() => setEditOpen(true)}
                                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:bg-slate-50"
                            >
                                <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
                                    <Edit size={20} />
                                </div>

                                <div>
                                    <strong className="block text-sm text-slate-900">
                                        Edit Profile
                                    </strong>
                                    <span className="text-xs text-slate-500">
                                        Update name, email, phone, and department
                                    </span>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setPasswordOpen(true)}
                                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:bg-slate-50"
                            >
                                <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-600">
                                    <KeyRound size={20} />
                                </div>

                                <div>
                                    <strong className="block text-sm text-slate-900">
                                        Change Password
                                    </strong>
                                    <span className="text-xs text-slate-500">
                                        Update your account login password
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-[18px] xl:grid-cols-2">
                <SecuritySettings />
                <SessionTable />
            </div>

            {editOpen && (
                <EditProfileForm
                    user={user}
                    onUpdated={async () => {
                        await fetchProfile();
                        setEditOpen(false);
                    }}
                    onClose={() => setEditOpen(false)}
                />
            )}

            {passwordOpen && (
                <ChangePasswordForm onClose={() => setPasswordOpen(false)} />
            )}
        </section>
    );
}