import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import SectionContainer from "@/lib/SectionContainer";
import { ShieldCheck, Lock, Database, LayoutGrid } from "lucide-react";
import FeatureCard from "@/components/atom/FeatureCard";
import Heading from "@/components/atom/Heading";
import Navbar from "@/components/molecules/Navbar";
import Footer from "@/components/molecules/Footer";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const features = [
  {
    icon: ShieldCheck,
    title: "Role-Based Access",
    description:
      "Control permissions across admin, analyst, and viewer roles with strict access enforcement.",
  },
  {
    icon: Lock,
    title: "Secure Authentication",
    description:
      "JWT-based authentication with encrypted credentials and protected endpoints.",
  },
  {
    icon: Database,
    title: "Efficient Data Handling",
    description:
      "Optimized APIs with filtering, pagination, and structured data flow.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)

  return (
    <>
      <Navbar />
      <div className="min-h-screen text-white">
        <SectionContainer className="text-center">
          <section className="relative min-h-[90vh] flex flex-col justify-center">
            <div className="">
              {/* badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-zinc-700 bg-zinc-800/60 text-xs text-zinc-400 mb-6">
                Backend Assignment | Finance System
              </div>

              {/* heading */}
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-tight mb-6">
                Finance Data Processing <br />
                <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                  with Secure Access Control
                </span>
              </h1>

              {/* description */}
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg mb-10 leading-relaxed">
                Built with a focus on scalable APIs, role-based authorization,
                and structured financial data workflows - ensuring secure access
                control, efficient data handling, and consistent performance
                across all user roles.
              </p>

              {/* buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  onClick={() => navigate("/login")}
                  className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 px-8 py-6 text-base shadow-lg hover:shadow-xl transition cursor-pointer"
                >
                  Get Started
                </Button>

                {!user && <Button
                  variant="outline"
                  onClick={() => navigate("/signup")}
                  className="w-full sm:w-auto border-zinc-700 text-white hover:text-white/90 hover:bg-zinc-800 px-8 py-6 text-base cursor-pointer"
                >
                  Create Account
                </Button>}
              </div>
            </div>
          </section>

          {/* Feature section */}
          <section className="pb-28">
            <Heading
              icon={LayoutGrid}
              title="Core Features"
              subtitle="Built for security, performance, and scalability"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </section>
        </SectionContainer>
      </div>
      <Footer />
    </>
  );
}
