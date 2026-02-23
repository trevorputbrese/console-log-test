"use client";

import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const res = await fetch(`/api/search/${encodeURIComponent(query)}`);
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-8 py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          User Search
        </h1>

        <form onSubmit={handleSearch} className="flex w-full max-w-md gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, or role..."
            className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />
          <button
            type="submit"
            className="rounded-lg bg-black px-5 py-2 text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Search
          </button>
        </form>

        {loading && <p className="text-zinc-500">Loading...</p>}

        {users.length > 0 && (
          <ul className="w-full max-w-md divide-y divide-zinc-200 dark:divide-zinc-800">
            {users.map((user) => (
              <li key={user.id} className="flex flex-col gap-1 py-4">
                <span className="font-medium text-black dark:text-zinc-50">
                  {user.name}
                </span>
                <span className="text-sm text-zinc-500">{user.email}</span>
                <span className="text-xs text-zinc-400">{user.role}</span>
              </li>
            ))}
          </ul>
        )}

        {!loading && users.length === 0 && query && (
          <p className="text-zinc-500">No users found.</p>
        )}
      </main>
    </div>
  );
}
