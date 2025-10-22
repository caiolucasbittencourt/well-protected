"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const criteria = [
  { id: "length", text: "8+ Characters" },
  { id: "lowercase", text: "Lowercase" },
  { id: "uppercase", text: "Uppercase" },
  { id: "number", text: "Number" },
  { id: "special", text: "Symbol" },
];

export default function Home() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState({
    score: 0,
    color: "bg-zinc-800",
    checks: {
      length: false,
      lowercase: false,
      uppercase: false,
      number: false,
      special: false,
    },
  });

  useEffect(() => {
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    const score = Object.values(checks).filter(Boolean).length;
    let color = "bg-red-500";

    switch (score) {
      case 0:
      case 1:
      case 2:
        color = "bg-red-500";
        break;
      case 3:
        color = "bg-orange-500";
        break;
      case 4:
        color = "bg-yellow-500";
        break;
      case 5:
        color = "bg-green-500";
        break;
      default:
        color = "bg-zinc-800";
    }

    if (password.length === 0) {
      color = "bg-zinc-800";
    }

    setStrength({ score, color, checks });
  }, [password]);

  return (
    <div
      className={`min-h-screen bg-black text-white flex items-center justify-center p-4 antialiased`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md text-center"
      >
        <div className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            className="peer w-full bg-transparent border-0 border-b-2 border-zinc-700 p-2 text-center text-2xl text-white focus:outline-none focus:ring-0 focus:border-gray-500 transition-colors"
          />
          <label className="absolute left-0 -top-6 text-zinc-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-gray-500 peer-focus:text-sm">
            Your Password
          </label>
        </div>

        <div className="h-1 w-full mt-2 rounded-full">
          <motion.div
            className={`h-full rounded-full ${strength.color}`}
            initial={{ width: 0 }}
            animate={{ width: `${strength.score * 20}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          {criteria.map((item) => {
            const isMet =
              strength.checks[item.id as keyof typeof strength.checks];
            return (
              <span
                key={item.id}
                className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${
                  isMet
                    ? "bg-green-500/20 text-green-300"
                    : "bg-zinc-800 text-zinc-500"
                }`}
              >
                {item.text}
              </span>
            );
          })}
        </div>

        <div className="mt-8 w-full text-left px-4">
          <ul className="list-disc list-inside space-y-2 text-zinc-400 text-sm">
            <li>Avoid personal info (names, birth dates) or common words.</li>
            <li>
              Use a unique password for each account. A password manager can
              help!
            </li>
            <li>Enable Two-Factor Authentication (2FA) whenever possible.</li>
          </ul>
        </div>

        <p className="text-zinc-700 text-xs mt-10">
          This check is performed entirely in your browser.
        </p>
      </motion.div>
    </div>
  );
}
