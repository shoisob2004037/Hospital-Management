import { Link } from "react-router-dom"
import { LayoutDashboard, Stethoscope, Users, UserCog, MessageSquare, UserPlus, Shield } from "lucide-react"

const Home = () => {
  const features = [
    {
      icon: <LayoutDashboard className="h-8 w-8 text-primary-600" />,
      title: "Dashboard",
      description: "Get an overview of appointments, doctors, users, and admin statistics.",
      link: "/dashboard",
      color: "from-primary-500 to-primary-600",
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-secondary-600" />,
      title: "Manage Doctors",
      description: "View, add, and manage doctor profiles and their details.",
      link: "/doctors",
      color: "from-secondary-500 to-secondary-600",
    },
    {
      icon: <Users className="h-8 w-8 text-accent-600" />,
      title: "User Management",
      description: "View and manage all registered patients in the system.",
      link: "/patients",
      color: "from-accent-500 to-accent-600",
    },
    {
      icon: <UserCog className="h-8 w-8 text-blue-600" />,
      title: "Admin Profile",
      description: "View and manage your admin profile information.",
      link: "/admin/me",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-purple-600" />,
      title: "Messages",
      description: "View and respond to messages from users and doctors.",
      link: "/messages",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <UserPlus className="h-8 w-8 text-pink-600" />,
      title: "Add New Doctor",
      description: "Register new doctors to the healthcare system.",
      link: "/doctor/addnew",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-600" />,
      title: "Admin Management",
      description: "View all administrators and add new admin users.",
      link: "/admins",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: <UserPlus className="h-8 w-8 text-green-600" />,
      title: "Add New Admin",
      description: "Register new administrators to the system.",
      link: "/admin/addnew",
      color: "from-green-500 to-green-600",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 bg-gradient-to-br from-primary-600 to-primary-700 p-8 flex flex-col justify-center text-white">
            <h1 className="text-3xl font-bold mb-4">Hospital Admin Dashboard</h1>
            <p className="text-lg text-primary-100 mb-6">
              Welcome to the hospital administration system. Manage doctors, patients, appointments, and more from a
              single dashboard.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 transition-colors"
            >
              <LayoutDashboard className="mr-2 h-5 w-5" />
              Go to Dashboard
            </Link>
          </div>
          <div className="md:w-1/2 p-8 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Hospital Logo"
              className="max-h-64 object-contain"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = "https://via.placeholder.com/300x200?text=Hospital+Logo"
              }}
            />
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900">Quick Access</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Link
            key={index}
            to={feature.link}
            className="bg-white rounded-xl shadow-card overflow-hidden transition-all duration-300 hover:shadow-card-hover transform hover:-translate-y-1"
          >
            <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
