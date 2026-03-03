"use client";

import { useState, useRef } from "react";

export default function KitInlineForm2() {
  const [showForm, setShowForm] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setShowForm(true);

    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

      const existing = document.querySelector(
        'script[src="https://zero-to-wealth-pro.kit.com/5f844f8ed8/index.js"]'
      );

      const moveForm = () => {
        // Kit renders a form with class "formkit-form" or inside a div at body level
        const kitForm = document.querySelector(
          'form[data-uid="5f844f8ed8"], div[data-uid="5f844f8ed8"] form, .formkit-form'
        );
        if (kitForm && containerRef.current) {
          // Move the Kit-rendered element into our container
          const kitWrapper = kitForm.closest('[data-uid]') ?? kitForm;
          containerRef.current.appendChild(kitWrapper);
        }
      };

      if (existing) {
        // Script already loaded, just move the form
        moveForm();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://zero-to-wealth-pro.kit.com/877e67d219/index.js";
      script.async = true;
      script.setAttribute("data-uid", "877e67d219");

      // After script loads, poll until Kit renders the form, then move it
      script.onload = () => {
        const interval = setInterval(() => {
          const kitForm = document.querySelector(
            'form[data-uid="5f844f8ed8"], .formkit-form'
          );
          if (kitForm && containerRef.current) {
            clearInterval(interval);
            const kitWrapper = kitForm.closest(".formkit-background") ?? kitForm.closest('[data-uid]') ?? kitForm;
            containerRef.current.appendChild(kitWrapper);
          }
        }, 100);

        // Stop polling after 5 seconds to avoid infinite loop
        setTimeout(() => clearInterval(interval), 5000);
      };

      document.body.appendChild(script);
    }, 50);
  };

  return (
    <section className="bg-blue-120 border border-blue-200 rounded-xl p-6 text-center max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-[#1F4E78] mb-3">
        <strong className="text-blue-400"> Want to become debt-free faster?</strong>
       
      </h2>
      <p className="text-gray-600 mb-6">
        <strong className="text-blue-400"> Get our advanced calculator with snowball, avalanche, and hybrid comparison</strong>
      
      </p>

      {!showForm && (
        <button
          onClick={handleClick}
          className="bg-[#4472C4] text-white px-6 py-3 rounded-lg font-semibold cursor-pointer hover:scale-105 transition transform mb-6"
        >
           Get FREE Debt Calculator →
        </button>
      )}

      {/* Kit form gets moved into here */}
      <div ref={containerRef} className="mt-4" />
    </section>
  );
}
























