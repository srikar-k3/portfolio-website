'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function RutgersSAPA() {
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const exportImages = [
    '/Export_Varun-20250419143334.jpg',
    '/Export_Varun-20250419143725-2.jpg',
    '/Export_Varun-20250419143833.jpg',
    '/Export_Varun-20250419143926.jpg',
    '/Export_Varun-20250419144033.jpg'
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <Navigation />
      
      {/* Full Width Hero Image */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full h-[calc(100vh-80px)] overflow-hidden"
      >
        <div 
          className="h-full"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <Image 
            src="/Minza7_RUSAPA-396.jpg" 
            alt="Rutgers SAPA Brand Identity" 
            width={1920} 
            height={1080}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.section>

      <main className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto py-24">

          {/* Alternating Content Sections */}
          <div className="space-y-24">
            {/* Row 1: Project Overview (Left) + Image (Right) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-16 items-center"
            >
              <div>
                <h3 className="text-4xl font-semibold text-black mb-6 text-center md:text-left">OVERVIEW</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  As Tech Chair and Dancer for Rutgers SAPA, I led comprehensive brand identity and digital content creation for the nationally competing dance team. This multifaceted role combined creative design, strategic marketing, and video production to elevate the team's competitive presence.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  The project encompassed strategic Instagram branding with progressive reveal campaigns, complete merchandise design collections, Soundcloud cover art, and cinematographic video production using professional editing software.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Each element was designed to build anticipation for competition seasons while maintaining brand consistency across all digital and physical touchpoints.
                </p>
              </div>
              <div className="aspect-[4/3] bg-white rounded-lg overflow-hidden">
                <Image 
                  src="/legendsPoster.jpg" 
                  alt="SAPA Team Overview - Legends Poster" 
                  width={800} 
                  height={600}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </motion.div>

            {/* Row 2: Video Production (Image Left) + Text (Right) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid md:grid-cols-2 gap-16 items-center"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden relative group">
                <div className="relative w-full h-full">
                  {exportImages.map((image, index) => (
                    <div
                      key={image}
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <Image 
                        src={image}
                        alt={`Video Production Screenshot ${index + 1}`}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Navigation dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {exportImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentImageIndex 
                          ? 'bg-white' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Navigation arrows */}
                <button
                  onClick={() => setCurrentImageIndex((prev) => 
                    prev === 0 ? exportImages.length - 1 : prev - 1
                  )}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => 
                    prev === exportImages.length - 1 ? 0 : prev + 1
                  )}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  →
                </button>
              </div>
              <div>
                <h3 className="text-4xl font-semibold text-black mb-6">VIDEO PRODUCTION</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Directed, produced, and edited cinematographic Introduction and Background Videos for both 2024 and 2025 competition seasons using Adobe Premiere Pro and After Effects.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Each video was crafted to build narrative tension and showcase the team's technical abilities while maintaining the mysterious elements essential to competition strategy.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  The production quality and cinematic approach significantly enhanced the team's stage presence and competitive impact during performances.
                </p>
                <blockquote className="border-l-4 border-gray-300 pl-6 mb-4">
                  <p className="text-xl text-gray-700 font-medium italic mb-2">
                    "Great production with the [background] video, really high quality. It adds to your impact in every segment."
                  </p>
                  <cite className="text-gray-600 font-medium">
                    — Harji Charaia, Legends 2025 Judge
                  </cite>
                </blockquote>
              </div>
            </motion.div>
          </div>

          {/* Merchandise Design - Centered Title + Full Width Display */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-24"
          >
            <h3 className="text-4xl font-semibold text-black mb-4 text-center">MERCHANDISE DESIGN</h3>
          </motion.section>
        </div>
      </main>

      {/* Merchandise Showcase Grid */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="w-full mb-16 px-6 md:px-12"
      >
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* 2025 Collection */}
          <div>
            <h4 className="text-2xl font-semibold text-black mb-6 text-center">2025 COLLECTION</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* 2025 Team */}
              <div className="flex flex-col items-center group">
                <div className="w-full rounded-lg overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-105">
                  <Image 
                    src="/sapateammerch2025.png" 
                    alt="2025 SAPA Team Merchandise" 
                    width={600} 
                    height={800}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <h5 className="text-lg font-medium text-black mb-1">TEAM UNIFORM</h5>
                <p className="text-sm text-gray-600 text-center">Competition Uniform</p>
              </div>

              {/* 2025 Crewneck */}
              <div className="flex flex-col items-center group">
                <div className="w-full rounded-lg overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-105">
                  <Image 
                    src="/sapamerch2025.png" 
                    alt="2025 SAPA Merchandise" 
                    width={600} 
                    height={800}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <h5 className="text-lg font-medium text-black mb-1">CREWNECK</h5>
                <p className="text-sm text-gray-600 text-center">Casual Wear</p>
              </div>

              {/* 2025 T-Shirt */}
              <div className="flex flex-col items-center group">
                <div className="w-full rounded-lg overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-105">
                  <Image 
                    src="/sapamerchshirt2025.png" 
                    alt="2025 SAPA T-Shirt" 
                    width={600} 
                    height={800}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <h5 className="text-lg font-medium text-black mb-1">T-SHIRT</h5>
                <p className="text-sm text-gray-600 text-center">Casual Wear</p>
              </div>

            </div>
          </div>

          {/* 2024 Collection */}
          <div>
            <h4 className="text-2xl font-semibold text-black mb-6 text-center">2024 COLLECTION</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* 2024 Team */}
              <div className="flex flex-col items-center group">
                <div className="w-full rounded-lg overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-105">
                  <Image 
                    src="/sapateammerch2024.png" 
                    alt="2024 SAPA Team Merchandise" 
                    width={600} 
                    height={800}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <h5 className="text-lg font-medium text-black mb-1">TEAM UNIFORM</h5>
                <p className="text-sm text-gray-600 text-center">Competition Uniform</p>
              </div>

              {/* 2024 Casual */}
              <div className="flex flex-col items-center group">
                <div className="w-full rounded-lg overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-105">
                  <Image 
                    src="/sapamerch2024.png" 
                    alt="2024 SAPA Merchandise" 
                    width={600} 
                    height={800}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <h5 className="text-lg font-medium text-black mb-1">CREWNECK</h5>
                <p className="text-sm text-gray-600 text-center">Casual Wear</p>
              </div>

            </div>
          </div>

        </div>
      </motion.section>

      <main className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Instagram Strategy Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="py-16 grid md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <h3 className="text-4xl font-semibold text-black mb-6">INSTAGRAM STRATEGY</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Developed and executed strategic Instagram branding for competition seasons, focusing on progressive reveal campaigns that build anticipation without disclosing themes too early.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Themes are central to the reveal experience and generate significant anticipation before official debuts. I implemented carefully timed progression of design elements throughout the feed, building visual intrigue while preserving the surprise element. Despite incorporating distinctive fonts, colors, and design assets, the actual theme was never guessed beforehand by the audience.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                This strategic approach maintained audience engagement throughout the competition season while creating a cohesive visual narrative that enhanced the team's professional image.
              </p>
            </div>
            {/* Interactive Instagram Grid */}
            <div className="grid grid-cols-3 gap-2 aspect-square">
              {[
                { src: "/sapaig9.png", alt: "SAPA Instagram Post 9" },
                { src: "/sapaig8.png", alt: "SAPA Instagram Post 8" },
                { src: "/sapaig7.jpg", alt: "SAPA Instagram Post 7" },
                { src: "/sapaig6.png", alt: "SAPA Instagram Post 6" },
                { src: "/sapaig5.png", alt: "SAPA Instagram Post 5" },
                { src: "/sapaig4.jpg", alt: "SAPA Instagram Post 4" },
                { src: "/sapaig3.jpg", alt: "SAPA Instagram Post 3" }, 
                { src: "/sapaig2.jpg", alt: "SAPA Instagram Post 2" },
                { src: "/sapaig1.png", alt: "SAPA Instagram Post 1" }
              ].map((image, index) => (
                <div 
                  key={index}
                  className="group relative overflow-hidden rounded-lg transition-all duration-500 ease-out hover:scale-150 hover:z-20"
                >
                  <Image 
                    src={image.src}
                    alt={image.alt}
                    width={360}
                    height={480}
                    className={`w-full h-full object-cover aspect-[3/4] transition-all duration-500 group-hover:brightness-110 ${
                      image.src === "/sapaig2.jpg" ? "object-center" : "object-top"
                    }`}
                  />
                </div>
              ))}
            </div>
          </motion.section>

          {/* Soundcloud Covers Section - Last */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="py-16 grid md:grid-cols-2 gap-16 items-center"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Southie Cover with Vinyl Effect */}
              <div className="relative group cursor-pointer z-10">
                <div className="aspect-square rounded-lg relative overflow-visible">
                  {/* Vinyl Record - starts hidden behind cover and slides out to the right */}
                  <div className="absolute top-0 left-0 w-full h-full z-0 transition-all duration-500 ease-out transform translate-x-0 group-hover:translate-x-12">
                    <Image 
                      src="/record.png" 
                      alt="Vinyl Record" 
                      width={300} 
                      height={300}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Album Cover */}
                  <div className="relative z-10 w-full h-full overflow-hidden rounded-lg">
                    <Image 
                      src="/southieCoverV1.3.1.png" 
                      alt="Southie SoundCloud Track Cover" 
                      width={300} 
                      height={300}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
                    />
                  </div>
                  
                  {/* Listen Text with black button */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 rounded-lg">
                    <a 
                      href="https://on.soundcloud.com/46rLiomQzyzw2zZCGS" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                    >
                      Listen on SoundCloud
                    </a>
                  </div>
                </div>
              </div>

              {/* SAPA Cover with Vinyl Effect */}
              <div className="relative group cursor-pointer z-0">
                <div className="aspect-square rounded-lg relative overflow-visible">
                  {/* Vinyl Record - starts hidden behind cover and slides out to the right */}
                  <div className="absolute top-0 left-0 w-full h-full z-0 transition-all duration-500 ease-out transform translate-x-0 group-hover:translate-x-12">
                    <Image 
                      src="/record.png" 
                      alt="Vinyl Record" 
                      width={300} 
                      height={300}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Album Cover */}
                  <div className="relative z-10 w-full h-full overflow-hidden rounded-lg">
                    <Image 
                      src="/sapaCoverV2.png" 
                      alt="SAPA SoundCloud Track Cover" 
                      width={300} 
                      height={300}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
                    />
                  </div>
                  
                  {/* Listen Text with black button */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 rounded-lg">
                    <a 
                      href="https://on.soundcloud.com/bjATpbuUGyDZIujJSj" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                    >
                      Listen on SoundCloud
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-semibold text-black mb-6">SOUNDCLOUD COVERS</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Created two custom Soundcloud track covers for the 2025 season, with our set theme inspired by Mad Max: Fury Road. I incorporated visual elements and assets from the film's iconic marketing materials, creating unique covers that capture the post-apocalyptic energy while maintaining the team's visual identity.
              </p>
            </div>
          </motion.section>

        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}