import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Wrench, PenTool as Tool } from "lucide-react";

function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        About Hardware Mart
      </h1>

      <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="mb-4">
            Founded in 2010, Hardware Mart began as a small family-owned store
            with a simple mission: to provide high-quality tools and hardware
            supplies at affordable prices. What started as a modest shop has
            grown into a trusted name in the industry, serving both professional
            contractors and DIY enthusiasts alike.
          </p>
          <p>
            Our journey has been defined by our commitment to quality,
            expertise, and customer satisfaction. We believe that the right
            tools make all the difference, whether you're a seasoned
            professional or just starting your first home improvement project.
          </p>
        </div>
        <div className="relative h-[300px] rounded-lg overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80"
            alt="Hardware Mart Store"
            className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="bg-white rounded-full p-2">
                    <Tool className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white text-2xl font-bold">
                      Hardware Mart
                    </h3>
                    <p className="text-white/80">Est. 2010</p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-2">
                  <Wrench className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay transition-opacity duration-700 opacity-0 group-hover:opacity-100"></div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p>
                We carefully select every product in our inventory to ensure it
                meets our high standards for durability and performance.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2">Expertise</h3>
              <p>
                Our team consists of industry experts who can provide
                knowledgeable advice and solutions for any project.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2">Customer Service</h3>
              <p>
                We believe in building lasting relationships with our customers
                through exceptional service and support.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              name: "John Smith",
              position: "Founder & CEO",
              image:
                "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80",
            },
            {
              name: "Sarah Johnson",
              position: "Operations Manager",
              image:
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
            },
            {
              name: "Michael Brown",
              position: "Product Specialist",
              image:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
            },
            {
              name: "Emily Davis",
              position: "Customer Service Lead",
              image:
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80",
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative h-[200px] w-[200px] mx-auto rounded-full overflow-hidden mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-gray-600">{member.position}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Our Commitment</h2>
        <p className="max-w-3xl mx-auto text-center">
          At Hardware Mart, we're committed to supporting our community and the
          environment. We partner with local organizations to promote
          sustainable building practices and regularly participate in community
          improvement projects. We also strive to reduce our environmental
          footprint by offering eco-friendly products and implementing
          sustainable business practices.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
