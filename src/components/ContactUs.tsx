import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ContactUs() {
  return (
    <div className=" flex flex-col justify-between">
      <></>
      <div className="container mx-auto py-12 px-4 md:px-6 lg:mt-40">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Contact Us</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Get in touch with our team for any inquiries or feedback.
            </p>
          </div>
          <Card>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Enter your email" type="email" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea className="min-h-[120px]" id="message" placeholder="Enter your message" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit">Submit</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
