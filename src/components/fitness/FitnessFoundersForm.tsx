"use client"

import type { FormEvent } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function FitnessFoundersForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [bestTime, setBestTime] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !phone.trim() || !bestTime) return

    const body = encodeURIComponent(
      `Hi Studio E Fitness team,\n\nI'd like to apply for a Founders Club spot.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nBest time to train: ${bestTime}\n`
    )
    const subject = encodeURIComponent("Studio E Fitness – Founders Club Application")
    window.location.href = `mailto:studioelatindance@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="rounded-2xl border border-green-200 bg-green-50 p-4 text-center text-sm text-green-800">
        Your email app should open with your details. If it didn’t, email{" "}
        <a href="mailto:studioelatindance@gmail.com" className="font-semibold underline">
          studioelatindance@gmail.com
        </a>{" "}
        with “Founders Club” in the subject line.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <div className="space-y-2">
        <Label htmlFor="fitness-name">Name</Label>
        <Input
          id="fitness-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
          className="bg-white"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="fitness-email">Email</Label>
        <Input
          id="fitness-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="bg-white"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="fitness-phone">Phone</Label>
        <Input
          id="fitness-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          autoComplete="tel"
          className="bg-white"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="fitness-time">Best time to train?</Label>
        <Select value={bestTime} onValueChange={setBestTime}>
          <SelectTrigger id="fitness-time" className="bg-white">
            <SelectValue placeholder="Select a preference" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="Early morning (before 8am)">Early morning (before 8am)</SelectItem>
            <SelectItem value="Morning (8am–noon)">Morning (8am–noon)</SelectItem>
            <SelectItem value="Afternoon (noon–5pm)">Afternoon (noon–5pm)</SelectItem>
            <SelectItem value="Evening (after 5pm)">Evening (after 5pm)</SelectItem>
            <SelectItem value="Flexible">Flexible</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-[#FF3366] to-[#9933CC] py-6 text-base font-bold text-white hover:opacity-95"
      >
        Submit
      </Button>
    </form>
  )
}
