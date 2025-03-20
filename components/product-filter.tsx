"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function ProductFilter() {
  const [priceRange, setPriceRange] = useState([0, 500])
  const categories = ["Hand Tools", "Power Tools", "Fasteners", "Electrical", "Plumbing", "Paint"]

  return (
    <div className="bg-card p-4 rounded-lg shadow">
      <h2 className="font-bold text-lg mb-4">Filters</h2>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Price Range</h3>
        <Slider
          defaultValue={[0, 500]}
          max={500}
          step={10}
          onValueChange={(value) => setPriceRange(value as number[])}
          className="mb-2"
        />
        <div className="flex justify-between text-sm">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <Checkbox id={`category-${category}`} />
              <Label htmlFor={`category-${category}`} className="ml-2">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}

