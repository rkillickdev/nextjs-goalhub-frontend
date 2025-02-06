"use client"

import { useAuth } from "@/components/authProvider";
import { useEffect } from "react";
import useSWR from "swr";

const fetcher = async url => {
  const res = await fetch(url)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

const TEAM_API_URL = "/api/teams/"

export default function Page() {
  // GET REQUESTS
  const {data, error, isLoading} = useSWR(TEAM_API_URL, fetcher)
  console.log(error?.status)
  const auth = useAuth()
  useEffect(() => {
    if (error?.status ===401){
      //
      auth.loginRequiredRedirect()
    }
  }, [auth, error])
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          {JSON.stringify(data)}
        </div>
      </main>
    </div>
  );
}
