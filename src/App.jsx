import React, { useEffect, useMemo, useState } from "react";
import { Copy, Download, FileText, Globe, Layers, Save, Settings, Sparkles, Upload, Wand2, Shield } from "lucide-react";

/**
 * Jiplo AI Studio — App MVP
 * Single-file React app designed for rapid iteration inside ChatGPT Canvas.
 * TailwindCSS classes are used for styling (no external CSS required here).
 * No backend required — uses in-memory state + localStorage for persistence.
 *
 * Modules included:
 *  - Copy Generator (Elementor-ready website copy; SEO/AEO aware)
 *  - Schema Builder (JSON-LD: LocalBusiness, Organization, Event, FAQ)
 *  - SEO Plan (titles, metas, slugs, IA suggestions)
 *  - Client Brief (exec-ready discovery summary + deliverables)
 *  - Diagnostics (self-tests)
 *
 * Presets provided for current projects: Walking Paws, Cantrell Atelier, Sparta HR, O'Neill's Pub.
 */

// ------------------------------ Helpers ------------------------------
const cls = (...arr) => arr.filter(Boolean).join(" ");

const downloadFile = (filename, content, type = "text/plain") => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const nowISODate = () => new Date().toISOString().split("T")[0];

// ------------------------------ Presets ------------------------------
const PRESETS = {
  walkingPaws: {
    label: "Walking Paws with Ryan (Peninsula)",
    businessName: "Walking Paws with Ryan",
    industry: "Dog Walking & Home Boarding",
    city: "San Mateo",
    state: "CA",
    targetAudience: "Busy professionals & families on the Peninsula",
    usps:
      "Elite one-on-one walks; real-home daycare & boarding; CPR/First Aid certified; licensed, bonded, insured; calm behavior-first approach; small-batch care.",
    certifications: "ProTrainings Pet CPR/First Aid, Pet Sitters Associates",
    keywords:
      "dog walking San Mateo, dog boarding Peninsula, daycare for dogs Belmont, Burlingame dog walker, calm structured daycare, private dog walking",
    tone: "Authority-first, warm, trustworthy, Bay Area premium"
  },
  cantrellAtelier: {
    label: "Cantrell Atelier (Illinois)",
    businessName: "Cantrell Atelier",
    industry: "Brow & Lash Artistry (Microblading, Lamination, Lashes)",
    city: "Geneva",
    state: "IL",
    targetAudience: "Women seeking natural, lasting brow & lash enhancements",
    usps:
      "Licensed cosmetologist; minimalist private studio; skin-health-first method; nano hair-strokes; elegant, age-proof results.",
    certifications: "State licensed; bloodborne pathogens; sanitation",
    keywords:
      "microblading Geneva IL, brow lamination Kane County, lash extensions natural look",
    tone: "Luxury, clinical-elegant, minimalist, high-trust"
  },
  spartaHR: {
    label: "Sparta HR (San Mateo)",
    businessName: "Sparta HR Business Solutions",
    industry: "HR Consulting (CA compliance, DEI, investigations)",
    city: "San Mateo",
    state: "CA",
    targetAudience: "Small–mid CA businesses; founders; ops leaders",
    usps:
      "Woman-owned; Chamber leadership; compliance-first; investigations; on-site leadership training; inclusive DEI strategy; risk reduction.",
    certifications: "PHR/SPHR (if applicable), CA HR expertise",
    keywords:
      "California HR consulting San Mateo, workplace investigations, DEI training, HR audits CA",
    tone: "Shield, empowerment, inclusive, decisive, precise"
  },
  oneillsPub: {
    label: "O’Neill’s Pub (San Mateo)",
    businessName: "O’Neill’s Pub",
    industry: "Irish Pub & Sports Venue",
    city: "San Mateo",
    state: "CA",
    targetAudience: "Locals, sports fans, event-goers, travelers",
    usps:
      "Authentic Irish spirit; FIFA/World Cup mornings; big-game viewing; private events; St. Patrick’s Day destination; live music; local beer.",
    certifications: "ABC compliance; food safety",
    keywords:
      "Irish pub San Mateo, watch sports San Mateo, World Cup bar Peninsula, private events pub",
    tone: "Warm, lively, community hub, heritage-forward"
  }
};

