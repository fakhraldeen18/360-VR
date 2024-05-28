
export  function About() {
  return (
    <section className="py-12 md:py-16 lg:py-20 text-left w-full">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">About Us</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl leading-relaxed">
            We are a team of passionate individuals dedicated to creating innovative solutions that
            empower our clients to achieve their goals. With years of experience in the industry, we
            have developed a deep understanding of the challenges our customers face and are
            committed to providing them with the tools and support they need to succeed.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Key Facts</h3>
              <ul className="space-y-1 text-gray-500 dark:text-gray-400">
                <li>
                  <span className="font-medium text-white dark:text-gray-100">Founded:</span>
                  2015{"\n                            "}
                </li>
                <li>
                  <span className="font-medium text-white dark:text-gray-100">
                    Headquarters:
                  </span>
                  San Francisco, CA{"\n                            "}
                </li>
                <li>
                  <span className="font-medium text-white dark:text-gray-100">Team Size:</span>
                  50+{"\n                            "}
                </li>
                <li>
                  <span className="font-medium text-white dark:text-gray-100">Clients:</span>
                  100+{"\n                            "}
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Our Mission</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Our mission is to empower our clients with the tools and support they need to
                achieve their goals and drive their businesses forward. We are committed to
                delivering exceptional service and innovative solutions that make a real difference
                in the lives of our customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
