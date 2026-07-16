import { useEffect, useMemo, useRef, useState } from "react";
import { Inbox, SearchX } from "lucide-react";
import gsap from "gsap";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import StatsCard from "../components/StatsCard";
import UserCard from "../components/UserCard";
import AddRegistrationModal from "../components/AddRegistrationModal";
import AttendanceDrawer from "../components/AttendanceDrawer";
import StarField from "../components/StarField";
import GridBackground from "../components/GridBackground";

import seedUsers from "../data/users";

function UserCardSkeleton() {
    return (
        <div className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.03] light:border-neutral-200 light:bg-neutral-50 backdrop-blur-md px-4.5 py-3.5 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-neutral-800 light:bg-neutral-200 shrink-0" />
            <div className="flex-1 space-y-2">
                <div className="h-3.5 w-32 rounded bg-neutral-800 light:bg-neutral-200" />
                <div className="h-3 w-24 rounded bg-neutral-800 light:bg-neutral-200" />
            </div>
            <div className="h-6 w-16 rounded-full bg-neutral-800 light:bg-neutral-200 shrink-0" />
        </div>
    );
}

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const headerRef = useRef(null);
    const actionRef = useRef(null);
    const listRef = useRef(null);
    const statsRef = useRef(null);

    // Simulate an initial data fetch
    useEffect(() => {
        const timer = setTimeout(() => {
            setUsers(seedUsers);
            setIsLoading(false);
        }, 700);
        return () => clearTimeout(timer);
    }, []);

    // Page entrance animation
    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(headerRef.current, { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
            .fromTo(actionRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, "-=0.25")
            .fromTo(
                statsRef.current?.children ?? [],
                { y: 14, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.06 },
                "-=0.2"
            );
    }, []);

    // Stagger the user cards in whenever the visible list changes
    useEffect(() => {
        if (isLoading || !listRef.current) return;
        const cards = listRef.current.querySelectorAll("[data-usercard]");
        gsap.fromTo(
            cards,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.35, stagger: 0.04, ease: "power2.out" }
        );
    }, [isLoading, searchQuery, users]);

    const filteredUsers = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return users;
        return users.filter(
            (u) =>
                u.name.toLowerCase().includes(query) ||
                u.employeeId.toLowerCase().includes(query) ||
                u.department.toLowerCase().includes(query)
        );
    }, [users, searchQuery]);

    const stats = useMemo(
        () => ({
            registered: users.length,
            present: users.filter((u) => u.status === "Present").length,
            absent: users.filter((u) => u.status === "Absent").length,
            newToday: users.filter((u) => u.isNewToday).length,
        }),
        [users]
    );

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setTimeout(() => setSelectedUser(null), 300);
    };

    const handleSaveAttendance = (employeeId, status) => {
        setUsers((prev) =>
            prev.map((u) => (u.employeeId === employeeId ? { ...u, status } : u))
        );
        handleCloseDrawer();
    };

    const handleAddRegistration = (form) => {
        const newUser = {
            employeeId: form.employeeId,
            name: form.name,
            department: form.department,
            email: form.email,
            phone: form.phone,
            status: "Absent",
            isNewToday: true,
        };
        setUsers((prev) => [newUser, ...prev]);
        setIsAddModalOpen(false);
    };

    return (
        <div className="relative min-h-screen bg-[#080808] light:bg-white px-6 md:px-10 py-10 overflow-hidden transition-colors duration-300">
            <StarField />
            <GridBackground />

            <div className="relative z-10 max-w-4xl mx-auto">
                <div ref={headerRef}>
                    <Header />
                </div>

                <div ref={actionRef} className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="sm:w-[70%]">
                        <SearchBar value={searchQuery} onChange={setSearchQuery} />
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsAddModalOpen(true)}
                        className="
                            flex-1 h-11 rounded-full text-sm font-medium
                            bg-neutral-100 text-neutral-900
                            light:bg-neutral-900 light:text-white
                            transition-all duration-200 hover:bg-white light:hover:bg-neutral-800 hover:scale-[1.02]
                            active:scale-[0.98]
                        "
                    >
                        Add registration
                    </button>
                </div>

                {/* User list */}
                <div
                    ref={listRef}
                    className="flex flex-col gap-2 h-[300px] overflow-y-auto pr-2 rounded-2xl"
                >
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, i) => <UserCardSkeleton key={i} />)
                    ) : users.length === 0 ? (
                        <EmptyState
                            icon={<Inbox size={22} strokeWidth={1.5} />}
                            title="No registrations yet"
                            body="Add your first registration to start tracking attendance."
                        />
                    ) : filteredUsers.length === 0 ? (
                        <EmptyState
                            icon={<SearchX size={22} strokeWidth={1.5} />}
                            title="No matches found"
                            body={`Nothing matches "${searchQuery}". Try a different name, ID, or department.`}
                        />
                    ) : (
                        filteredUsers.map((user) => (
                            <div key={user.employeeId} data-usercard>
                                <UserCard user={user} onClick={handleSelectUser} />
                            </div>
                        ))
                    )}
                </div>

                {/* Stats */}
                <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                    <StatsCard label="Registered" value={stats.registered} />
                    <StatsCard label="Present" value={stats.present} />
                    <StatsCard label="Absent" value={stats.absent} />
                    <StatsCard label="New today" value={stats.newToday} />
                </div>
            </div>

            <AddRegistrationModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleAddRegistration}
            />

            <AttendanceDrawer
                user={selectedUser}
                isOpen={isDrawerOpen}
                onClose={handleCloseDrawer}
                onSave={handleSaveAttendance}
            />
        </div>
    );
}

function EmptyState({ icon, title, body }) {
    return (
        <div className="flex flex-col items-center text-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] light:border-neutral-200 light:bg-white backdrop-blur-md py-16 px-6">
            <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 light:bg-neutral-100 light:border-neutral-200 flex items-center justify-center text-neutral-500 light:text-neutral-400">
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-neutral-200 light:text-neutral-900">{title}</p>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs">{body}</p>
            </div>
        </div>
    );
}