// ------------------------------ Generators ------------------------------
function generateWebsiteCopy(input) {
  const {
    businessName,
    industry,
    city,
    state,
    targetAudience,
    usps,
    certifications,
    keywords,
    tone
  } = input;

  const k = (keywords || "").split(",").map((s) => s.trim()).filter(Boolean);

  return `# ${businessName} — Copy & Paste Website Content (SEO + AEO Ready)\n\n` +
    `## Global Meta\n` +
    `**Title Tag:** ${businessName} — ${industry} in ${city}, ${state}\n` +
    `**Meta Description:** ${businessName} delivers ${industry.toLowerCase()} for ${targetAudience}. ${usps}\n` +
    (k.length ? `**Target Keywords:** ${k.join(", ")}\n\n` : `\n`) +

    `## Homepage\n` +
    `### Hero\n` +
    `**H1:** ${industry} in ${city}, ${state}\n` +
    `**Subheading:** ${businessName} — ${tone}.\n` +
    `**Primary CTA:** Book Now\n**Secondary CTA:** View Services\n\n` +

    `### Social Proof / Credentials\n` +
    `- ${certifications || "Certified & trusted"}\n\n` +

    `### Featured Services\n` +
    `1. Strategy & Discovery — Tailored to ${targetAudience}.\n` +
    `2. Core Offering — ${industry}.\n` +
    `3. Premium Add-ons — Built for outcomes.\n\n` +

    `### About\n` +
    `${businessName} serves ${targetAudience} with a ${tone.toLowerCase()} approach. We prioritize clarity, safety, and outcomes — making every decision measurable and client-centered.\n\n` +

    `### CTA\n` +
    `Ready to start? Book a consultation today.\n\n` +

    `## Contact Page\n` +
    `Short intro, clear next steps, embedded booking link, address, hours, accessibility notes.\n\n` +

    `## Footer (AEO)\n` +
    `Add a concise Q&A block reflecting user intent in natural language (FAQ schema recommended).\n`;
}

function buildLocalBusinessSchema(input) {
  const name = input.businessName || "Business";
  const address = {
    "@type": "PostalAddress",
    streetAddress: input.street || "",
    addressLocality: input.city || "",
    addressRegion: input.state || "",
    postalCode: input.zip || "",
    addressCountry: "US"
  };
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    url: input.url || "",
    image: input.logo || "",
    telephone: input.phone || "",
    address,
    geo: input.lat && input.lng ? { "@type": "GeoCoordinates", latitude: input.lat, longitude: input.lng } : undefined,
    openingHoursSpecification: input.hours || [],
    sameAs: input.sameAs || []
  };
}

function buildOrganizationSchema(input) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: input.businessName || "Organization",
    url: input.url || "",
    logo: input.logo || "",
    sameAs: input.sameAs || []
  };
}

function buildEventSchema(input) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: input.eventName || "Event",
    startDate: input.startDate || new Date().toISOString(),
    endDate: input.endDate || new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: input.venueName || input.businessName || "Venue",
      address: {
        "@type": "PostalAddress",
        streetAddress: input.street || "",
        addressLocality: input.city || "",
        addressRegion: input.state || "",
        postalCode: input.zip || "",
        addressCountry: "US"
      }
    },
    image: input.image || [],
    description: input.description || "",
    organizer: {
      "@type": "Organization",
      name: input.businessName || "Organizer",
      url: input.url || ""
    },
    offers: input.price ? [{ "@type": "Offer", price: input.price, priceCurrency: "USD", availability: "https://schema.org/InStock" }] : undefined
  };
}

function buildFAQSchema(faqList) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (faqList || []).filter(Boolean).map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a }
    }))
  };
}

