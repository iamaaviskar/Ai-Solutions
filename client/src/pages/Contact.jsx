import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import api from "../services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FIELDS = [
  { name: "name", label: "Full name", type: "text", placeholder: "Jane Doe" },
  {
    name: "email",
    label: "Work email",
    type: "email",
    placeholder: "jane@company.com",
  },
  {
    name: "phone",
    label: "Phone number",
    type: "tel",
    placeholder: "+44 191 000 0000",
  },
  {
    name: "company_name",
    label: "Company",
    type: "text",
    placeholder: "Acme Corp",
  },
  {
    name: "country",
    label: "Country",
    type: "text",
    placeholder: "United Kingdom",
  },
  {
    name: "job_title",
    label: "Job title",
    type: "text",
    placeholder: "Head of Operations",
  },
];

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  company_name: "",
  country: "",
  job_title: "",
  job_details: "",
};

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: undefined });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setFieldErrors({});

    try {
      await api.post("/contact", form);
      setSuccess(true);
      setForm(EMPTY);
    } catch (err) {
      const data = err.response?.data;
      if (data?.errors && Array.isArray(data.errors)) {
        const fe = {};
        for (const e of data.errors) {
          if (e.path) fe[e.path] = e.msg;
        }
        setFieldErrors(fe);
        setError("Please fix the highlighted fields and try again.");
      } else if (data?.field && data?.error) {
        setFieldErrors({ [data.field]: data.error });
        setError(data.error);
      } else {
        setError(
          data?.error ||
            "We couldn't send your enquiry right now. Please try again shortly.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-500 text-xs font-semibold tracking-wide uppercase">
            Contact
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-[#0C0C0C]">
            Tell us what you're trying to solve.
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            Share a few details about your team and the workflow you want to
            improve. We typically reply within one business day.
          </p>
        </div>

        {success ? (
          <div className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 flex gap-4 items-start">
            <CheckCircle2
              className="text-emerald-600 shrink-0 mt-0.5"
              size={28}
            />
            <div>
              <h2 className="text-xl font-semibold text-emerald-900">
                Thanks - your enquiry is in.
              </h2>
              <p className="mt-2 text-emerald-800">
                We will be in touch shortly. In the meantime, feel free to
                explore our case studies.
              </p>
              <Button
                type="button"
                variant="link"
                onClick={() => setSuccess(false)}
                className="mt-2 px-0 text-emerald-700 hover:text-emerald-900"
              >
                Submit another enquiry
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 grid gap-5 sm:grid-cols-2"
            noValidate
          >
            {FIELDS.map((f) => (
              <label key={f.name} className="block">
                <span className="text-sm font-medium text-[#0C0C0C]">
                  {f.label}
                </span>
                <Input
                  type={f.type}
                  name={f.name}
                  value={form[f.name]}
                  onChange={onChange}
                  placeholder={f.placeholder}
                  required
                  aria-invalid={!!fieldErrors[f.name]}
                  className={`mt-1.5 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 ${
                    fieldErrors[f.name] ? "border-red-300" : ""
                  }`}
                />
                {fieldErrors[f.name] && (
                  <span className="mt-1 block text-xs text-red-600">
                    {fieldErrors[f.name]}
                  </span>
                )}
              </label>
            ))}

            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-[#0C0C0C]">
                Project details
              </span>
              <Textarea
                name="job_details"
                value={form.job_details}
                onChange={onChange}
                rows={6}
                minLength={20}
                required
                placeholder="What are you trying to improve? What does success look like?"
                aria-invalid={!!fieldErrors.job_details}
                className={`mt-1.5 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 ${
                  fieldErrors.job_details ? "border-red-300" : ""
                }`}
              />
              {fieldErrors.job_details ? (
                <span className="mt-1 block text-xs text-red-600">
                  {fieldErrors.job_details}
                </span>
              ) : (
                <span className="mt-1 block text-xs text-slate-500">
                  At least 20 characters.
                </span>
              )}
            </label>

            {error && (
              <div className="sm:col-span-2 flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3">
                <AlertCircle
                  className="text-red-600 shrink-0 mt-0.5"
                  size={18}
                />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div className="sm:col-span-2 flex flex-wrap gap-3 items-center">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-amber-500 hover:bg-amber-400 text-black font-medium px-6 py-3 h-auto"
              >
                {submitting && <Loader2 size={16} className="animate-spin" />}
                {submitting ? "Sending..." : "Send enquiry"}
              </Button>
              <p className="text-xs text-slate-500">
                We will only use your details to reply to your enquiry.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
