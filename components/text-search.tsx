"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Search, Loader2 } from "lucide-react"
import { API_BASE_URL } from "@/lib/config"

export default function TextSearch() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResult, setSearchResult] = useState("")
  const { toast } = useToast()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!query) {
      toast({
        title: "Error",
        description: "Please enter a search query",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    setSearchResult("")

    try {
      const formData = new FormData()
      formData.append("query", query)

      const response = await fetch(`${API_BASE_URL}/search`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to search")
      }

      const data = await response.json()
      setSearchResult(data.result || "No results found")

      toast({
        title: "Search Complete",
        description: "Search results are available",
      })
    } catch (error) {
      console.error("Error searching:", error)
      toast({
        title: "Error",
        description: "Failed to search. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Text Search</CardTitle>
        <CardDescription>Search for information using text queries.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="search-query" className="text-lg font-medium sr-only">
              Search Query
            </label>
            <Input
              id="search-query"
              type="text"
              placeholder="Enter your search query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-12 text-lg"
              aria-label="Search query"
            />
          </div>
          <Button type="submit" className="w-full h-14 text-lg font-semibold" disabled={isSearching}>
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Search
              </>
            )}
          </Button>
        </form>

        {searchResult && (
          <div className="mt-6">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Search Results:</h3>
              <p className="text-lg">{searchResult}</p>
            </div>
          </div>
        )}

        <p className="mt-4 text-sm text-muted-foreground">
          Instructions: Type your question or search term and press the Search button.
        </p>
      </CardContent>
    </Card>
  )
}
