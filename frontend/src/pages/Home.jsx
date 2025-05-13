import Hero from "../components/Hero.jsx"
import Department from "../components/Department.jsx"
import MessageForm from "../components/MessageForm.jsx"
import FAQ from "../components/FAQ.jsx"
import { Stethoscope, Heart, Activity } from "lucide-react"

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero title="Welcome to e-Hospital | Your Trusted Healthcare Provider" />

        {/* Featured Section */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-primary-800 sm:text-4xl">Why Choose Us</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600">
              We provide comprehensive healthcare services with a focus on patient comfort and care.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white rounded-xl shadow-card p-6 transition-all duration-300 hover:shadow-card-hover transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <Stethoscope className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Doctors</h3>
              <p className="text-gray-600">
                Our team consists of highly qualified and experienced medical professionals dedicated to your health.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-card p-6 transition-all duration-300 hover:shadow-card-hover transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Patient-Centered Care</h3>
              <p className="text-gray-600">
                We prioritize your comfort and well-being with personalized treatment plans and compassionate care.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-card p-6 transition-all duration-300 hover:shadow-card-hover transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Modern Facilities</h3>
              <p className="text-gray-600">
                Our hospital is equipped with state-of-the-art technology to provide the best possible care.
              </p>
            </div>
          </div>
        </section>

        <Department />
        <FAQ />
        <MessageForm />
      </div>
    </div>
  )
}

export default Home
