"use client"

import * as React from 'react'
import { createClient } from '@supabase/supabase-js'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Initialize Supabase client
const supabase = createClient(
  'https://rnlubphxootnmsurnuvr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubHVicGh4b290bm1zdXJudXZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzM3ODY1MiwiZXhwIjoyMDU4OTU0NjUyfQ.yT3RLcPLgJGzdphL85EpTBGsi-Sw668z5i8Df1g2uDo'
)

type Instructor = {
  id: number
  first_name: string
  last_name: string | null
  alias: string | null
  city: string
  state: string | null
  low_rate: number
  high_rate: number
  company: string
  spanish: boolean
}

export default function TestPage() {
  const [instructors, setInstructors] = React.useState<Instructor[]>([])
  const [loading, setLoading] = React.useState(true)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [sortField, setSortField] = React.useState<keyof Instructor>('id')
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc')

  React.useEffect(() => {
    fetchInstructors()
  }, [])

  async function fetchInstructors() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('INSTRUCTOR')
        .select('*')
        .order(sortField, { ascending: sortDirection === 'asc' })

      if (error) throw error

      setInstructors(data)
    } catch (error) {
      console.error('Error fetching instructors:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredInstructors = instructors.filter(instructor => {
    const searchString = searchTerm.toLowerCase()
    return (
      instructor.first_name?.toLowerCase().includes(searchString) ||
      instructor.last_name?.toLowerCase().includes(searchString) ||
      instructor.alias?.toLowerCase().includes(searchString) ||
      instructor.city?.toLowerCase().includes(searchString)
    )
  })

  const handleSort = (field: keyof Instructor) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Instructors Test Table</h1>
      
      <div className="mb-4">
        <Input
          placeholder="Search instructors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort('id')}>ID</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('first_name')}>Name</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('alias')}>Alias</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('city')}>Location</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('low_rate')}>Rate Range</TableHead>
              <TableHead>Instagram</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('spanish')}>Spanish</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInstructors.map((instructor) => (
              <TableRow key={instructor.id}>
                <TableCell>{instructor.id}</TableCell>
                <TableCell>
                  {instructor.first_name} {instructor.last_name}
                </TableCell>
                <TableCell>{instructor.alias || '-'}</TableCell>
                <TableCell>
                  {instructor.city}, {instructor.state}
                </TableCell>
                <TableCell>${instructor.low_rate} - ${instructor.high_rate}</TableCell>
                <TableCell>
                  <a 
                    href={instructor.company} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Profile
                  </a>
                </TableCell>
                <TableCell>
                  {instructor.spanish ? (
                    <Badge className="bg-green-500">Yes</Badge>
                  ) : (
                    <Badge variant="secondary">No</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 