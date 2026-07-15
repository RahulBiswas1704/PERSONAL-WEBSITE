"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { X, Share2, Link2, Check, MessageCircle, Smartphone } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("Rahul Biswas - Portfolio");
  const [copied, setCopied] = useState(false);
  const [isNativeShareSupported, setIsNativeShareSupported] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    if (isOpen && typeof window !== "undefined") {
      setUrl(window.location.href);
      setTitle(document.title || "Rahul Biswas - Portfolio");
      if (typeof navigator !== 'undefined' && 'share' in navigator) {
        setIsNativeShareSupported(true);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: title,
        text: `Check this out: ${title}`,
        url: url,
      });
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  // Generate quirky messages based on the page
  const getQuirkyMessage = () => {
    if (pathname === '/sandbox') return "Get roasted by Kishmish, an unhinged AI, on Rahul Biswas's site! 🐈‍⬛🔥";
    if (pathname === '/resume') return "I just found the most over-engineered resume on the internet. You have to see this. 💼✨";
    if (pathname === '/projects') return "Warning: Highly aesthetic projects ahead. Check out Rahul Biswas's portfolio! 🚀💻";
    if (pathname === '/guestbook') return "I just vandalized Rahul Biswas's digital wall. Come leave your mark! 🎨🖋️";
    if (pathname === '/me') return "Diving into the mind of Rahul Biswas. This portfolio is built differently. 🧠✨";
    return "I just stumbled upon this interactive portfolio and it's insane. You have to experience this! 🤯🔥";
  };

  const shareText = encodeURIComponent(getQuirkyMessage());
  const shareUrl = encodeURIComponent(url);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl p-6 sm:p-8 animate-fade-in-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4 border border-accent/20">
            <Share2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-neutral-100">Share this page</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 font-medium max-w-[250px] truncate">
            {title}
          </p>
        </div>

        {/* QR Code Section */}
        <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl mb-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Scan to view</p>
          <div className="p-3 bg-white rounded-xl shadow-sm border border-neutral-200 transform group-hover:scale-105 transition-transform duration-300">
            <QRCodeSVG 
              value={url || "https://rahul-biswas.vercel.app"} 
              size={120}
              fgColor="#000000"
              bgColor="#ffffff"
              level="H"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button 
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-xl text-sm font-bold text-neutral-900 dark:text-neutral-100 transition-all border border-neutral-200 dark:border-neutral-800"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Link2 className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy Link"}
          </button>
          
          {isNativeShareSupported ? (
            <button 
              onClick={handleNativeShare}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-accent text-white rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-accent/20"
            >
              <Smartphone className="w-4 h-4" />
              Share Native
            </button>
          ) : (
            <a 
              href={`mailto:?subject=${shareText}&body=${shareUrl}`}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-accent text-white rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-accent/20"
            >
              <MessageCircle className="w-4 h-4" />
              Email Link
            </a>
          )}
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Or share to</span>
          <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
        </div>
        
        <div className="flex justify-center gap-3 mt-4">
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900 hover:bg-sky-100 hover:text-sky-500 dark:hover:bg-sky-900/30 dark:hover:text-sky-400 text-neutral-600 dark:text-neutral-400 transition-colors border border-neutral-200 dark:border-neutral-800 hover:border-sky-200 dark:hover:border-sky-800"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
            </svg>
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 text-neutral-600 dark:text-neutral-400 transition-colors border border-neutral-200 dark:border-neutral-800 hover:border-blue-200 dark:hover:border-blue-800"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900 hover:bg-emerald-100 hover:text-emerald-500 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400 text-neutral-600 dark:text-neutral-400 transition-colors border border-neutral-200 dark:border-neutral-800 hover:border-emerald-200 dark:hover:border-emerald-800"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
