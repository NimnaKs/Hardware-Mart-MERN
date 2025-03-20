import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">About Hardware Mart</h1>

      <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="mb-4">
            Founded in 2010, Hardware Mart began as a small family-owned store with a simple mission: to provide
            high-quality tools and hardware supplies at affordable prices. What started as a modest shop has grown into
            a trusted name in the industry, serving both professional contractors and DIY enthusiasts alike.
          </p>
          <p>
            Our journey has been defined by our commitment to quality, expertise, and customer satisfaction. We believe
            that the right tools make all the difference, whether you're a seasoned professional or just starting your
            first home improvement project.
          </p>
        </div>
        <div className="relative h-[300px] rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=300&width=500" alt="Hardware Mart Store" fill className="object-cover" />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p>
                We carefully select every product in our inventory to ensure it meets our high standards for durability
                and performance.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2">Expertise</h3>
              <p>
                Our team consists of industry experts who can provide knowledgeable advice and solutions for any
                project.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2">Customer Service</h3>
              <p>
                We believe in building lasting relationships with our customers through exceptional service and support.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: "John Smith", position: "Founder & CEO", image: "/placeholder.svg?height=200&width=200" },
            { name: "Sarah Johnson", position: "Operations Manager", image: "/placeholder.svg?height=200&width=200" },
            { name: "Michael Brown", position: "Product Specialist", image: "/placeholder.svg?height=200&width=200" },
            { name: "Emily Davis", position: "Customer Service Lead", image: "/placeholder.svg?height=200&width=200" },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative h-[200px] w-[200px] mx-auto rounded-full overflow-hidden mb-4">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-muted-foreground">{member.position}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Our Commitment</h2>
        <p className="max-w-3xl mx-auto text-center">
          At Hardware Mart, we're committed to supporting our community and the environment. We partner with local
          organizations to promote sustainable building practices and regularly participate in community improvement
          projects. We also strive to reduce our environmental footprint by offering eco-friendly products and
          implementing sustainable business practices.
        </p>
      </div>
    </div>
  )
}

