"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you soon.",
    })

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })

    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <p className="mb-6">
            Have questions about our products or services? Need expert advice for your project? We're here to help! Fill
            out the form and our team will get back to you as soon as possible.
          </p>

          <div className="grid gap-6">
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <MapPin className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-bold">Our Location</h3>
                  <p className="text-muted-foreground">123 Hardware Street, Tool City, TC 12345</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <Phone className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-bold">Phone</h3>
                  <p className="text-muted-foreground">(123) 456-7890</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <Mail className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p className="text-muted-foreground">info@hardwaremart.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <Clock className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-bold">Business Hours</h3>
                  <p className="text-muted-foreground">Monday-Friday: 8am-6pm</p>
                  <p className="text-muted-foreground">Saturday: 9am-5pm</p>
                  <p className="text-muted-foreground">Sunday: Closed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Find Us</h2>
        <div className="h-[400px] bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Map would be embedded here</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              question: "Do you offer delivery services?",
              answer:
                "Yes, we offer delivery services for orders over $50 within a 20-mile radius of our store. For larger items or distances, additional fees may apply.",
            },
            {
              question: "What is your return policy?",
              answer:
                "We accept returns within 30 days of purchase with a valid receipt. Items must be in their original condition and packaging.",
            },
            {
              question: "Do you offer installation services?",
              answer:
                "Yes, we partner with licensed contractors who can provide installation services for many of our products. Please inquire in-store for details.",
            },
            {
              question: "Can I place a special order for items not in stock?",
              answer:
                "We can place special orders for most items not currently in our inventory. Please contact our customer service team for assistance.",
            },
          ].map((faq, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

