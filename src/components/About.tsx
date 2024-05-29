
export  function About() {
  return (
    <section className="py-12 md:py-16 lg:py-20 text-left w-full">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">About Us</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl leading-relaxed">
            Welcome to our immersive world of Virtual Reality at{" "}
            <span className="text-lg md:text-l text-[#7437d7e6] font-bold">360°-VR!</span> Step
            into a realm where boundaries fade and possibilities expand beyond imagination. Our
            passion for cutting-edge technology drives us to bring you the latest and most
            exhilarating VR products that redefine how you experience the virtual space. Join us on
            a journey where reality blends seamlessly with the virtual, creating unforgettable
            moments of wonder and excitement.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Key Facts</h3>
              <ul className="space-y-1 text-gray-500 dark:text-gray-400">
                <li>
                  <span className="font-medium text-white dark:text-gray-100">Founded:</span>
                  2024{"\n                            "}
                </li>
                <li>
                  <span className="font-medium text-white dark:text-gray-100">Headquarters:</span>
                  Riyadh, KSA{"\n                            "}
                </li>
                <li>
                  <span className="font-medium text-white dark:text-gray-100">Team Size:</span>
                  4+{"\n                            "}
                </li>
                <li>
                  <span className="font-medium text-white dark:text-gray-100">Clients:</span>
                  10+{"\n                            "}
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Our Mission</h3>
              <p className="text-gray-500 dark:text-gray-400">
                At <span className="text-lg md:text-lg text-[#7437d7e6] font-bold">360°-VR!</span>,
                our mission is to revolutionize the way you interact with technology by delivering
                top-notch VR products that inspire, entertain, and empower. We are dedicated to
                providing access to innovative virtual experiences that push the boundaries of
                imagination and transport you to new dimensions of reality. With a commitment to
                quality, creativity, and customer satisfaction, we strive to be your trusted partner
                in the world of Virtual Reality, enriching your life with unparalleled immersion and
                excitement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
