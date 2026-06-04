import { useEffect, useState } from "react";

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
        <>
            <PageHeader
                title="My Profile"
                description=""
            />

            <div className="profile-top-grid">
                <ProfileCard user={user} />
                <ChangePasswordForm />
            </div>

            <EditProfileForm user={user} onUpdated={fetchProfile} />

            <div className="profile-bottom-grid">
                <SecuritySettings />
                <SessionTable />
            </div>
        </>
    );
}