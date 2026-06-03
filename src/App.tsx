/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  DollarSign, 
  Users, 
  Smartphone, 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Copy, 
  Sparkles,
  ShoppingBag,
  CreditCard,
  QrCode,
  CheckCircle2,
  X,
  AlertTriangle,
  Clock,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { 
  steps, 
  methods, 
  whatYouWillReceive, 
  testimonials, 
  faqItems,
  CourseModule
} from "./data";

export default function App() {
  // --- VSL State Machine ---
  const [vslPlaying, setVslPlaying] = useState<boolean>(true);
  const [vslMuted, setVslMuted] = useState<boolean>(true); // starts muted as requested
  const [vslProgress, setVslProgress] = useState<number>(0);
  const [vslDuration, setVslDuration] = useState<number>(0);
  const [vslCurrentTime, setVslCurrentTime] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync video play/pause with React state
  useEffect(() => {
    if (videoRef.current) {
      if (vslPlaying) {
        videoRef.current.play().catch((err) => {
          console.log("Autoplay blocked by browser. Starting paused/muted.", err);
          setVslPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [vslPlaying]);

  // Sync mute state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = vslMuted;
    }
  }, [vslMuted]);

  const formatVideoTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // --- Slideshow for Members Area Mockup ---
  const [activeDemoIdx, setActiveDemoIdx] = useState<number>(0);
  const demoImages = [
    "/imgs/demonstracaoarea1.png",
    "/imgs/demonstracaoarea2.png",
    "/imgs/demonstracaoarea3.png",
    "/imgs/demonstracaoarea4.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemoIdx((prev) => (prev + 1) % demoImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // --- Countdown Timer for Hero Section Banner ---
  const [timeLeft, setTimeLeft] = useState<{ minutes: number; seconds: number }>({ minutes: 14, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return { minutes: 14, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // --- Interactive Profit Calculator States ---
  const [dailySales, setDailySales] = useState<number>(5);
  const unitCost = 15;
  const unitPrice = 60;
  const unitProfit = unitPrice - unitCost; // R$45

  const dailyProfit = dailySales * unitProfit;
  const weeklyProfit = dailyProfit * 7;
  const monthlyProfit = dailyProfit * 30;

  // --- Carousel / Flavor States ---
  const [activeFlavorIndex, setActiveFlavorIndex] = useState<number>(0);
  const flavorImages = [
    {
      title: "Clássico Morango com Belga",
      // high-contrast abstract confectionery background simulating a delicious dark cake chocolate pattern with strawberries
      url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      title: "Black Supreme Pistache",
      url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      title: "Red Velvet Ninho Especial",
      url: "https://images.unsplash.com/photo-1616031037011-087000171abe?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      title: "Brigadeiro Crocante & Doce de Leite",
      url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400&h=400"
    }
  ];

  // --- FAQ State Machine ---
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0); // open first by default
  const [currentDepoimento, setCurrentDepoimento] = useState<number>(0);
  const depoimentoImages = [
    "/imgs/depoimentos/social1.webp",
    "/imgs/depoimentos/social2.webp",
    "/imgs/depoimentos/social3.webp",
    "/imgs/depoimentos/social4.webp"
  ];

  const toggleFAQ = (index: number) => {
    if (openFAQIndex === index) {
      setOpenFAQIndex(null);
    } else {
      setOpenFAQIndex(index);
    }
  };

  // --- Floating Navbar and Scroll Tracking ---
  const phoneFrameRef = useRef<HTMLDivElement>(null);
  const [showStickyNav, setShowStickyNav] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      let scrollPos = 0;
      if (phoneFrameRef.current) {
        scrollPos = phoneFrameRef.current.scrollTop;
      }
      // Combine with window scroll position
      scrollPos = Math.max(scrollPos, window.scrollY);

      if (scrollPos > 650) {
        setShowStickyNav(true);
      } else {
        setShowStickyNav(false);
      }
    };

    const container = phoneFrameRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // --- Cronômetro de Oferta Limitada ---
  const [offerTimeLeft, setOfferTimeLeft] = useState<number>(3600 * 1 + 60 * 19 + 10);

  useEffect(() => {
    const timer = setInterval(() => {
      setOfferTimeLeft((prev) => {
        if (prev <= 1) {
          return 3600 * 1 + 60 * 19 + 10; // Reinicia a oferta ao chegar no zero
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const offerHours = Math.floor(offerTimeLeft / 3600);
  const offerMinutes = Math.floor((offerTimeLeft % 3600) / 60);
  const offerSeconds = offerTimeLeft % 60;

  const formatOfferTime = (time: number) => String(time).padStart(2, "0");

  // --- Configuração de Checkout Externo ---
  // IMPORTANTE: Altere esta URL para a sua URL de checkout real (Kiwify, Hotmart, Braip, PerfectPay, etc.)
  const CHECKOUT_URL = "https://pay.wiapy.com/BYKMdOphnB";

  const handleCheckoutRedirect = () => {
    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: 'X-Bolo Gourmet Lucrativo',
        currency: 'BRL',
        value: 97.00
      });
    }
    window.location.href = CHECKOUT_URL;
  };

  // Safe navigation links scroll down to the Pricing/Offer card
  const scrollToOffer = () => {
    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: 'X-Bolo Gourmet Lucrativo',
        currency: 'BRL',
        value: 97.00
      });
    }
    const section = document.getElementById("oferta-principal");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1EA] font-sans antialiased text-brand-brown flex flex-col items-center justify-start py-0">
      
      {/* Primary Container */}
      <div 
        id="phone-frame"
        className="w-full max-w-[480px] min-h-screen bg-[#F5F1EA] flex flex-col relative"
      >
        
        {/* Sticky Top Banner - NOVA TENDÊNCIA DO MOMENTO (Replaced previous header) */}
        <div className="bg-brand-brown text-white py-3 px-4 border-b border-white/10 flex items-center justify-between shadow-md select-none z-40">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-brand-yellow animate-pulse flex-shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-mono font-bold tracking-wider text-brand-yellow/90 uppercase leading-none">
                NOVA TENDÊNCIA DO MOMENTO:
              </span>
              <span className="text-sm font-serif font-bold text-white tracking-wide mt-0.5 leading-tight">
                X-Bolo Lucrativo 2026
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 bg-white/10 px-2.5 py-1 rounded-full border border-white/10 flex-shrink-0">
            <Clock className="w-3.5 h-3.5 text-brand-yellow" />
            <span className="text-xs font-mono font-bold text-brand-yellow">
              {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div 
          ref={phoneFrameRef}
          className="w-full relative flex flex-col"
        >

        {/* 1. HERO SECTION (TOPO) */}
        <section className="px-5 pt-8 pb-10 bg-[#F5F1EA] text-center space-y-6">
          <div className="inline-flex items-center space-x-1.5 bg-brand-brown/10 border border-brand-brown/25 rounded-full px-4 py-1.5 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-brand-yellow shrink-0 fill-brand-yellow/20" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-brand-brown">
              Chegou o Novo Produto da Confeitaria
            </span>
          </div>

          <h2 className="text-2xl font-serif font-bold leading-tight tracking-tight px-1 text-brand-brown">
            O doce que está chamando atenção de todo mundo
          </h2>

          <p className="text-base text-brand-brown/80 leading-relaxed font-light px-4 max-w-[380px] mx-auto">
            O método passo a passo para{' '}
            <span className="whitespace-nowrap">
              faturar até{' '}
              <strong className="inline-block align-middle text-[1.25rem] font-black text-brand-yellow bg-brand-brown border border-brand-yellow/30 px-3 py-1 mx-0.5 my-0.5 rounded-full leading-none whitespace-nowrap shadow-[0_4px_12px_rgba(78,42,30,0.15)]">
                R$ 5.000,00 por mês
              </strong>
            </span>{' '}
            com X-Bolo Gourmet na sua própria casa.
          </p>

          {/* Real Video Sales Letter (VSL) Section inside a Premium mockup frame */}
          <div className="relative mx-auto w-full max-w-[280px] aspect-[9/16] bg-stone-950 rounded-[32px] overflow-hidden shadow-[0_16px_40px_rgba(78,42,30,0.25)] border-[4px] border-brand-brown/15">
            {/* Real HTML5 Video element */}
            <video
              ref={videoRef}
              src="https://pub-a772dcccd942498d933354c58ab4ce29.r2.dev/vsl.mp4"
              playsInline
              autoPlay
              muted={vslMuted}
              className="w-full h-full object-cover cursor-pointer"
              onTimeUpdate={() => {
                if (videoRef.current) {
                  const current = videoRef.current.currentTime;
                  const duration = videoRef.current.duration || 1;
                  setVslCurrentTime(current);
                  setVslProgress((current / duration) * 100);
                }
              }}
              onLoadedMetadata={() => {
                if (videoRef.current) {
                  setVslDuration(videoRef.current.duration);
                }
              }}
              onClick={() => {
                if (vslMuted) {
                  setVslMuted(false);
                  setVslPlaying(true);
                } else {
                  if (vslPlaying) {
                    setVslPlaying(false);
                  } else {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0; // restarts from the beginning on unpause
                    }
                    setVslPlaying(true);
                  }
                }
              }}
            />

            {/* Pulsing Visual Live Element inside Video */}
            <div className="absolute top-3.5 left-3.5 flex items-center space-x-2 z-10 pointer-events-none select-none">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-[9px] font-mono font-bold tracking-widest text-white bg-red-600/90 px-1.5 py-0.5 rounded shadow">
                AO VIVO 🔴
              </span>
            </div>

            {/* Premium Gold Flashing Unmute Warning (Click to Unmute) */}
            {vslMuted && (
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  setVslMuted(false);
                  setVslPlaying(true);
                }}
                className="absolute top-12 inset-x-3 bg-brand-yellow hover:bg-brand-yellow/95 text-brand-brown font-bold text-[10px] uppercase px-2 py-2.5 rounded-xl shadow-[0_8px_20px_rgba(244,201,93,0.45)] border border-brand-brown/10 flex items-center justify-center space-x-1.5 animate-bounce cursor-pointer z-30 pointer-events-auto"
              >
                <VolumeX className="w-3.5 h-3.5 animate-pulse shrink-0 text-brand-brown" />
                <span className="tracking-wide text-center">CLIQUE PARA ATIVAR O SOM! 🔊</span>
              </div>
            )}

            {/* Video Bottom Player Controls */}
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col space-y-2 z-20 pointer-events-auto">
              {/* Visual-only Progress Bar (Direct-Response VSL pattern: hides scrubbing to increase watch times) */}
              <div className="h-1 bg-white/20 rounded-full overflow-hidden w-full select-none">
                <div 
                  className="h-full bg-brand-yellow transition-all duration-75 ease-linear"
                  style={{ width: `${vslProgress}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* Play/Pause Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!vslPlaying) {
                        if (videoRef.current) {
                          videoRef.current.currentTime = 0; // restarts from the beginning on unpause
                        }
                      }
                      setVslPlaying(!vslPlaying);
                    }}
                    className="w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 active:scale-90 transition-all flex items-center justify-center text-white cursor-pointer"
                  >
                    {vslPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
                  </button>
                  {/* Time Counter */}
                  <span className="text-[10px] text-white/80 font-mono select-none">
                    {formatVideoTime(vslCurrentTime)} / {formatVideoTime(vslDuration)}
                  </span>
                </div>

                {/* Mute/Unmute Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setVslMuted(!vslMuted);
                  }}
                  className="w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 active:scale-90 transition-all flex items-center justify-center text-white cursor-pointer"
                >
                  {vslMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Splash Overlay when paused */}
            {!vslPlaying && (
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0; // restarts from the beginning on unpause
                  }
                  setVslPlaying(true);
                }}
                className="absolute inset-0 bg-stone-950/80 backdrop-blur-[4px] flex flex-col items-center justify-center space-y-4 cursor-pointer z-30 pointer-events-auto transition-all duration-300"
              >
                {/* Glowing & Pulsing Play Button mockup */}
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-brand-yellow/25 animate-ping duration-1000"></span>
                  <span className="absolute -inset-1 rounded-full bg-brand-yellow/15 animate-pulse"></span>
                  <div className="relative z-10 w-16 h-16 rounded-full bg-brand-yellow hover:bg-brand-yellow/95 flex items-center justify-center text-brand-brown shadow-[0_0_35px_rgba(244,201,93,0.65)] hover:scale-105 active:scale-95 transition-all duration-300">
                    <Play className="w-7 h-7 fill-brand-brown ml-1 transition-transform group-hover:scale-110" />
                  </div>
                </div>

                {/* Text and Badges */}
                <div className="flex flex-col items-center space-y-1 px-4 text-center select-none">
                  <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-brand-yellow bg-brand-brown/70 px-3 py-1 rounded-full border border-brand-yellow/30 shadow-sm">
                    Vídeo Interrompido
                  </span>
                  <h4 className="text-white font-serif font-black text-sm tracking-wide mt-1">
                    Como Faturar R$ 5.000/Mês
                  </h4>
                  <p className="text-white/70 text-[10px] max-w-[200px] leading-relaxed font-light font-sans">
                    Clique para continuar assistindo e descobrir o segredo dos bolos trufados
                  </p>
                </div>

                {/* Sleek CTA Button */}
                <div className="bg-brand-yellow hover:bg-brand-yellow/95 text-brand-brown font-sans font-black text-xs uppercase px-5 py-2.5 rounded-full shadow-[0_6px_20px_rgba(244,201,93,0.4)] tracking-wider active:scale-95 transition-all border border-brand-brown/15">
                  CONTINUAR APRESENTAÇÃO
                </div>
              </div>
            )}
          </div>



          <div className="pt-3">
            <button 
              onClick={scrollToOffer}
              className="w-full bg-brand-yellow hover:bg-brand-yellow/95 font-sans font-bold text-brand-brown py-4.5 px-6 rounded-full tracking-wider hover:opacity-95 shadow-[0_4px_12px_rgba(244,201,93,0.3)] transition-all transform active:scale-98 animate-soft-pulse text-base"
            >
              QUERO APRENDER
            </button>
            <p className="text-sm text-brand-brown/60 font-sans font-bold mt-2.5 flex items-center justify-center space-x-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block mr-1"></span>
              Garantia de 30 dias • Acesso Vitalício Imediato
            </p>
          </div>
        </section>

        {/* 2. CARROSSEL DE PRODUTOS (DUPLO FLUXO CONTRA-SENSOS COMO SEGUNDO MODELO) */}
        <section className="py-12 bg-zinc-50 border-y border-brand-beige-dark/60 text-center space-y-6 overflow-hidden">
          <div className="space-y-1.5 px-5">
            <span className="text-xs font-mono text-brand-brown/70 tracking-wider uppercase font-bold">Variedade Lucrativa</span>
            <h3 className="text-3xl font-serif font-extrabold text-brand-brown leading-tight">
              Mais de 25 receitas de{" "}
              <span className="whitespace-nowrap">
                bolos{" "}
                <span className="text-brand-yellow bg-brand-brown px-4 py-1.5 rounded-lg inline-flex items-center uppercase text-lg font-sans font-black tracking-wider align-middle">
                  DIFERENTES
                </span>
              </span>
            </h3>
            <p className="text-xs text-brand-brown/85 max-w-xs mx-auto leading-relaxed font-light">
              Para seus clientes não ficarem sem opções
            </p>
          </div>

          {/* Double Infinite Marquee Tracks */}
          <div className="space-y-4">
            
            {/* ROW 1: Slides LEFT */}
            <div className="relative w-full overflow-hidden py-1">
              <div className="animate-marquee-left space-x-3.5 pr-3.5">
                {[
                  "/imgs/1.webp",
                  "/imgs/2.webp",
                  "/imgs/3.webp",
                  "/imgs/4.webp",
                  "/imgs/5.webp"
                ].map((imgUrl, i) => (
                  <div key={`row1-${i}`} className="w-[180px] aspect-square bg-[#FAEFE4] border border-brand-brown/10 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                    <img 
                      src={imgUrl} 
                      alt="Sabores Gourmet" 
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </div>
                ))}
                {/* Duplicate row for looping effect */}
                {[
                  "/imgs/1.webp",
                  "/imgs/2.webp",
                  "/imgs/3.webp",
                  "/imgs/4.webp",
                  "/imgs/5.webp"
                ].map((imgUrl, i) => (
                  <div key={`row1-dup-${i}`} className="w-[180px] aspect-square bg-[#FAEFE4] border border-brand-brown/10 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                    <img 
                      src={imgUrl} 
                      alt="Sabores Gourmet" 
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 2: Slides RIGHT (Opposite direction) */}
            <div className="relative w-full overflow-hidden py-1">
              <div className="animate-marquee-right space-x-3.5 pr-3.5">
                {[
                  "/imgs/6.webp",
                  "/imgs/7.webp",
                  "/imgs/8.webp",
                  "/imgs/9.webp",
                  "/imgs/10.webp"
                ].map((imgUrl, i) => (
                  <div key={`row2-${i}`} className="w-[180px] aspect-square bg-[#FAEFE4] border border-brand-brown/10 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                    <img 
                      src={imgUrl} 
                      alt="Sabores Clássicos" 
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </div>
                ))}
                {/* Duplicate row for looping effect */}
                {[
                  "/imgs/6.webp",
                  "/imgs/7.webp",
                  "/imgs/8.webp",
                  "/imgs/9.webp",
                  "/imgs/10.webp"
                ].map((imgUrl, i) => (
                  <div key={`row2-dup-${i}`} className="w-[180px] aspect-square bg-[#FAEFE4] border border-brand-brown/10 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                    <img 
                      src={imgUrl} 
                      alt="Sabores Clássicos" 
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 3. BLOCO DE LUCRO (ESTILO CARD CENTRAL COM CALCULADORA INTERATIVA) */}
        <section className="px-5 md:px-8 py-8 md:py-14 bg-[#F5F1EA]">
          <div className="bg-[#FAEFE4] border border-brand-brown/15 rounded-2xl p-4.5 md:p-8 text-center space-y-4.5 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-brand-brown tracking-wider font-bold uppercase bg-brand-yellow/30 rounded-full px-3 py-1 inline-block">
              Simulador de Ganhos Reais
            </span>

            <div className="space-y-1">
              <h4 className="text-3xl font-serif font-extrabold text-brand-brown">
                R$ 45 de lucro
              </h4>
              <p className="text-sm text-brand-brown/80 font-medium font-serif italic">
                por unidade vendida na sua região
              </p>
            </div>

            {/* High fidelity financial mini blocks as requested */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="bg-white/75 rounded-xl p-2 border border-brand-brown/10">
                <p className="text-[10px] text-brand-brown/60 font-mono tracking-wider uppercase">Venda</p>
                <p className="text-sm font-mono font-bold text-brand-brown">R$ 60,00</p>
              </div>
              <div className="bg-white/75 rounded-xl p-2 border border-brand-brown/10">
                <p className="text-[10px] text-brand-brown/60 font-mono tracking-wider uppercase">Custo</p>
                <p className="text-sm font-mono font-bold text-stone-600">R$ 15,00</p>
              </div>
              <div className="bg-brand-brown text-brand-yellow rounded-xl p-2 shadow-sm">
                <p className="text-[10px] text-brand-yellow/70 font-mono tracking-wider uppercase">Lucro</p>
                <p className="text-sm font-mono font-bold">R$ 45,00</p>
              </div>
            </div>

            {/* Slider interactive element */}
            <div className="space-y-2.5 pt-2.5 border-t border-brand-brown/10">
              <div className="flex justify-between items-center px-1">
                <span className="text-xs text-brand-brown/95 font-semibold font-sans">
                  Quantidade vendida por dia:
                </span>
                <span className="bg-brand-brown text-brand-yellow text-xs font-mono font-bold py-0.5 px-2 rounded-full">
                  {dailySales} {dailySales === 1 ? "unidade" : "unidades"}
                </span>
              </div>

              <input 
                type="range" 
                min="1" 
                max="30" 
                value={dailySales} 
                onChange={(e) => setDailySales(Number(e.target.value))}
                className="w-full h-1 bg-brand-brown/10 rounded-lg appearance-none cursor-pointer accent-brand-brown"
              />

              <div className="bg-white/45 rounded-xl p-2.5 text-left space-y-1.5 mt-1.5 border border-brand-brown/5">
                <div className="flex justify-between text-xs text-brand-brown/90">
                  <span className="font-light">Faturamento Diário Líquido:</span>
                  <span className="font-mono font-bold">R$ {dailyProfit},00</span>
                </div>
                <div className="flex justify-between text-xs text-brand-brown/90">
                  <span className="font-light">Faturamento Semanal Líquido:</span>
                  <span className="font-mono font-bold">R$ {weeklyProfit},00</span>
                </div>
                <div className="flex justify-between text-sm text-brand-brown pt-1.5 border-t border-brand-brown/10">
                  <strong className="font-serif">Renda Mensal Estimada:</strong>
                  <strong className="font-mono text-brand-brown-light text-base">R$ {monthlyProfit},00</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CTA */}
        <section className="px-5 pb-12 bg-[#F5F1EA] text-center">
          <button 
            onClick={scrollToOffer}
            className="w-full bg-brand-yellow hover:bg-brand-yellow/95 font-sans font-bold text-brand-brown py-4.5 px-6 rounded-full tracking-wider hover:opacity-95 shadow-[0_4px_12px_rgba(244,201,93,0.3)] transition-all transform active:scale-98 text-base"
          >
            QUERO COMEÇAR AGORA
          </button>
          <div className="flex items-center justify-center space-x-1.5 text-stone-500 font-mono text-xs mt-2.5">
            <Lock className="w-3 h-3 text-brand-brown/40" />
            <span>Pagamento Seguro SSL de ponta a ponta</span>
          </div>
        </section>

        {/* 5. PROVA SOCIAL (IMAGENS) */}
        <section className="py-12 bg-zinc-50 border-y border-brand-beige-dark/60 text-center space-y-6">
          <div className="space-y-1">
            <span className="text-sm font-mono text-brand-brown/70 tracking-wider uppercase font-semibold">Sucesso Certificado</span>
            <h3 className="text-xl font-serif font-bold text-brand-brown">
              Resultados de quem faz acontecer
            </h3>
            <p className="text-xs text-brand-brown/85 max-w-xs mx-auto px-4 leading-relaxed font-light">
              Fotos enviadas pelas nossas alunas mostrando suas embalagens finais e fornadas lucrativas.
            </p>
          </div>

          {/* Interactive Testimonial Slider */}
          <div className="relative w-full max-w-[440px] mx-auto px-4 py-2 space-y-4">
            <div className="relative w-full flex items-center justify-center">
              <img 
                src={depoimentoImages[currentDepoimento]} 
                alt="Resultado Aluna" 
                className="w-full h-auto rounded-2xl select-none"
              />

              {/* Left Arrow */}
              <button 
                onClick={() => setCurrentDepoimento((prev) => (prev === 0 ? depoimentoImages.length - 1 : prev - 1))}
                className="absolute -left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-brand-brown/90 hover:bg-brand-brown text-white flex items-center justify-center shadow-lg transition-all cursor-pointer active:scale-90 z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Right Arrow */}
              <button 
                onClick={() => setCurrentDepoimento((prev) => (prev === depoimentoImages.length - 1 ? 0 : prev + 1))}
                className="absolute -right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-brand-brown/90 hover:bg-brand-brown text-white flex items-center justify-center shadow-lg transition-all cursor-pointer active:scale-90 z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center space-x-2 pt-1">
              {depoimentoImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentDepoimento(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    currentDepoimento === idx ? "bg-brand-brown w-6" : "bg-brand-brown/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 6. ÁREA DE MEMBROS (ENTREGA DE MATERIAIS) */}
        <section className="px-5 py-12 bg-[#F5F1EA] text-center space-y-6">
          <div className="space-y-1">
            <span className="text-sm font-mono text-brand-brown/70 tracking-wider uppercase font-semibold">Tiro Certeiro</span>
            <h3 className="text-xl font-serif font-bold text-brand-brown">
              Materiais & Apostilas Digitais
            </h3>
            <p className="text-xs text-brand-brown/80 leading-relaxed font-light">
              Baixe e acesse tudo direto do seu smartphone, tablet ou computador. Os manuais contam com receitas detalhadas passo a passo, prontas para imprimir ou consultar na cozinha.
            </p>
          </div>

          <div className="bg-black rounded-[32px] p-0 w-[363px] h-[704px] max-w-full mx-auto overflow-hidden drop-shadow-xl relative border-2 border-zinc-800">
            {demoImages.map((imgSrc, idx) => (
              <img 
                key={idx}
                src={imgSrc} 
                alt={`Demonstração Área de Membros ${idx + 1}`} 
                className={`absolute inset-0 w-full h-full object-cover rounded-[30px] transition-all duration-700 ease-in-out ${
                  idx === activeDemoIdx ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0"
                }`}
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
        </section>

        {/* 7. MÉTODO IN 3 ETAPAS */}
        <section className="px-5 py-12 bg-brand-beige-dark/50 border-y border-brand-beige-dark/80 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-sm font-mono text-brand-brown/80 tracking-wider uppercase font-semibold font-bold">Dominando a Prática</span>
            <h3 className="text-xl font-serif font-bold text-brand-brown">
              O Método em 3 Etapas
            </h3>
          </div>

          {/* Stacked Cards for Mobile Layout as requested */}
          <div className="space-y-4">
            {methods.map((method, idx) => (
              <div 
                key={idx}
                className="bg-white border border-brand-beige-dark rounded-2xl p-5 shadow-sm hover:border-brand-brown/30 transition-all flex flex-col space-y-3"
              >
                <div className="w-8 h-8 rounded-full bg-brand-brown text-white font-mono font-bold text-sm flex items-center justify-center shadow-md">
                  0{idx + 1}
                </div>
                <h4 className="text-sm font-serif font-bold text-brand-brown leading-snug">
                  {method.title}
                </h4>
                <p className="text-xs text-brand-brown leading-relaxed font-normal">
                  {method.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. COMO FUNCIONA */}
        <section className="px-5 py-12 bg-[#F5F1EA] space-y-7">
          <div className="text-center space-y-1">
            <span className="text-sm font-mono text-brand-brown/70 tracking-wider uppercase font-semibold">Simples & Prático</span>
            <h3 className="text-xl font-serif font-bold text-brand-brown">
              Como Funciona?
            </h3>
            <p className="text-xs text-brand-brown/85 font-light max-w-xs mx-auto">
              Três passos simples que separam você de faturar com o seu primeiro hambúrguer de bolo doce premium.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-brown flex items-center justify-center text-brand-yellow font-mono text-sm font-bold">
                  {step.number}
                </div>
                <div className="space-y-1 my-0.5">
                  <h4 className="text-sm font-bold text-brand-brown tracking-tight">
                    {step.title}
                  </h4>
                  <p className="text-xs text-brand-brown/80 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. AUTORIDADE */}
        <section className="px-5 py-10 bg-zinc-50 border-y border-brand-beige-dark/60">
          <div className="bg-[#FAEFE4] border border-brand-yellow-light/60 rounded-2xl p-4 flex items-center space-x-3.5">
            <div className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden border-2 border-brand-brown/10 bg-white shadow-inner animate-soft-pulse">
              <img 
                src="/imgs/expert.jpg" 
                alt="Chef Patrícia Albuquerque" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-mono tracking-wider uppercase text-brand-brown/70 font-semibold">Sua Instrutora</p>
              <h4 className="text-sm font-serif font-bold text-brand-brown">
                Patrícia Albuquerque
              </h4>
              <p className="text-[11px] text-brand-brown/90 leading-relaxed font-light">
                Chef Confeiteira há mais de 12 anos. Idealizou o X-Bolo Lucrativo e já capacitou mais de 2.000 pessoas a começarem seus negócios.
              </p>
            </div>
          </div>
        </section>

        {/* 10. O QUE VOCÊ VAI RECEBER (MARROM ESCURO - ÚNICA SEÇÃO ESCURA DA PÁGINA) */}
        <section className="px-5 py-12 bg-brand-brown text-white space-y-7">
          <div className="text-center space-y-1">
            <span className="text-sm font-mono text-brand-yellow tracking-wider uppercase font-semibold">Tudo Incluso</span>
            <h3 className="text-xl font-serif font-bold text-white">
              O Que Você Vai Receber
            </h3>
            <p className="text-xs text-white/80 max-w-xs mx-auto leading-relaxed font-light">
              Acesso irrestrito a todo o conteúdo do curso e bônus especiais.
            </p>
          </div>

          <div className="space-y-5">
            {whatYouWillReceive.map((mod, index) => (
              <div 
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 hover:bg-white/10 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-serif font-bold text-brand-yellow tracking-tight max-w-[200px]">
                    {mod.title}
                  </h4>
                  <span className="text-xs font-mono bg-white/15 px-2 py-0.5 rounded text-white/90">
                    {mod.duration}
                  </span>
                </div>
                <p className="text-xs text-white/80 font-light leading-relaxed">
                  {mod.description}
                </p>
                <ul className="space-y-1.5 pt-1.5 border-t border-white/5">
                  {mod.items.map((item, innerIdx) => (
                    <li key={innerIdx} className="flex items-start text-xs text-white/90 leading-tight">
                      <Check className="w-3 h-3 text-brand-yellow mr-1.5 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 11. DEPOIMENTOS (CARDS SIMPLES COM ESTILO CLEAN) */}
        <section className="px-5 py-12 bg-zinc-50 border-b border-brand-beige-dark/60 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-sm font-mono text-brand-brown/70 tracking-wider uppercase font-semibold">Falam Por Nós</span>
            <h3 className="text-xl font-serif font-bold text-brand-brown">
              Histórias de Sucesso
            </h3>
          </div>

          <div className="space-y-4">
            {testimonials.map((test, idx) => (
              <div 
                key={idx}
                className="bg-white border border-brand-beige-dark/40 rounded-2xl p-5 space-y-3.5 shadow-sm hover:border-brand-brown/20 transition-all text-left"
              >
                <div className="flex items-center space-x-3">
                  <img 
                    src={test.avatar} 
                    alt={test.name} 
                    className="w-10 h-10 rounded-full object-cover border border-brand-brown/10"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm col font-bold text-brand-brown leading-tight">
                      {test.name}
                    </h4>
                    <p className="text-xs text-brand-brown/60 font-mono">
                      {test.role} • {test.location}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-0.5">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-brand-yellow text-brand-yellow" />
                  ))}
                </div>

                <p className="text-xs text-brand-brown/85 leading-relaxed font-light italic">
                  "{test.comment}"
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 11.5 SEÇÃO EXCLUSIVA DE BÔNUS */}
        <section className="px-5 py-12 bg-brand-brown text-white text-center space-y-8 border-y border-brand-yellow/20">
          <div className="space-y-2 max-w-xs mx-auto">
            <span className="bg-brand-yellow text-brand-brown text-[10px] font-mono font-black py-1 px-3 rounded-full uppercase tracking-widest inline-block">
              Presente Especial
            </span>
            <h3 className="text-2xl font-serif font-black text-brand-yellow">
              Bônus Exclusivos Inclusos
            </h3>
            <p className="text-xs text-white/80 leading-relaxed font-light">
              Garantindo sua vaga hoje, você leva todos esses materiais adicionais de graça (Economia de R$ 67,00)
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 max-w-[390px] mx-auto text-left">
            {[
              { 
                title: "+10 Modelos de Posts Prontos", 
                desc: "Arquivos prontos para você postar e atrair encomendas instantâneas nas redes sociais.", 
                icon: Sparkles 
              },
              { 
                title: "Ferramenta: Calculadora de Custos", 
                desc: "Um aplicativo interativo dentro da área de membros para calcular custos e lucro exato automaticamente.", 
                icon: DollarSign 
              },
              { 
                title: "Guia de Embalagens Lucrativas", 
                desc: "Como montar uma apresentação premium de hambúrguer doce que valoriza o produto.", 
                icon: ShoppingBag 
              },
              { 
                title: "Design Comercial e Etiquetas", 
                desc: "Etiquetas profissionais para imprimir em casa e colar nas suas caixas.", 
                icon: Smartphone 
              },
              { 
                title: "Apostila com 15 Recheios Extras", 
                desc: "Receitas secretas adicionais de trufas e cremes para diversificar seu cardápio.", 
                icon: Users 
              },
              { 
                title: "Certificado de Conclusão", 
                desc: "Documento assinado digitalmente comprovando sua especialização no método.", 
                icon: Award 
              }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start space-x-3.5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-yellow text-brand-brown flex items-center justify-center flex-shrink-0 shadow-md">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-sans font-black text-brand-yellow leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-white/80 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bonus Value Summary Box */}
          <div className="max-w-[390px] mx-auto bg-brand-yellow text-brand-brown rounded-3xl p-5 space-y-3.5 shadow-[0_8px_24px_rgba(244,201,93,0.25)] border border-brand-yellow/35 animate-soft-pulse mt-8">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-black tracking-widest uppercase bg-brand-brown text-brand-yellow py-0.5 px-2.5 rounded-full inline-block">
                Resumo dos Presentes
              </span>
              <h4 className="text-lg font-serif font-black">
                Somando tudo o que você vai levar:
              </h4>
            </div>

            <div className="space-y-2 text-xs font-medium border-y border-brand-brown/15 py-3">
              <div className="flex justify-between">
                <span>6 Bônus Exclusivos Inclusos:</span>
                <span className="line-through text-brand-brown/65">R$ 297,00</span>
              </div>
              <div className="flex justify-between">
                <span>Certificado Especial de Conclusão:</span>
                <span className="line-through text-brand-brown/65">R$ 85,00</span>
              </div>
              <div className="flex justify-between text-sm font-black pt-1">
                <span>VALOR TOTAL SOMA:</span>
                <span className="bg-brand-brown text-brand-yellow px-2 py-0.5 rounded font-mono">R$ 382,00</span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-xs font-mono font-black text-brand-brown block">
                MAS HOJE TUDO SAIRÁ POR:
              </span>
              <strong className="text-2xl font-sans font-black text-red-700 tracking-tight block mt-0.5 animate-bounce">
                R$ 0,00 (GRÁTIS)
              </strong>
            </div>
          </div>
        </section>

        {/* 12. PLANOS DE ACESSO (O MAIS ESCOLHIDO) */}
        <section id="oferta-principal" className="px-5 py-12 bg-[#F5F1EA] text-center">
          
          {/* Cronômetro de Oferta Limitada estilo da imagem com o design do projeto */}
          <div className="max-w-[390px] mx-auto mb-16 space-y-3.5 text-center">
            <span className="text-xs font-mono font-black tracking-widest text-[#6E3F30] uppercase block">
              ESCOLHA O SEU PLANO
            </span>
            <h3 className="text-xl font-serif font-black text-brand-brown leading-tight">
              Escolha o Melhor Plano <span className="text-brand-brown-light italic underline decoration-brand-yellow decoration-2">Para Você!</span>
            </h3>
            
            <div className="flex items-center justify-center space-x-1.5 text-xs font-mono font-bold text-brand-brown/80 tracking-wide uppercase">
              <span>⏳</span>
              <span>OFERTA LIMITADA — TERMINA EM:</span>
            </div>

            <div className="flex items-center justify-center space-x-2 pt-1">
              {/* Horas */}
              <div className="flex flex-col items-center">
                <div className="w-[72px] h-[72px] bg-brand-brown text-brand-yellow border border-[#6E3F30]/30 rounded-2xl flex flex-col items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <span className="text-2xl font-black font-mono tracking-tight leading-none text-brand-yellow">
                    {formatOfferTime(offerHours)}
                  </span>
                  <span className="text-[10px] font-mono tracking-wider text-white/80 font-bold uppercase mt-1">
                    Horas
                  </span>
                </div>
              </div>

              {/* Colon */}
              <div className="text-xl font-mono font-black text-brand-brown animate-pulse leading-none flex items-center justify-center px-0.5">
                :
              </div>

              {/* Minutos */}
              <div className="flex flex-col items-center">
                <div className="w-[72px] h-[72px] bg-brand-brown text-brand-yellow border border-[#6E3F30]/30 rounded-2xl flex flex-col items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <span className="text-2xl font-black font-mono tracking-tight leading-none text-brand-yellow">
                    {formatOfferTime(offerMinutes)}
                  </span>
                  <span className="text-[10px] font-mono tracking-wider text-white/80 font-bold uppercase mt-1">
                    Minutos
                  </span>
                </div>
              </div>

              {/* Colon */}
              <div className="text-xl font-mono font-black text-brand-brown animate-pulse leading-none flex items-center justify-center px-0.5">
                :
              </div>

              {/* Segundos */}
              <div className="flex flex-col items-center">
                <div className="w-[72px] h-[72px] bg-brand-brown text-brand-yellow border border-[#6E3F30]/30 rounded-2xl flex flex-col items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <span className="text-2xl font-black font-mono tracking-tight leading-none text-brand-yellow">
                    {formatOfferTime(offerSeconds)}
                  </span>
                  <span className="text-[10px] font-mono tracking-wider text-white/80 font-bold uppercase mt-1">
                    Segundos
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative bg-white border-[2.5px] border-brand-brown rounded-[32px] p-6 text-left space-y-6 shadow-xl max-w-[390px] mx-auto mt-6">
            
            {/* Pop-up Badge */}
            <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-brand-brown text-brand-yellow text-xs font-sans font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md flex items-center space-x-1 whitespace-nowrap">
              <span>★</span> <span>PLANO ÚNICO</span>
            </div>

            {/* Plan Info */}
            <div className="text-center pt-2 space-y-1">
              <h4 className="text-xl font-sans font-black text-brand-brown tracking-tight">
                Pacote Completo
              </h4>
              
              <div className="flex flex-col items-center justify-center -space-y-0.5">
                <span className="text-xs text-brand-brown/50 line-through font-sans font-medium">
                  R$ 97,90
                </span>
                <span className="text-3xl font-sans font-black text-brand-brown leading-none tracking-tight">
                  R$ 37,90
                </span>
                <span className="text-xs text-brand-brown/70 font-bold font-sans">
                  Pagamento único
                </span>
              </div>

              <div className="bg-brand-yellow/20 text-brand-brown border border-brand-brown/10 text-xs font-bold px-3.5 py-1 rounded-full inline-block mt-2 uppercase tracking-wide">
                🔥 ECONOMIZE R$ 60,00
              </div>
            </div>

            {/* Demonstrativo image */}
            <div className="flex items-center justify-center w-full">
              <img
                src="/imgs/demonstrativo.png"
                alt="Demonstrativo do Material"
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>

            {/* Checklist of Benefits - matches the user's list layout but adapts to cookie / burger course */}
            <div className="space-y-3 pt-1">
              {[
                "Acesso Imediato e Vitalício a Área de Membros",
                "Bônus Exclusivos abaixo",
                "Atualizações semanais com novos materiais",
                "Suporte 24h para qualquer dúvida",
                "Pagamento Único"
              ].map((benefit, i) => (
                <div key={i} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-brown flex-shrink-0 mt-0.5" />
                  <span className="text-xs font-sans font-bold text-brand-brown/95 leading-tight">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Dashed Bonus Container */}
            <div className="bg-[#EAE1D4] border border-dashed border-brand-brown/50 rounded-[22px] p-3.5 space-y-2.5">
              <span className="text-xs font-sans font-black text-brand-brown tracking-wide block uppercase text-center">
                🎁 BÔNUS EXCLUSIVOS (VALOR: R$ 382,00 POR R$ 0,00):
              </span>
              
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { text: "+10 Modelos de Posts Prontos", icon: Sparkles },
                  { text: "Calculadora de Custos (App Integrado)", icon: DollarSign },
                  { text: "Guia Completo de Embalagens Lucrativas", icon: ShoppingBag },
                  { text: "Design Comercial e Etiquetas Prontas", icon: Smartphone },
                  { text: "Apostila Especial com 15 Recheios Extras", icon: Users },
                  { text: "Certificado de Conclusão Incluso", icon: Award }
                ].map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div 
                      key={idx} 
                      className="bg-white border border-brand-beige-dark hover:border-brand-yellow/40 rounded-xl py-1.5 px-2.5 flex items-center space-x-2.5 shadow-xs transition-colors"
                    >
                      <div className="w-5.5 h-5.5 rounded-full bg-brand-yellow/20 flex items-center justify-center flex-shrink-0 text-brand-brown">
                        <IconComp className="w-3 h-3" />
                      </div>
                      <span className="text-xs font-sans font-extrabold text-brand-brown tracking-tight leading-tight">
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Guarantee badge image */}
            <div className="flex items-center justify-center py-3">
              <img 
                src="/imgs/garantia.png" 
                alt="Gelo de Garantia" 
                className="w-full max-w-[320px] h-auto object-contain drop-shadow-md"
              />
            </div>

            {/* Core Action Button */}
            <div className="pt-2">
              <button 
                onClick={handleCheckoutRedirect}
                className="w-full bg-brand-yellow hover:bg-brand-yellow/95 font-sans font-black text-brand-brown py-4.5 px-6 rounded-2xl tracking-wider hover:opacity-95 shadow-[0_4px_12px_rgba(244,201,93,0.3)] transition-all transform active:scale-98 text-sm text-center flex items-center justify-center space-x-2 cursor-pointer animate-soft-pulse"
              >
                <span>Quero o Pacote Completo</span>
                <ArrowRight className="w-4 h-4 text-brand-brown" />
              </button>
              
              <div className="flex items-center justify-center space-x-1.5 text-brand-brown/50 font-sans text-xs mt-3">
                <Lock className="w-3.5 h-3.5 text-brand-brown/40" />
                <span>Pagamento 100% seguro</span>
              </div>
            </div>

          </div>
        </section>
        {/* 14. GARANTIA */}
        <section className="px-5 py-10 bg-white border-y border-brand-beige-dark/60 text-center space-y-3.5">
          <div className="mx-auto w-[130px] max-w-full flex items-center justify-center -mb-2">
            <img 
              src="https://i.ibb.co/Y7PCFHDT/image.png" 
              alt="Garantia Incondicional de 30 Dias" 
              className="w-full h-auto object-contain drop-shadow-md"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-1 pt-1">
            <span className="text-[10px] font-mono font-black tracking-widest text-brand-brown-light uppercase block">
              Garantia Incondicional
            </span>
            <h4 className="text-2xl font-serif font-black italic text-brand-brown leading-tight">
              Sua Satisfação é Prioridade
            </h4>
          </div>

          <p className="text-base text-brand-brown/85 leading-relaxed font-light px-5 max-w-[350px] mx-auto">
            Se em até 30 dias você não amar a experiência com o material, <span className="font-bold underline decoration-brand-yellow decoration-3 underline-offset-4 text-brand-brown">devolvemos 100% do seu dinheiro</span>. Sem perguntas, sem burocracia.
          </p>
        </section>

        {/* 15. FAQ (LISTA LIMPA ESTILO ACORDEÃO SIMPLES) */}
        <section className="px-5 py-12 bg-[#F5F1EA] space-y-6">
          <div className="text-center space-y-1">
            <span className="text-sm font-mono text-brand-brown/60 tracking-wider uppercase font-semibold">Tire suas dúvidas</span>
            <h3 className="text-xl font-serif font-bold text-brand-brown">
              Perguntas Frequentes
            </h3>
          </div>

          <div className="space-y-3.5">
            {faqItems.map((item, idx) => {
              const isOpen = openFAQIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-brand-beige-dark/60 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between text-brand-brown bg-white hover:bg-zinc-50/50 transition-colors focus:outline-none"
                  >
                    <span className="text-base font-bold leading-snug pr-2">
                      {item.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-brand-brown/60 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-brand-brown/60 flex-shrink-0" />
                    )}
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1.5 text-base text-brand-brown/75 leading-relaxed font-light border-t border-brand-beige-dark/30 bg-zinc-50/30">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 16. CTA FINAL (FUNDO MARROM ESCURO) */}
        <section className="px-5 py-14 bg-brand-brown text-white text-center space-y-7 relative overflow-hidden">
          {/* subtle gold decorative blur circles */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-yellow/10 rounded-full blur-2xl"></div>

          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-brand-yellow uppercase font-bold">Início Já</span>
            <h3 className="text-xl font-serif font-bold tracking-tight text-white leading-tight">
              Transforme isso em renda
            </h3>
            <p className="text-xs text-white/70 max-w-xs mx-auto leading-relaxed font-light">
              Não deixe para depois a chance de sair na frente in uma novidade que já virou febre nas grandes confeitarias.
            </p>
          </div>

          <button 
            onClick={scrollToOffer}
            className="w-full bg-brand-yellow hover:bg-brand-yellow/95 font-sans font-bold text-brand-brown py-4.5 px-6 rounded-full tracking-wider hover:opacity-95 shadow-lg transition-all transform active:scale-98 text-base"
          >
            QUERO COMEÇAR AGORA
          </button>

          <footer className="pt-4 border-t border-white/15 space-y-2">
            <p className="text-xs text-white/50 font-mono uppercase tracking-wider">
              © 2026 X-Bolo Lucrativo • Todos os direitos reservados.
            </p>
            <p className="text-[11px] text-white/45 max-w-xs mx-auto font-light leading-normal">
              Aviso Legal: Os resultados financeiros simulados variam de acordo com dedicação individual e fatores regionais de mercado.
            </p>
          </footer>
        </section>

        </div> {/* Close Scroll Container */}

        {/* Floating Bottom Navigation Bar */}
        <div 
          className={`fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[408px] z-40 bg-[#FBF9F6]/50 backdrop-blur-md border-2 border-brand-brown/60 rounded-[22px] px-3.5 py-1.5 flex items-center justify-between transition-all duration-300 shadow-[0_12px_32px_rgba(78,42,30,0.22)] ${
            showStickyNav ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        >
          <div className="flex items-center">
            <img 
              src="https://i.ibb.co/QvybJJJH/image.png" 
              alt="Logo" 
              className="h-[180px] w-auto object-contain -my-17 relative top-1.5 drop-shadow-md select-none transform hover:scale-105 transition-transform origin-left"
              referrerPolicy="no-referrer"
            />
          </div>
          <button 
            onClick={scrollToOffer}
            className="bg-brand-yellow hover:bg-brand-yellow/95 text-brand-brown font-sans font-black text-xs py-2.5 px-4.5 rounded-xl uppercase tracking-wider transition-all transform active:scale-95 shadow-md flex items-center space-x-1.5 cursor-pointer"
          >
            <span>Começar Agora</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-brown" />
          </button>
        </div>

      </div>
    </div>
  );
}
