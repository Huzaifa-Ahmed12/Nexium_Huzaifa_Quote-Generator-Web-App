"use client";

import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { Sun, Moon } from "lucide-react";

const quotes = [
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
  { text: "Don’t count the days, make the days count.", author: "Muhammad Ali" },
  { text: "Everything you’ve ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
  { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
  { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" },
  { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
  { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
  { text: "Try not to become a man of success. Rather become a man of value.", author: "Albert Einstein" },
  { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
];

export default function Home() {
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState<typeof quotes>([]);

  useEffect(() => {
    const savedQuote = localStorage.getItem("lastQuote");
    const savedTheme = localStorage.getItem("theme");
    if (savedQuote) {
      try {
        setQuote(JSON.parse(savedQuote));
      } catch {
        setQuote(quotes[0]);
      }
    }
    if (savedTheme === "dark") {
      setIsDark(true);
    }
  }, []);

  const getNewQuote = () => {
    const index = Math.floor(Math.random() * quotes.length);
    const newQuote = quotes[index];
    setQuote(newQuote);
    localStorage.setItem("lastQuote", JSON.stringify(newQuote));
    toast.success("New quote loaded!");
  };

  const copyToClipboard = () => {
    if (!quote) return;
    navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
    toast.success("Quote copied to clipboard!");
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const handleSearch = () => {
    const filtered = quotes.filter((q) =>
      q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQuotes(filtered);
    if (filtered.length === 0) toast.error("No matching quotes found!");
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col transition-colors duration-300 overflow-hidden ${
        isDark ? "text-white" : "text-gray-900"
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-pink-200 via-blue-100 to-yellow-100 dark:from-gray-800 dark:via-gray-900 dark:to-black bg-[length:400%_400%] animate-gradient blur-2xl opacity-50" />

      {/* Content */}
     <div className="relative z-10 flex flex-col flex-grow">

        {/* Header */}
       <header className="bg-gray-900 shadow-md py-4 px-4 text-left">
  <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
    My Custom Quote App
  </h1>
</header>



        {/* Main */}
        <main className="flex-grow flex items-center justify-center px-4 py-10">
          <div
            className={`${
              isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            } w-full max-w-2xl p-8 rounded-2xl shadow-xl text-center border`}
          >
            {quote && (
             <blockquote className="mb-6">
  <p className="text-2xl md:text-3xl font-bold text-black dark:text-black text-center">
    “{quote.text}”
  </p>
  <cite className="block mt-4 text-lg font-medium text-black dark:text-black text-center">
    — {quote.author}
  </cite>
</blockquote>

            )}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
       
<Button
  onClick={getNewQuote}
  className="bg-black hover:bg-gray-800 text-white"
>
  New Quote
</Button>

<Button
  onClick={copyToClipboard}
  className="bg-black hover:bg-gray-800 text-white"
>
  Copy
</Button>



            </div>

            <div className="mt-8">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by word or author..."
                className={`w-full px-4 py-2 rounded-md mt-2 mb-4 outline-none focus:ring-2 focus:ring-blue-400 ${
                  isDark
                    ? "bg-blue-900 text-white border-blue-600 placeholder-white"
                    : "bg-blue-100 text-black border-blue-300 placeholder-black"
                }`}
              />
      <Button
  onClick={handleSearch}
  className="bg-blue-600 hover:bg-blue-700 text-black w-full"
>
  Search
</Button>




            </div>

            {filteredQuotes.length > 0 && (
              <div className="mt-6 text-left space-y-4">
                <h3 className="text-xl font-semibold">Search Results:</h3>
                {filteredQuotes.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-4 border rounded-xl bg-white dark:bg-gray-900 border-lime-400 shadow hover:scale-105 transition-transform"
                  >
                    <p className="text-md font-semibold text-gray-800 dark:text-white">"{q.text}"</p>
                    <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">— {q.author}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
  <footer className="text-center py-4 text-sm bg-black text-white font-semibold tracking-wider shadow-xl">
  🚀 Crafted with precision & passion — Quotes that spark greatness. — Huzaifa
</footer>
      </div>
    </div>
  );
}