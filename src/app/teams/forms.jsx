"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

const TEAM_API_URL = "/api/teams/"

export default function TeamForm({
  className,
  ...props
}) {
  const [message, setMessage] = useState('')
  const[errors, setErrors] = useState({})
  const [error, setError] = useState('')
  async function handleSubmit (event) {
    event.preventDefault()
    setMessage('')
    setErrors({})
    setError('')
    const formData = new FormData(event.target)
        const objectFromForm = Object.fromEntries(formData)
        const jsonData = JSON.stringify(objectFromForm)
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        }
        const response = await fetch(TEAM_API_URL, requestOptions)
        const data = await response.json()
        console.log(data)
        if (response.status === 201 || response.status === 200 ) {
            setMessage("Thank you for submitting your team")
        } else {
          setErrors(data)
          if (!data.name) {
            setError("There was an error with your request")
          }
        }
  }
return (
  <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
    {message && <div className="rounded-md bg-accent p-3 font-semibold text-sm">{message}</div>}
    {error && <div className="rounded-md text-white bg-destructive p-3 font-semibold text-sm">{error}</div>}
  <div className="flex flex-col gap-6">
    <div className="flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold">Welcome back</h1>
      <p className="text-balance text-muted-foreground">
        Enter your Team Name
      </p>
    </div>
    <div className="grid gap-2">
      <Label htmlFor="name">Team name</Label>
      <div className={errors?.name ? "rounded-lg p-3 border border-destructive" : ""}>
        <Input
          id="name"
          type="string"
          name="name"
          placeholder="my team..."
          required
        />
        {errors && errors?.name && errors?.name.length > 0 && <div className="p-1 text-sm bg-destructive text-center text-white">
            {errors?.name.map((err, idx) => {
              return !err.message ? null : <p key={`err-${idx}`}>
                {err.message}
              </p>
            })}
           </div>}
      </div>
    </div>
    <Button type="submit" className="w-full">
      Submit Team
    </Button>
    <div className="grid grid-cols-3 gap-4">
    </div>
    <div className="text-center text-sm">
      Don&apos;t have an account?{" "}
      <a href="#" className="underline underline-offset-4">
        Sign up
      </a>
    </div>
  </div>
</form>
  )
}
