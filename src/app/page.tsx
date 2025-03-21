import React, { useState, useEffect } from 'react';
import { MapPin, Clock, CalendarDays } from 'lucide-react';

const DinnerInvitation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [responseSelected, setResponseSelected] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confetti, setConfetti] = useState([]);
  
  const funnyResponses = [
    "Round 2 after Jacob's! 🥒",
    "Better than Fred's winery! 🍷",
    "Tom Waits' bones say YES! 🎵"
  ];
  
  // Generate confetti particles
  const generateConfetti = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20 - Math.random() * 100,
      size: 4 + Math.random() * 8,
      color: ['#FFD700', '#FF6347', '#4169E1', '#2E8B57', '#9370DB', '#FF1493', '#00CED1'][
        Math.floor(Math.random() * 7)
      ],
      rotation: Math.random() * 360,
      speed: 1 + Math.random() * 3
    }));
  };

  // Animation for confetti falling
  useEffect(() => {
    if (!showConfetti) return;
    
    const interval = setInterval(() => {
      setConfetti(prev => 
        prev.map(particle => ({
          ...particle,
          y: particle.y + particle.speed,
          rotation: particle.rotation + 2
        })).filter(particle => particle.y < 150)
      );
    }, 50);

    return () => clearInterval(interval);
  }, [showConfetti]);

  // Trigger confetti effect
  const handleConfettiEffect = () => {
    setShowConfetti(true);
    setConfetti(generateConfetti(100));
    setTimeout(() => setShowConfetti(false), 4000);
  };

  // Handle opening invitation with confetti
  const openInvitation = () => {
    setIsOpen(true);
    handleConfettiEffect();
  };

  // Handle response selection with confetti
  const handleResponseClick = (index) => {
    setResponseSelected(index);
    handleConfettiEffect();
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-r from-purple-100 to-pink-100 p-4">
      <div className="relative w-full max-w-sm mx-auto">
        {!isOpen ? (
          // Closed envelope
          <div 
            onClick={openInvitation}
            className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex justify-center mb-4 animate-bounce">
              <svg width="64" height="64" viewBox="0 0 64 64" className="text-pink-500">
                <path d="M32,10 C38,10 42,14 42,20 C42,24 40,28 38,30 C38,30 44,32 44,38 C44,42 42,48 40,52 C39,54 38,56 36,56 L34,56 C34,54 34,50 32,50 C30,50 30,54 30,56 L28,56 C26,56 25,54 24,52 C22,48 20,42 20,38 C20,32 26,30 26,30 C24,28 22,24 22,20 C22,14 26,10 32,10 Z" 
                fill="#F5A9B8" stroke="#D53F8C" strokeWidth="1.5" />
                <ellipse cx="28" cy="24" rx="2" ry="3" fill="#333" />
                <ellipse cx="36" cy="24" rx="2" ry="3" fill="#333" />
                <path d="M30,28 C31,29 33,29 34,28" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M26,18 C24,14 20,15 20,18" fill="none" stroke="#D53F8C" strokeWidth="1.5" />
                <path d="M38,18 C40,14 44,15 44,18" fill="none" stroke="#D53F8C" strokeWidth="1.5" />
              </svg>
            </div>
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">You're Invited!</h2>
            <p className="text-gray-600">Tap to open</p>
            <div className="mt-4 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
          </div>
        ) : (
          // Open invitation
          <div className="bg-white rounded-xl shadow-xl overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="h-12 bg-gradient-to-r from-purple-500 to-pink-500" />
            
            {/* Content */}
            <div className="p-6 text-center">
              <h1 className="text-3xl font-serif font-bold text-gray-800 mb-4 animate-fade-in">
                Dinner Invitation
              </h1>
              
              <div className="mb-6 animate-slide-up">
                <p className="text-gray-600">Emma & Dylan</p>
                <div className="flex items-center justify-center my-2">
                  <div className="h-px w-10 bg-pink-300" />
                  <p className="mx-2 text-sm text-gray-500">cordially invite</p>
                  <div className="h-px w-10 bg-pink-300" />
                </div>
                <p className="text-xl font-medium text-purple-700">Michael & Lilly</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg mb-6 shadow-sm border border-purple-100 animate-fade-in delay-300">
                <h2 className="text-2xl font-serif text-pink-600 mb-2">Llama Inn</h2>
                <div className="flex justify-center items-center text-gray-600 mb-1">
                  <MapPin className="w-4 h-4 mr-1 text-pink-500" />
                  <span>Brooklyn, NY</span>
                </div>
                <div className="flex justify-center items-center text-gray-600 mb-1">
                  <Clock className="w-4 h-4 mr-1 text-pink-500" />
                  <span>8:30 PM</span>
                </div>
                <div className="flex justify-center items-center text-gray-600">
                  <CalendarDays className="w-4 h-4 mr-1 text-pink-500" />
                  <span>Friday, March 21</span>
                </div>
              </div>
              
              <div className="mb-6 animate-fade-in delay-500">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Your Response:
                </h3>
                <div className="space-y-2">
                  {funnyResponses.map((response, index) => (
                    <button
                      key={index}
                      onClick={() => handleResponseClick(index)}
                      className={`w-full px-4 py-3 rounded-lg transition-all duration-300 ${
                        responseSelected === index 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white transform scale-105 shadow-md' 
                          : 'bg-white border border-purple-200 text-gray-700 hover:bg-purple-50'
                      }`}
                    >
                      {response}
                    </button>
                  ))}
                </div>
              </div>
              
              {responseSelected !== null && (
                <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg border border-green-100 animate-slide-up">
                  Fantastic! We can't wait to see you both!
                </div>
              )}
              
              <p className="text-xs text-gray-500 italic animate-pulse-slow">
                P.S. This dinner is non-negotiable! 😉
              </p>
            </div>
            
            {/* Footer */}
            <div className="h-4 bg-gradient-to-r from-purple-500 to-pink-500" />
          </div>
        )}
        
        {/* Confetti effect */}
        {showConfetti && confetti.map(particle => (
          <div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              transform: `rotate(${particle.rotation}deg)`,
              opacity: 0.8,
              zIndex: 50
            }}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes pulse-slow {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
        
        .delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </div>
  );
};

export default DinnerInvitation;
