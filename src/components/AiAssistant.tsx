"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: { label: string; action: string }[];
  productCard?: {
    name: string;
    price: string;
    image: string;
    link: string;
  };
}

const initialMessages: Message[] = [
  {
    id: "m-1",
    sender: "bot",
    text: "Bonjour & Welcome to Lumière Atelier. I am your virtual diamond concierge. How may I assist you with our handcrafted fine jewelry today?",
    options: [
      { label: "💎 Help me choose an Engagement Ring", action: "engagement" },
      { label: "📏 How do I measure my Ring Size?", action: "size" },
      { label: "🌿 Recycled Gold & Ethical Diamonds", action: "sustainability" },
      { label: "📦 Track my order (ECK-2024-8849)", action: "track" },
    ],
  },
];

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      let botResponse: Message;
      const lower = text.toLowerCase();

      if (lower.includes("engagement") || lower.includes("ring") || lower.includes("solitaire")) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: "bot",
          text: "Our signature engagement collection features conflict-free ethical diamonds set in 100% recycled 18k solid gold. Our most cherished piece is the Lumière Solitaire Diamond Ring — a timeless four-prong setting designed to maximize diamond brilliance.",
          productCard: {
            name: "Lumière Solitaire Diamond Ring",
            price: "₹85,000",
            image: "/images/hero-ring.jpg",
            link: "/product/lumiere-solitaire-diamond-ring",
          },
          options: [
            { label: "View Solitaire Ring", action: "view_solitaire" },
            { label: "Explore All Engagement Rings", action: "view_all_rings" },
            { label: "Ask about Custom Design", action: "custom" },
          ],
        };
      } else if (lower.includes("size") || lower.includes("measurement")) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: "bot",
          text: "Finding your exact ring size is essential for a comfortable, secure fit. We provide a complimentary printable ring sizer, and we also offer one complimentary re-sizing within 60 days of purchase! If you are planning a surprise proposal, our gemologists can guide you based on hand measurements or an existing ring.",
          options: [
            { label: "Open Ring Size Guide", action: "size_guide" },
            { label: "Book Showroom Sizing Session", action: "book_session" },
          ],
        };
      } else if (lower.includes("sustainability") || lower.includes("gold") || lower.includes("diamond") || lower.includes("recycled")) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: "bot",
          text: "Every piece of Lumière jewelry is crafted in our zero-waste atelier using 100% certified recycled 14k & 18k gold. Our diamonds are either ethically sourced conflict-free natural gems or lab-grown diamonds with identical physical, chemical, and optical properties certified by IGI and GIA.",
          options: [
            { label: "Explore Our Craftsmanship", action: "craftsmanship" },
            { label: "Browse Wedding Bands", action: "wedding_bands" },
          ],
        };
      } else if (lower.includes("track") || lower.includes("shipping") || lower.includes("eck-2024")) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: "bot",
          text: "Order ECK-2024-8849 is currently In Transit with BlueDart Secure Air Express (AWB: BD-882910482IN). Your package has cleared hallmarking quality control and is on schedule for delivery within 3 business days. You can monitor live milestone updates in your Customer Account.",
          options: [
            { label: "View in Customer Account", action: "open_account" },
          ],
        };
      } else {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: "bot",
          text: "I would be delighted to assist you with that! Whether you are exploring our bespoke bridal creations, checking dispatch timelines, or arranging a private consultation, our master artisans are at your service.",
          options: [
            { label: "💎 Browse Engagement Rings", action: "view_all_rings" },
            { label: "📦 Live Order Tracking", action: "track" },
            { label: "💬 Speak to a Gemologist", action: "consult" },
          ],
        };
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, botResponse]);
    }, 700);
  };

  const handleOptionClick = (option: { label: string; action: string }) => {
    if (option.action === "view_solitaire") {
      window.location.href = "/product/lumiere-solitaire-diamond-ring";
    } else if (option.action === "view_all_rings") {
      window.location.href = "/collections/engagement-rings";
    } else if (option.action === "wedding_bands") {
      window.location.href = "/collections/wedding-bands";
    } else if (option.action === "open_account") {
      window.location.href = "/account";
    } else if (option.action === "size_guide") {
      window.location.href = "/ring-size-guide";
    } else {
      handleSend(option.label);
    }
  };

  return (
    <>
      {/* Floating launcher badge */}
      <div
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 999,
        }}
      >
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Diamond Concierge"
            style={{
              background: "var(--clr-bg-dark)",
              color: "var(--clr-gold)",
              border: "1.5px solid var(--clr-gold)",
              borderRadius: "100px",
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
              transition: "transform 200ms ease, box-shadow 200ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <span style={{ fontSize: "16px" }}>💎</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#fff", letterSpacing: "0.02em" }}>
                AI Diamond Concierge
              </div>
              <div style={{ fontSize: "10px", color: "var(--clr-gold)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Ask anything • 24/7
              </div>
            </div>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#4ade80",
                display: "inline-block",
                marginLeft: "4px",
              }}
            />
          </button>
        )}
      </div>

      {/* Slide-in Concierge Drawer */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "28px",
            right: "28px",
            width: "380px",
            maxWidth: "calc(100vw - 32px)",
            height: "560px",
            maxHeight: "calc(100vh - 80px)",
            background: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            border: "1px solid var(--clr-border)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
            overflow: "hidden",
            animation: "drawerSlideUp 250ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "var(--clr-bg-dark)",
              color: "#fff",
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(182, 157, 116, 0.2)",
                  border: "1px solid var(--clr-gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                }}
              >
                💎
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.03em" }}>
                  Lumière Atelier AI
                </div>
                <div style={{ fontSize: "11px", color: "var(--clr-gold)", display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                  Online • Master Gemologist AI
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "18px",
                cursor: "pointer",
                padding: "4px",
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              background: "var(--clr-bg)",
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: m.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "85%",
                    padding: "12px 16px",
                    borderRadius: m.sender === "user" ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                    background: m.sender === "user" ? "var(--clr-text)" : "#ffffff",
                    color: m.sender === "user" ? "#ffffff" : "var(--clr-text)",
                    fontSize: "13px",
                    lineHeight: 1.5,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    border: m.sender === "bot" ? "1px solid var(--clr-border-light)" : "none",
                  }}
                >
                  {m.text}
                </div>

                {/* Product Card embed */}
                {m.productCard && (
                  <div
                    style={{
                      marginTop: "10px",
                      background: "#fff",
                      border: "1px solid var(--clr-border)",
                      borderRadius: "10px",
                      padding: "12px",
                      maxWidth: "85%",
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: "48px", height: "48px", position: "relative", borderRadius: "6px", overflow: "hidden", background: "var(--clr-bg-alt)", flexShrink: 0 }}>
                      <img src={m.productCard.image} alt={m.productCard.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "12px", fontWeight: 600, lineHeight: 1.3 }}>{m.productCard.name}</div>
                      <div style={{ fontSize: "12px", color: "var(--clr-accent)", fontWeight: 600, marginTop: "2px" }}>{m.productCard.price}</div>
                    </div>
                    <Link
                      href={m.productCard.link}
                      style={{
                        padding: "6px 12px",
                        background: "var(--clr-bg-dark)",
                        color: "#fff",
                        borderRadius: "4px",
                        fontSize: "11px",
                        textDecoration: "none",
                        fontWeight: 500,
                      }}
                    >
                      View
                    </Link>
                  </div>
                )}

                {/* Quick Option Pills */}
                {m.options && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "10px", maxWidth: "90%" }}>
                    {m.options.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleOptionClick(opt)}
                        style={{
                          background: "#fff",
                          border: "1px solid var(--clr-border)",
                          borderRadius: "100px",
                          padding: "6px 12px",
                          fontSize: "11px",
                          color: "var(--clr-text)",
                          cursor: "pointer",
                          transition: "all 150ms",
                          textAlign: "left",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--clr-accent)";
                          e.currentTarget.style.background = "#faf7f2";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--clr-border)";
                          e.currentTarget.style.background = "#fff";
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{ display: "flex", gap: "4px", padding: "8px 12px", background: "#fff", borderRadius: "100px", width: "fit-content", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--clr-accent)", animation: "conciergeBounce 1s infinite 0ms" }} />
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--clr-accent)", animation: "conciergeBounce 1s infinite 200ms" }} />
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--clr-accent)", animation: "conciergeBounce 1s infinite 400ms" }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              padding: "12px",
              background: "#ffffff",
              borderTop: "1px solid var(--clr-border)",
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              type="text"
              placeholder="Ask about diamonds, sizing, custom..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                flex: 1,
                padding: "10px 14px",
                border: "1px solid var(--clr-border)",
                borderRadius: "100px",
                fontSize: "13px",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: inputValue.trim() ? "var(--clr-accent)" : "#e8e4de",
                color: "#fff",
                border: "none",
                cursor: inputValue.trim() ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 150ms",
              }}
            >
              ➤
            </button>
          </form>
        </div>
      )}

      <style jsx global>{`
        @keyframes drawerSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes conciergeBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  );
}
