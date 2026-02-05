import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";

const serviceOptions = [
  "Commercial Tiling",
  "Residential Tiling",
  "Waterproofing",
  "Bathroom Fit-Out",
  "Balcony / Outdoor Tiling",
  "Pool Tiling",
  "Leak Repair",
  "Other",
];

interface FormData {
  name: string;
  phone: string;
  email: string;
  suburb: string;
  service: string;
  message: string;
}

export function QuoteForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    suburb: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[\d\s+()-]{8,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.suburb.trim()) newErrors.suburb = "Suburb is required";
    if (!formData.service) newErrors.service = "Please select a service";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate form submission
    // In production, integrate with Formspree, EmailJS, or webhook
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <section id="quote" className="section-padding">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-2xl rounded-2xl bg-secondary p-8 text-center md:p-12"
          >
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="mb-3 text-2xl font-bold text-foreground">
              Thank You!
            </h3>
            <p className="mb-6 text-muted-foreground">
              We've received your quote request and will be in touch within 24 hours. If your enquiry is urgent, please call us directly.
            </p>
            <a
              href="tel:0424479303"
              className="inline-flex items-center gap-2 font-semibold text-accent"
            >
              Call 0424 479 303
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="section-padding">
      <div className="section-container">
        <div className="mx-auto max-w-4xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
              Get Started
            </span>
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              Request a Free Quote
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Fill out the form below and we'll get back to you within 24 hours with a detailed quote for your project.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-6 shadow-lg md:p-8"
          >
            <div className="grid gap-6 md:grid-cols-2">
              {/* Name */}
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 ${
                    errors.name ? "border-destructive" : "border-input"
                  }`}
                  placeholder="John Smith"
                />
                {errors.name && (
                  <span className="mt-1 text-sm text-destructive">{errors.name}</span>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 ${
                    errors.phone ? "border-destructive" : "border-input"
                  }`}
                  placeholder="0400 000 000"
                />
                {errors.phone && (
                  <span className="mt-1 text-sm text-destructive">{errors.phone}</span>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 ${
                    errors.email ? "border-destructive" : "border-input"
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <span className="mt-1 text-sm text-destructive">{errors.email}</span>
                )}
              </div>

              {/* Suburb */}
              <div>
                <label htmlFor="suburb" className="mb-2 block text-sm font-medium text-foreground">
                  Suburb *
                </label>
                <input
                  type="text"
                  id="suburb"
                  name="suburb"
                  value={formData.suburb}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 ${
                    errors.suburb ? "border-destructive" : "border-input"
                  }`}
                  placeholder="Springvale"
                />
                {errors.suburb && (
                  <span className="mt-1 text-sm text-destructive">{errors.suburb}</span>
                )}
              </div>

              {/* Service */}
              <div className="md:col-span-2">
                <label htmlFor="service" className="mb-2 block text-sm font-medium text-foreground">
                  Service Required *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 ${
                    errors.service ? "border-destructive" : "border-input"
                  } ${!formData.service ? "text-muted-foreground" : ""}`}
                >
                  <option value="">Select a service</option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <span className="mt-1 text-sm text-destructive">{errors.service}</span>
                )}
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                  Project Details (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  placeholder="Tell us about your project, including size, tile preferences, and any specific requirements..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full justify-center py-4 text-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Quote Request
                  </>
                )}
              </button>
            </div>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              We'll respond within 24 hours. Your information is kept confidential.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
