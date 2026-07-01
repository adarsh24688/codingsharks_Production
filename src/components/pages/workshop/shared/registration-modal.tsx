"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X, Loader2, ChevronRight } from "lucide-react";
import { fetchCrmCourses, submitLeadToCrm } from "@/lib/crm-api";
import {
  sanitizeIndianMobile,
  validateIndianMobile,
  validateEmail,
  validateName,
} from "@/lib/validators";
import { useCountdown } from "../hooks";
import type { WorkshopJson } from "../types";

interface Props {
  workshop: WorkshopJson;
  onClose: () => void;
  isEmbedded?: boolean;
}

export function RegistrationModal({ workshop, onClose, isEmbedded = false }: Props) {
  const router = useRouter();
  const primary = workshop.page_primary_color || "#ea580c";
  const countdown = useCountdown(workshop.event_date, workshop.event_time);
  const priceOriginal = workshop.price_original;
  const backdropRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preference, setPreference] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [crmCourseId, setCrmCourseId] = useState("");

  useEffect(() => {
    fetchCrmCourses("workshop").then((courses) => {
      const match = courses.find(
        (c) =>
          c.name.toLowerCase() === workshop.crm_workshop_name.toLowerCase(),
      );
      if (match) setCrmCourseId(match.id);
    });
  }, [workshop.crm_workshop_name]);

  useEffect(() => {
    if (!isEmbedded) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isEmbedded]);

  function validate() {
    const e: Record<string, string> = {};
    const nameErr = validateName(name);
    if (nameErr) e.name = nameErr;
    const phoneErr = validateIndianMobile(phone);
    if (phoneErr) e.phone = phoneErr;
    const emailErr = validateEmail(email);
    if (emailErr) e.email = emailErr;
    return e;
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setSubmitError("");
    setIsSubmitting(true);
    const mobile = sanitizeIndianMobile(phone);
    const result = await submitLeadToCrm({
      name,
      email,
      mobile,
      courseInterest: crmCourseId || undefined,
    });
    setIsSubmitting(false);
    if (result.success) {
      const params = new URLSearchParams({ from: "/", source: "workshop" });
      router.push(`/thank-you?${params.toString()}`);
    } else
      setSubmitError(
        result.error ?? "Registration failed. Please try again.",
      );
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  if (isEmbedded) {
    return (
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your Full Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full border rounded-2xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors bg-[#fafaf8] ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#e8561a] focus:ring-4 focus:ring-[rgba(232,86,26,0.12)]"}`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">
              +91
            </span>
            <input
              type="tel"
              placeholder="10-digit mobile number *"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              className={`w-full border rounded-2xl pl-12 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors bg-[#fafaf8] ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#e8561a] focus:ring-4 focus:ring-[rgba(232,86,26,0.12)]"}`}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Your Email Address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full border rounded-2xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors bg-[#fafaf8] ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#e8561a] focus:ring-4 focus:ring-[rgba(232,86,26,0.12)]"}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <select aria-label="Your career preference"
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#e8561a] focus:ring-4 focus:ring-[rgba(232,86,26,0.12)] transition-colors bg-[#fafaf8]">
            <option value="">Your Career Preference *</option>
            <option value="ai-ml">AI/ML</option>
            <option value="data-science">Data Science</option>
            <option value="web-dev">Web Development</option>
            <option value="confused">Still Confused</option>
          </select>
        </div>
        {submitError && (
          <p className="text-red-500 text-xs text-center bg-red-50 p-2 rounded">
            {submitError}
          </p>
        )}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-extrabold text-white text-sm shadow-sm hover:opacity-90 disabled:opacity-60 transition-opacity bg-[#e8561a]">
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <span>Reserve My Seat</span>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-70 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(4px)",
        zIndex: 2000,
      }}
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}>
      <div
        className="bg-white shadow-2xl w-full max-w-md relative overflow-y-auto"
        style={{ maxHeight: "95vh" }}>
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 bg-white/90 shadow flex items-center justify-center hover:bg-gray-100 transition-colors">
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Colored header */}
        <div
          className="px-6 pt-6 pb-4 text-center"
          style={{
            background: `linear-gradient(135deg, ${primary} 0%, ${primary}cc 100%)`,
          }}>
          <p className="text-white font-extrabold text-sm leading-tight mb-1">
            {workshop.title}
          </p>
          {workshop.instructor_name && (
            <p className="text-white/75 text-xs mb-3">
              with {workshop.instructor_name}
            </p>
          )}

          {/* Countdown */}
          <div className="bg-black/20 px-4 py-2 inline-flex items-center gap-3">
            {(
              [
                { l: "D", v: countdown.days },
                { l: "H", v: countdown.hours },
                { l: "M", v: countdown.minutes },
                { l: "S", v: countdown.seconds },
              ] as const
            ).map((item, i) => (
              <div key={item.l} className="flex items-center gap-3">
                <div className="text-center">
                  <span className="text-white font-extrabold text-lg leading-none block">
                    {pad(item.v)}
                  </span>
                  <span className="text-white/60 text-[9px] uppercase">
                    {item.l}
                  </span>
                </div>
                {i < 3 && <span className="text-white/60 font-bold">:</span>}
              </div>
            ))}
          </div>
        </div>



        {/* Price pill */}
        {priceOriginal && (
          <div
            className="px-6 py-2 border-b flex items-center justify-center gap-2"
            style={{
              backgroundColor: `${primary}10`,
              borderColor: `${primary}25`,
            }}>
            <span className="text-gray-400 line-through text-sm">
              {priceOriginal}
            </span>
            <span className="font-extrabold text-lg" style={{ color: primary }}>
              {workshop.price}
            </span>
            <span className="text-xs font-bold text-gray-500">
              only · Limited seats
            </span>
          </div>
        )}

        {/* Form content */}
        <div className="p-6">
          <div>
            <h3 className="text-lg font-extrabold text-gray-900 mb-1">
              Claim Your Spot
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              Join <strong>15,000+</strong> students already enrolled at
              CodingShark.
            </p>
            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full border px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors bg-white ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-gray-400"}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number *"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    className={`w-full border pl-12 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors bg-white ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-gray-400"}`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email Address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full border px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors bg-white ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-gray-400"}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              {submitError && (
                <p className="text-red-500 text-xs text-center bg-red-50 p-2">
                  {submitError}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 pb-6 pt-2">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 font-extrabold uppercase tracking-widest text-white text-sm shadow-lg hover:opacity-90 disabled:opacity-60 transition-opacity"
            style={{ backgroundColor: primary }}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <span>Reserve My Seat</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        <p className="text-[10px] text-center text-gray-400 pb-4 px-6">
          By enrolling you agree to CodingShark&apos;s terms. Your info is 100%
          secure.
        </p>
      </div>
    </div>
  );
}