function generateSeoPlan({ businessName, city, state, keywords = "" }) {
  const ks = keywords.split(",").map((s) => s.trim()).filter(Boolean);
  const items = ks.length ? ks : [
    `${businessName} ${city} ${state}`,
    `${businessName} services`,
    `${businessName} contact`
  ];
  return items.slice(0, 12).map((kw, i) => {
    const slug = kw
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    const title = `${kw} | ${businessName} (${city}, ${state})`;
    const meta = `Explore ${kw} from ${businessName} in ${city}, ${state}. Book a consultation today.`;
    return { id: i + 1, kw, slug: `/${slug}`, title, meta };
  });
}

function briefMarkdown(input) {
  return `# Client Brief — ${input.businessName || "Untitled"}\n\n` +
    `**Date:** ${nowISODate()}\n\n` +
    `## Business Overview\n` +
    `- **Industry:** ${input.industry || ""}\n` +
    `- **Location:** ${input.city || ""}, ${input.state || ""}\n` +
    `- **Audience:** ${input.targetAudience || ""}\n` +
    `- **Differentiators:** ${input.usps || ""}\n` +
    `- **Certifications:** ${input.certifications || ""}\n\n` +
    `## Objectives\n` +
    `- Launch a high-converting, SEO/AEO-optimized website.\n` +
    `- Clarify value proposition, services, and proof.\n` +
    `- Implement structured data (JSON-LD) + Q&A for AEO.\n` +
    `- Enable simple operations: bookings, intake, and analytics.\n\n` +
    `## Deliverables\n` +
    `- Copy deck (Elementor-ready).\n` +
    `- JSON-LD (LocalBusiness/Organization + FAQ + Event if relevant).\n` +
    `- SEO plan (titles, metas, slugs, IA).\n` +
    `- Brand content (alt-text, CTA set, legal).\n\n` +
    `## Timeline & Milestones\n` +
    `- Week 1: Discovery, brief approval, IA.\n` +
    `- Week 2: Copy v1 + schema.\n` +
    `- Week 3: Revisions, launch prep.\n\n` +
    `## Notes\n` +
    `- Tone: ${input.tone || "professional"}.\n` +
    `- Keywords: ${input.keywords || ""}.\n`;
}

// ------------------------------ Self-Tests (Diagnostics) ------------------------------
function runSelfTests() {
  const results = [];
  const assert = (cond, name, message = "") => {
    results.push({ name, passed: Boolean(cond), message: cond ? "" : message });
  };

  // Test 1: FAQ schema shape
  const faq = buildFAQSchema([["Q?", "A."]]);
  assert(faq && faq["@type"] === "FAQPage", "FAQ schema type", "@type should be FAQPage");
  assert(Array.isArray(faq.mainEntity) && faq.mainEntity.length === 1, "FAQ mainEntity length", "mainEntity should have one entry");

  // Test 2: LocalBusiness minimal fields
  const lb = buildLocalBusinessSchema({ businessName: "X", city: "Y", state: "CA" });
  assert(lb["@context"] === "https://schema.org", "LocalBusiness @context");
  assert(lb["@type"] === "LocalBusiness", "LocalBusiness @type");

  // Test 3: SEO plan slugs
  const plan = generateSeoPlan({ businessName: "Test Biz", city: "San Mateo", state: "CA", keywords: "Alpha Beta, Gamma" });
  assert(plan.length >= 2, "SEO plan count");
  assert(plan[0].slug.startsWith("/"), "SEO slug starts with /");

  // Test 4: Copy generator contains sections
  const copy = generateWebsiteCopy({
    businessName: "Test Biz",
    industry: "Services",
    city: "San Mateo",
    state: "CA",
    targetAudience: "Leaders",
    usps: "USP",
    certifications: "Cert",
    keywords: "x, y",
    tone: "Professional"
  });
  assert(typeof copy === "string" && copy.includes("## Homepage"), "Copy generator output includes Homepage");

  return results;
}

