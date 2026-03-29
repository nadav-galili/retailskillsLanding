"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

const interestOptions = [
  "בוט WhatsApp",
  "דשבורדים",
  "פורטל למידה",
  "הכל",
];

interface FormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  interests: string[];
  notes: string;
}

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    phone: "",
    email: "",
    interests: [],
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): FormErrors {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "שדה חובה";
    }
    if (!formData.company.trim()) {
      newErrors.company = "שדה חובה";
    }
    if (!formData.email.trim()) {
      newErrors.email = "שדה חובה";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "כתובת מייל לא תקינה";
    }
    return newErrors;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleCheckbox(option: string) {
    setFormData((prev) => {
      const interests = prev.interests.includes(option)
        ? prev.interests.filter((i) => i !== option)
        : [...prev.interests, option];
      return { ...prev, interests };
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // TODO: Connect form submission to backend API or email service
    setSubmitted(true);
  }

  const inputClassName =
    "w-full bg-surface-lowest border border-border rounded-md px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:shadow-[0_0_8px_rgba(153,247,255,0.15)] focus:outline-none transition-all";
  const labelClassName = "block text-sm font-medium text-text-secondary mb-2";

  if (submitted) {
    return (
      <div className="bg-surface-card rounded-xl p-12 text-center">
        <CheckCircle className="text-primary mx-auto mb-6" size={64} />
        <h2 className="text-2xl font-bold mb-4">הפנייה נשלחה בהצלחה!</h2>
        <p className="text-text-secondary mb-6">
          נחזור אליכם בהקדם. בינתיים, מוזמנים לנסות את הדמו שלנו.
        </p>
        <Link href="/demo" className="text-primary">
          נסה את הדמו &larr;
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-surface-card rounded-xl p-8 md:p-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* שם מלא */}
        <div>
          <label htmlFor="name" className={labelClassName}>
            שם מלא
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="שם מלא"
            className={inputClassName}
          />
          {errors.name && (
            <p className="text-tertiary text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* חברה / רשת */}
        <div>
          <label htmlFor="company" className={labelClassName}>
            חברה / רשת
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            placeholder="חברה / רשת"
            className={inputClassName}
          />
          {errors.company && (
            <p className="text-tertiary text-sm mt-1">{errors.company}</p>
          )}
        </div>

        {/* טלפון */}
        <div>
          <label htmlFor="phone" className={labelClassName}>
            טלפון
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="טלפון"
            className={inputClassName}
          />
        </div>

        {/* מייל */}
        <div>
          <label htmlFor="email" className={labelClassName}>
            מייל
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className={inputClassName}
          />
          {errors.email && (
            <p className="text-tertiary text-sm mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* מה מעניין אתכם? */}
      <div className="mt-6">
        <span className={labelClassName}>מה מעניין אתכם?</span>
        <div className="flex flex-wrap gap-4 mt-2">
          {interestOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 cursor-pointer text-text-primary"
            >
              <input
                type="checkbox"
                checked={formData.interests.includes(option)}
                onChange={() => handleCheckbox(option)}
                className="w-4 h-4 accent-primary rounded border-border"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* הערות */}
      <div className="mt-6">
        <label htmlFor="notes" className={labelClassName}>
          הערות
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          value={formData.notes}
          onChange={handleChange}
          placeholder="ספרו לנו עוד..."
          className={inputClassName}
        />
      </div>

      {/* Submit */}
      <div className="mt-8">
        <button
          type="submit"
          className="w-full md:w-auto bg-gradient-to-r from-primary-light to-primary text-on-primary font-semibold rounded-md px-8 py-4 text-lg transition-shadow hover:neon-glow"
        >
          שלח פנייה
        </button>
      </div>
    </form>
  );
}
