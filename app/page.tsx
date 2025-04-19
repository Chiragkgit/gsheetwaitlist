"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      if (data.status === 'success') {
        setStatus('success');
        setMessage('Thanks for joining the waitlist!');
        setEmail('');
      } else {
        throw new Error(data.error || 'Failed to add email');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900 opacity-90"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Lorem ipsum dolor sit amet consectetur{" "}
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              adipiscing elit
            </span>{" "}
            sed do eiusmod tempor
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <button 
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-black font-bold py-4 px-12 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
          >
            Join Waitlist
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-black py-32 relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-20">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-5xl mb-6">✅</div>
              <h3 className="text-2xl font-semibold mb-4">Step One</h3>
              <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-5xl mb-6">⏰</div>
              <h3 className="text-2xl font-semibold mb-4">Step Two</h3>
              <p className="text-gray-400">Sed do eiusmod tempor incididunt ut labore.</p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <div className="text-5xl mb-6">🎯</div>
              <h3 className="text-2xl font-semibold mb-4">Step Three</h3>
              <p className="text-gray-400">Ut enim ad minim veniam, quis nostrud.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Works Section */}
      <section className="py-32 bg-black relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-20">Why Choose Us</h2>
          <div className="max-w-3xl mx-auto">
            <ul className="space-y-8">
              <li className="flex items-start p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-white/20 transition-all duration-300">
                <span className="text-white text-2xl mr-4">✓</span>
                <span className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
              </li>
              <li className="flex items-start p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-white/20 transition-all duration-300">
                <span className="text-white text-2xl mr-4">✓</span>
                <span className="text-xl">Sed do eiusmod tempor incididunt ut labore</span>
              </li>
              <li className="flex items-start p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-white/20 transition-all duration-300">
                <span className="text-white text-2xl mr-4">✓</span>
                <span className="text-xl">Ut enim ad minim veniam, quis nostrud</span>
              </li>
              <li className="flex items-start p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-white/20 transition-all duration-300">
                <span className="text-white text-2xl mr-4">✓</span>
                <span className="text-xl">Exercitation ullamco laboris nisi ut aliquip</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section id="waitlist" className="py-32 bg-white text-black relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-8">Join Our Waitlist</h2>
          <p className="text-gray-700 text-xl mb-12">Be the first to know when we launch</p>
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-grow px-6 py-4 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button 
                type="submit"
                disabled={status === "loading"}
                className="bg-black text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Joining..." : "Join Waitlist"}
              </button>
            </form>
            {message && (
              <p className={`mt-4 text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">© 2025 Company Name. All rights reserved.</p>
            </div>
            <div className="flex space-x-8">
              <Link href="#" className="text-gray-400 hover:text-white transition duration-300">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition duration-300">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition duration-300">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
