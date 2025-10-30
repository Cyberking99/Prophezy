"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

const categories = ["Crypto", "Finance", "Politics", "Sports", "Tech", "Entertainment", "Science", "Other"]

export function CreateMarketForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    question: "",
    resolutionSource: "",
    endDate: "",
    initialLiquidity: "",
  })

  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.title.trim()) newErrors.title = "Title is required"
      if (!formData.description.trim()) newErrors.description = "Description is required"
      if (!formData.category) newErrors.category = "Category is required"
    } else if (currentStep === 2) {
      if (!formData.question.trim()) newErrors.question = "Question is required"
      if (!formData.resolutionSource.trim()) newErrors.resolutionSource = "Resolution source is required"
      if (!formData.endDate) newErrors.endDate = "End date is required"
    } else if (currentStep === 3) {
      if (!formData.initialLiquidity) newErrors.initialLiquidity = "Initial liquidity is required"
      if (Number.parseFloat(formData.initialLiquidity) <= 0)
        newErrors.initialLiquidity = "Liquidity must be greater than 0"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    setStep(step - 1)
  }

  const handleSubmit = () => {
    if (validateStep(step)) {
      console.log("Market created:", formData)
      // TODO: Submit to backend
    }
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Create a Market</h1>
          <p className="text-muted-foreground">Step {step} of 3</p>
        </div>

        {/* Progress indicator */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>

        <Card className="p-8">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-foreground font-semibold mb-2 block">
                  Market Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Will Bitcoin reach $100k by end of 2025?"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`bg-card border-border ${errors.title ? "border-destructive" : ""}`}
                />
                {errors.title && <p className="text-destructive text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <Label htmlFor="description" className="text-foreground font-semibold mb-2 block">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Provide more context about this market..."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className={`bg-card border-border ${errors.description ? "border-destructive" : ""}`}
                />
                {errors.description && <p className="text-destructive text-sm mt-1">{errors.description}</p>}
              </div>

              <div>
                <Label htmlFor="category" className="text-foreground font-semibold mb-2 block">
                  Category
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger className={`bg-card border-border ${errors.category ? "border-destructive" : ""}`}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-destructive text-sm mt-1">{errors.category}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Market Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="question" className="text-foreground font-semibold mb-2 block">
                  Resolution Question
                </Label>
                <Input
                  id="question"
                  name="question"
                  placeholder="The exact question that will be resolved (Yes/No)"
                  value={formData.question}
                  onChange={handleInputChange}
                  className={`bg-card border-border ${errors.question ? "border-destructive" : ""}`}
                />
                {errors.question && <p className="text-destructive text-sm mt-1">{errors.question}</p>}
              </div>

              <div>
                <Label htmlFor="resolutionSource" className="text-foreground font-semibold mb-2 block">
                  Resolution Source
                </Label>
                <Input
                  id="resolutionSource"
                  name="resolutionSource"
                  placeholder="e.g., CoinMarketCap, Reuters, Official Website"
                  value={formData.resolutionSource}
                  onChange={handleInputChange}
                  className={`bg-card border-border ${errors.resolutionSource ? "border-destructive" : ""}`}
                />
                {errors.resolutionSource && <p className="text-destructive text-sm mt-1">{errors.resolutionSource}</p>}
              </div>

              <div>
                <Label htmlFor="endDate" className="text-foreground font-semibold mb-2 block">
                  Market End Date
                </Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className={`bg-card border-border ${errors.endDate ? "border-destructive" : ""}`}
                />
                {errors.endDate && <p className="text-destructive text-sm mt-1">{errors.endDate}</p>}
              </div>
            </div>
          )}

          {/* Step 3: Liquidity & Review */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="initialLiquidity" className="text-foreground font-semibold mb-2 block">
                  Initial Liquidity (BUSD)
                </Label>
                <Input
                  id="initialLiquidity"
                  name="initialLiquidity"
                  type="number"
                  placeholder="e.g., 1000"
                  value={formData.initialLiquidity}
                  onChange={handleInputChange}
                  className={`bg-card border-border ${errors.initialLiquidity ? "border-destructive" : ""}`}
                />
                {errors.initialLiquidity && <p className="text-destructive text-sm mt-1">{errors.initialLiquidity}</p>}
                <p className="text-sm text-muted-foreground mt-2">
                  This will be used to bootstrap the market and earn fees
                </p>
              </div>

              <Card className="bg-accent/5 border-accent/20 p-4">
                <h3 className="font-semibold text-foreground mb-4">Review Your Market</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Title:</span>
                    <span className="text-foreground font-medium">{formData.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="text-foreground font-medium">{formData.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">End Date:</span>
                    <span className="text-foreground font-medium">
                      {formData.endDate ? new Date(formData.endDate).toLocaleDateString() : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Initial Liquidity:</span>
                    <span className="text-foreground font-medium">{formData.initialLiquidity} BUSD</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-border">
            {step > 1 && (
              <Button variant="outline" onClick={handlePrevious} className="flex-1 bg-transparent">
                Previous
              </Button>
            )}
            {step < 3 ? (
              <Button onClick={handleNext} className="flex-1 bg-primary hover:bg-primary/90">
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="flex-1 bg-primary hover:bg-primary/90">
                Create Market
              </Button>
            )}
          </div>
        </Card>
      </div>
    </section>
  )
}