// ------------------------------ App ------------------------------
export default function JiploAIStudio() {
  const [section, setSection] = useState("copy");
  const [input, setInput] = useState({
    businessName: "Jiplo Digital Forge",
    industry: "Luxury Web Design & Strategic Marketing",
    city: "San Mateo",
    state: "CA",
    targetAudience: "CEOs, founders, public-sector leaders",
    usps: "AI-powered, AEO/SEO-first, executive-grade brand & web builds",
    certifications: "",
    keywords:
      "luxury web design San Mateo, executive marketing agency Bay Area, AEO SEO consultancy, government contracts marketing",
    tone: "Silicon Valley sophistication, precision, leadership"
  });

  const [generatedCopy, setGeneratedCopy] = useState("");
  const [schemaType, setSchemaType] = useState("LocalBusiness");
  const [schemaInput, setSchemaInput] = useState({
    ...input,
    url: "https://jiplodigitalforge.com",
    logo: "https://example.com/logo.png",
    phone: "",
    street: "",
    zip: "",
    lat: "",
    lng: "",
    hours: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "09:00", closes: "17:00" }
    ],
    sameAs: []
  });
  const [faqList, setFaqList] = useState([
    ["What services do you offer?", "We design luxury websites and execute integrated marketing with AEO/SEO at the core."],
    ["Do you work with public-sector teams?", "Yes — we support federal, state, and local entities with compliant digital experiences."],
  ]);
  const [seoPlan, setSeoPlan] = useState([]);
  const [brief, setBrief] = useState(briefMarkdown(input));
  const [toast, setToast] = useState("");
  const [diagResults, setDiagResults] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("jiplo_ai_studio_state");
    if (saved) {
      try {
        const s = JSON.parse(saved);
        if (s.input) setInput(s.input);
        if (s.schemaInput) setSchemaInput(s.schemaInput);
        if (s.faqList) setFaqList(s.faqList);
        if (s.generatedCopy) setGeneratedCopy(s.generatedCopy);
        if (s.seoPlan) setSeoPlan(s.seoPlan);
        if (s.brief) setBrief(s.brief);
      } catch {}
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    const payload = { input, schemaInput, faqList, generatedCopy, seoPlan, brief };
    localStorage.setItem("jiplo_ai_studio_state", JSON.stringify(payload));
  }, [input, schemaInput, faqList, generatedCopy, seoPlan, brief]);

  const schemaJSON = useMemo(() => {
    if (schemaType === "LocalBusiness") return buildLocalBusinessSchema(schemaInput);
    if (schemaType === "Organization") return buildOrganizationSchema(schemaInput);
    if (schemaType === "Event") return buildEventSchema(schemaInput);
    if (schemaType === "FAQ") return buildFAQSchema(faqList);
    return {};
  }, [schemaType, schemaInput, faqList]);

  const handlePreset = (key) => {
    const p = PRESETS[key];
    if (!p) return;
    const next = { ...input, ...p };
    setInput(next);
    setSchemaInput((prev) => ({ ...prev, ...p }));
    setBrief(briefMarkdown(next));
    setToast(`Loaded preset: ${p.label}`);
    setTimeout(() => setToast(""), 2000);
  };

  const runCopyGen = () => {
    const out = generateWebsiteCopy(input);
    setGeneratedCopy(out);
    setToast("Website copy generated");
    setTimeout(() => setToast(""), 1500);
  };

  const runSeoPlan = () => {
    const plan = generateSeoPlan(input);
    setSeoPlan(plan);
    setToast("SEO plan generated");
    setTimeout(() => setToast(""), 1500);
  };

  const copySchema = async () => {
    const ok = await copyToClipboard(JSON.stringify(schemaJSON, null, 2));
    setToast(ok ? "Schema copied" : "Copy failed");
    setTimeout(() => setToast(""), 1500);
  };

  const copyCopy = async () => {
    const ok = await copyToClipboard(generatedCopy || "");
    setToast(ok ? "Copy deck copied" : "Copy failed");
    setTimeout(() => setToast(""), 1500);
  };

  const copyBrief = async () => {
    const ok = await copyToClipboard(brief || "");
    setToast(ok ? "Brief copied" : "Copy failed");
    setTimeout(() => setToast(""), 1500);
  };

  const copySEO = async () => {
    const csv = ["id,keyword,slug,title,meta"].concat(
      (seoPlan || []).map((r) => [r.id, r.kw, r.slug, r.title, r.meta]
        .map((f) => `"${String(f).replaceAll('"', '""')}"`).join(","))
    ).join("\n");
    const ok = await copyToClipboard(csv);
    setToast(ok ? "SEO CSV copied" : "Copy failed");
    setTimeout(() => setToast(""), 1500);
  };

  const runDiagnostics = () => {
    const res = runSelfTests();
    setDiagResults(res);
    setToast("Diagnostics completed");
    setTimeout(() => setToast(""), 1500);
  };

  // ------------------------------ UI ------------------------------
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-400/30 via-fuchsia-400/30 to-emerald-400/30 ring-1 ring-white/10" />
            <div className="font-semibold tracking-tight">Jiplo AI Studio</div>
            <span className="ml-2 rounded-full bg-white/5 px-2 py-0.5 text-xs text-white/70 ring-1 ring-white/10">MVP</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => downloadFile(`brief-${nowISODate()}.md`, brief, "text/markdown")}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
            >
              <Download size={16} /> Export Brief
            </button>
            <button
              onClick={() => downloadFile(`schema-${schemaType}-${nowISODate()}.json`, JSON.stringify(schemaJSON, null, 2), "application/json")}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
            >
              <Globe size={16} /> Export Schema
            </button>
            <button
              onClick={() => downloadFile(`copydeck-${nowISODate()}.md`, generatedCopy || "", "text/markdown")}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
            >
              <FileText size={16} /> Export Copy
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-4 py-6">
        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <div className="mb-2 px-2 text-xs uppercase tracking-wider text-white/60">Workspace</div>
            <nav className="space-y-1">
              <NavBtn icon={<Sparkles size={16} />} label="Copy Generator" active={section === "copy"} onClick={() => setSection("copy")} />
              <NavBtn icon={<Globe size={16} />} label="Schema Builder" active={section === "schema"} onClick={() => setSection("schema")} />
              <NavBtn icon={<Layers size={16} />} label="SEO Plan" active={section === "seo"} onClick={() => setSection("seo")} />
              <NavBtn icon={<FileText size={16} />} label="Client Brief" active={section === "brief"} onClick={() => setSection("brief")} />
              <NavBtn icon={<Shield size={16} />} label="Diagnostics" active={section === "diagnostics"} onClick={() => setSection("diagnostics")} />
              <div className="my-3 h-px bg-white/10" />
              <NavBtn icon={<Settings size={16} />} label="Settings" active={section === "settings"} onClick={() => setSection("settings")} />
            </nav>

            <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3">
              <div className="mb-2 text-xs font-medium text-white/70">Project Presets</div>
              <div className="grid grid-cols-1 gap-2">
                <PresetBtn label={PRESETS.walkingPaws.label} onClick={() => handlePreset("walkingPaws")} />
                <PresetBtn label={PRESETS.cantrellAtelier.label} onClick={() => handlePreset("cantrellAtelier")} />
                <PresetBtn label={PRESETS.spartaHR.label} onClick={() => handlePreset("spartaHR")} />
                <PresetBtn label={PRESETS.oneillsPub.label} onClick={() => handlePreset("oneillsPub")} />
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="col-span-12 lg:col-span-9 space-y-6">
          {section === "copy" && (
            <Card title="Website Copy Generator" subtitle="Elementor-ready content with SEO/AEO structure.">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextInput label="Business Name" value={input.businessName} onChange={(v) => setInput({ ...input, businessName: v })} />
                <TextInput label="Industry" value={input.industry} onChange={(v) => setInput({ ...input, industry: v })} />
                <TextInput label="City" value={input.city} onChange={(v) => setInput({ ...input, city: v })} />
                <TextInput label="State" value={input.state} onChange={(v) => setInput({ ...input, state: v })} />
                <TextInput label="Target Audience" value={input.targetAudience} onChange={(v) => setInput({ ...input, targetAudience: v })} />
                <TextInput label="Certifications" value={input.certifications} onChange={(v) => setInput({ ...input, certifications: v })} />
                <Textarea label="Differentiators / USPs" value={input.usps} onChange={(v) => setInput({ ...input, usps: v })} rows={3} />
                <Textarea label="Target Keywords (comma-separated)" value={input.keywords} onChange={(v) => setInput({ ...input, keywords: v })} rows={3} />
                <TextInput label="Tone" value={input.tone} onChange={(v) => setInput({ ...input, tone: v })} />
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={runCopyGen} className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90">
                  <Wand2 size={16} /> Generate
                </button>
                <button onClick={copyCopy} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
                  <Copy size={16} /> Copy All
                </button>
                <button onClick={() => downloadFile(`copydeck-${nowISODate()}.md`, generatedCopy || "", "text/markdown")} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
                  <Download size={16} /> Download .md
                </button>
              </div>
              <OutputBlock content={generatedCopy} placeholder="Generated copy will appear here..." />
            </Card>
          )}

          {section === "schema" && (
            <Card title="Schema Builder (JSON-LD)" subtitle="LocalBusiness • Organization • Event • FAQ">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Select label="Schema Type" value={schemaType} onChange={setSchemaType} options={["LocalBusiness", "Organization", "Event", "FAQ"]} />
                <TextInput label="Business Name" value={schemaInput.businessName || input.businessName} onChange={(v) => setSchemaInput({ ...schemaInput, businessName: v })} />
                <TextInput label="URL" value={schemaInput.url} onChange={(v) => setSchemaInput({ ...schemaInput, url: v })} />
                {schemaType !== "FAQ" && (
                  <>
                    <TextInput label="Logo URL" value={schemaInput.logo} onChange={(v) => setSchemaInput({ ...schemaInput, logo: v })} />
                    <TextInput label="Phone" value={schemaInput.phone} onChange={(v) => setSchemaInput({ ...schemaInput, phone: v })} />
                    <TextInput label="Street" value={schemaInput.street} onChange={(v) => setSchemaInput({ ...schemaInput, street: v })} />
                    <TextInput label="City" value={schemaInput.city} onChange={(v) => setSchemaInput({ ...schemaInput, city: v })} />
                    <TextInput label="State" value={schemaInput.state} onChange={(v) => setSchemaInput({ ...schemaInput, state: v })} />
                    <TextInput label="ZIP" value={schemaInput.zip} onChange={(v) => setSchemaInput({ ...schemaInput, zip: v })} />
                    {schemaType === "Event" && (
                      <>
                        <TextInput label="Event Name" value={schemaInput.eventName || ""} onChange={(v) => setSchemaInput({ ...schemaInput, eventName: v })} />
                        <TextInput label="Start Date (ISO)" value={schemaInput.startDate || ""} onChange={(v) => setSchemaInput({ ...schemaInput, startDate: v })} />
                        <TextInput label="End Date (ISO)" value={schemaInput.endDate || ""} onChange={(v) => setSchemaInput({ ...schemaInput, endDate: v })} />
                        <Textarea label="Description" value={schemaInput.description || ""} onChange={(v) => setSchemaInput({ ...schemaInput, description: v })} rows={2} />
                      </>
                    )}
                  </>
                )}
              </div>

              {schemaType === "FAQ" && (
                <div className="mt-4 rounded-xl border border-white/10 p-3">
                  <div className="mb-2 text-sm font-medium text-white/80">FAQ Items</div>
                  {faqList.map(([q, a], idx) => (
                    <div key={idx} className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-2">
                      <TextInput label={`Q${idx + 1}`} value={q} onChange={(v) => setFaqList(faqList.map((it, i) => i === idx ? [v, it[1]] : it))} />
                      <TextInput label={`A${idx + 1}`} value={a} onChange={(v) => setFaqList(faqList.map((it, i) => i === idx ? [it[0], v] : it))} />
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <button onClick={() => setFaqList([...faqList, ["New question?", "A concise, helpful answer."]])} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10">+ Add FAQ</button>
                    <button onClick={() => setFaqList(faqList.slice(0, -1))} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10">Remove Last</button>
                  </div>
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <button onClick={copySchema} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
                  <Copy size={16} /> Copy JSON-LD
                </button>
                <button onClick={() => downloadFile(`schema-${schemaType}-${nowISODate()}.json`, JSON.stringify(schemaJSON, null, 2), "application/json")} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
                  <Download size={16} /> Download JSON
                </button>
              </div>
              <OutputBlock code content={JSON.stringify(schemaJSON, null, 2)} placeholder="Schema JSON will appear here..." />
            </Card>
          )}

          {section === "seo" && (
            <Card title="SEO Plan Builder" subtitle="Titles, meta descriptions, and clean slugs.">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextInput label="Business Name" value={input.businessName} onChange={(v) => setInput({ ...input, businessName: v })} />
                <TextInput label="City" value={input.city} onChange={(v) => setInput({ ...input, city: v })} />
                <TextInput label="State" value={input.state} onChange={(v) => setInput({ ...input, state: v })} />
                <Textarea label="Keywords (comma-separated)" value={input.keywords} onChange={(v) => setInput({ ...input, keywords: v })} rows={3} />
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={runSeoPlan} className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90">
                  <Wand2 size={16} /> Generate Plan
                </button>
                <button onClick={copySEO} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
                  <Copy size={16} /> Copy CSV
                </button>
                <button onClick={() => {
                  const csv = ["id,keyword,slug,title,meta"].concat(
                    (seoPlan || []).map((r) => [r.id, r.kw, r.slug, r.title, r.meta]
                      .map((f) => `"${String(f).replaceAll('"', '""')}"`).join(","))
                  ).join("\n");
                  downloadFile(`seo-plan-${nowISODate()}.csv`, csv, "text/csv");
                }} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
                  <Download size={16} /> Download CSV
                </button>
              </div>

              <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                <table className="w-full text-sm">
                  <thead className="bg-white/5">
                    <tr className="text-left">
                      <th className="px-3 py-2">#</th>
                      <th className="px-3 py-2">Keyword</th>
                      <th className="px-3 py-2">Slug</th>
                      <th className="px-3 py-2">Title</th>
                      <th className="px-3 py-2">Meta Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(seoPlan || []).map((row) => (
                      <tr key={row.id} className="odd:bg-white/[0.02]">
                        <td className="px-3 py-2 text-white/60">{row.id}</td>
                        <td className="px-3 py-2">{row.kw}</td>
                        <td className="px-3 py-2 text-white/70">{row.slug}</td>
                        <td className="px-3 py-2 font-medium">{row.title}</td>
                        <td className="px-3 py-2 text-white/80">{row.meta}</td>
                      </tr>
                    ))}
                    {(!seoPlan || seoPlan.length === 0) && (
                      <tr>
                        <td className="px-3 py-6 text-center text-white/60" colSpan={5}>No plan yet — click “Generate Plan”.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {section === "brief" && (
            <Card title="Client Brief" subtitle="Executive-ready discovery doc.">
              <Textarea label="Brief (Markdown)" value={brief} onChange={setBrief} rows={18} />
              <div className="mt-4 flex gap-2">
                <button onClick={copyBrief} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
                  <Copy size={16} /> Copy Brief
                </button>
                <button onClick={() => downloadFile(`brief-${nowISODate()}.md`, brief, "text/markdown")} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
                  <Download size={16} /> Download .md
                </button>
              </div>
            </Card>
          )}

          {section === "diagnostics" && (
            <Card title="Diagnostics" subtitle="Built-in self-tests to validate core functions.">
              <div className="flex gap-2">
                <button onClick={runDiagnostics} className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90">
                  <Shield size={16} /> Run Self-Tests
                </button>
              </div>
              <div className="mt-4 space-y-2">
                {diagResults.length === 0 && (
                  <div className="text-sm text-white/60">No diagnostics run yet.</div>
                )}
                {diagResults.map((r, i) => (
                  <div key={i} className={cls("rounded-lg border px-3 py-2 text-sm", r.passed ? "border-emerald-500/30 bg-emerald-500/10" : "border-rose-500/30 bg-rose-500/10")}>
                    <span className={cls("mr-2 font-medium", r.passed ? "text-emerald-300" : "text-rose-300")}>{r.passed ? "PASS" : "FAIL"}</span>
                    {r.name}
                    {!r.passed && r.message ? <span className="ml-2 text-white/80">— {r.message}</span> : null}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {section === "settings" && (
            <Card title="Settings" subtitle="Import/Export your workspace data.">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    const payload = { input, schemaInput, faqList, generatedCopy, seoPlan, brief };
                    downloadFile(`jiplo-workspace-${nowISODate()}.json`, JSON.stringify(payload, null, 2), "application/json");
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                >
                  <Download size={16} /> Export Workspace JSON
                </button>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10">
                  <Upload size={16} /> Import Workspace JSON
                  <input
                    type="file"
                    accept="application/json"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const text = await file.text();
                      try {
                        const data = JSON.parse(text);
                        if (data.input) setInput(data.input);
                        if (data.schemaInput) setSchemaInput(data.schemaInput);
                        if (data.faqList) setFaqList(data.faqList);
                        if (data.generatedCopy) setGeneratedCopy(data.generatedCopy);
                        if (data.seoPlan) setSeoPlan(data.seoPlan);
                        if (data.brief) setBrief(data.brief);
                        setToast("Workspace imported");
                        setTimeout(() => setToast(""), 1500);
                      } catch {
                        setToast("Invalid JSON");
                        setTimeout(() => setToast(""), 1500);
                      }
                    }}
                  />
                </label>
                <button
                  onClick={() => {
                    localStorage.removeItem("jiplo_ai_studio_state");
                    setToast("Local data cleared");
                    setTimeout(() => setToast(""), 1500);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200 hover:bg-red-500/20"
                >
                  <Save size={16} /> Reset Local Storage
                </button>
              </div>
            </Card>
          )}
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm backdrop-blur">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

// ------------------------------ Reusable UI ------------------------------
function NavBtn({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cls(
        "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm",
        active ? "bg-white text-black" : "text-white/80 hover:bg-white/5 border border-white/10"
      )}
    >
      <span className="shrink-0">{icon}</span>
      <span className="truncate text-left">{label}</span>
    </button>
  );
}

function PresetBtn({ label, onClick }) {
  return (
    <button onClick={onClick} className="truncate rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-sm hover:bg-white/10">
      {label}
    </button>
  );
}

function Card({ title, subtitle, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold leading-tight">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-white/70">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function TextInput({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs text-white/70">{label}</div>
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || label}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none ring-white/20 placeholder:text-white/30 focus:ring"
      />
    </label>
  );
}

function Textarea({ label, value, onChange, rows = 6, placeholder }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs text-white/70">{label}</div>
      <textarea
        rows={rows}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || label}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none ring-white/20 placeholder:text-white/30 focus:ring"
      />
    </label>
  );
}

function Select({ label, value, onChange, options = [] }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs text-white/70">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none ring-white/20 focus:ring"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
}

function OutputBlock({ content, placeholder = "", code = false }) {
  return (
    <div className="mt-4">
      <div className="rounded-xl border border-white/10 bg-black/40 p-3">
        {content ? (
          code ? (
            <pre className="whitespace-pre-wrap text-xs leading-relaxed text-white/90">{content}</pre>
          ) : (
            <div className="prose prose-invert max-w-none text-white/90">
              <pre className="whitespace-pre-wrap text-xs leading-relaxed">{content}</pre>
            </div>
          )
        ) : (
          <div className="text-sm text-white/50">{placeholder}</div>
        )}
      </div>
    </div>
  );
}
