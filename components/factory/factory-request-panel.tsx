"use client";

import { useMemo, useState } from "react";

type FactoryRequest = {
  prompt: string;
  outputType: string;
  platform: string;
  aspectRatio: string;
  style: string;
  brandPack: string;
};

const outputTypes = ["hero_visual", "social_grid", "infographic", "product_mockup", "ui_mockup", "case_study_asset"];
const platforms = ["website", "README", "LinkedIn", "X", "Instagram", "pitch_deck"];
const ratios = ["16:9", "1:1", "4:5", "9:16", "A4"];
const styles = ["clean SaaS", "isometric infographic", "premium technical", "editorial", "marketing campaign"];
const brandPacks = ["AndyAI Visual Factory", "AndyAI Visual Canon", "TAPFORGE", "custom"];

export function FactoryRequestPanel() {
  const [request, setRequest] = useState<FactoryRequest>({
    prompt: "Create a premium hero visual that explains AndyAI Visual Factory as a live AI visual production system.",
    outputType: "hero_visual",
    platform: "website",
    aspectRatio: "16:9",
    style: "clean SaaS",
    brandPack: "AndyAI Visual Factory"
  });

  const [status, setStatus] = useState<"idle" | "drafted" | "submitting" | "submitted" | "error">("idle");
  const [message, setMessage] = useState("");

  const payload = useMemo(() => {
    return {
      requester: "factory_operator",
      outputType: request.outputType,
      goal: `${request.prompt}\n\nPlatform: ${request.platform}\nAspect ratio: ${request.aspectRatio}\nStyle: ${request.style}\nBrand pack: ${request.brandPack}`
    };
  }, [request]);

  function update<K extends keyof FactoryRequest>(key: K, value: FactoryRequest[K]) {
    setRequest((current) => ({ ...current, [key]: value }));
    setStatus("drafted");
    setMessage("Request draft updated.");
  }

  async function createJob() {
    setStatus("submitting");
    setMessage("Sending production request to the factory runtime.");

    try {
      const response = await fetch("/api/factory/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Request failed.");
      }

      setStatus("submitted");
      setMessage(`Production request created: ${result.request?.request_key ?? "created"}`);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unknown error");
    }
  }

  function startVoice() {
    const SpeechRecognition =
      typeof window !== "undefined"
        ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        : null;

    if (!SpeechRecognition) {
      setStatus("error");
      setMessage("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript ?? "";
      if (transcript) {
        update("prompt", transcript);
        setMessage("Voice request captured.");
      }
    };

    recognition.onerror = () => {
      setStatus("error");
      setMessage("Voice capture failed.");
    };

    recognition.start();
    setMessage("Listening for visual request.");
  }

  return (
    <section className="card">
      <p className="kicker">Factory Request</p>
      <h2>Tell the factory what to create.</h2>
      <textarea
        value={request.prompt}
        onChange={(event) => update("prompt", event.target.value)}
        rows={8}
        style={{
          width: "100%",
          border: "1px solid var(--line)",
          borderRadius: 18,
          padding: 16,
          font: "inherit",
          resize: "vertical"
        }}
      />
      <div className="grid grid-2" style={{ marginTop: 16 }}>
        <label>
          <span className="muted">Output type</span>
          <select value={request.outputType} onChange={(event) => update("outputType", event.target.value)} style={{ width: "100%", padding: 12, borderRadius: 14, border: "1px solid var(--line)" }}>
            {outputTypes.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span className="muted">Platform</span>
          <select value={request.platform} onChange={(event) => update("platform", event.target.value)} style={{ width: "100%", padding: 12, borderRadius: 14, border: "1px solid var(--line)" }}>
            {platforms.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span className="muted">Aspect ratio</span>
          <select value={request.aspectRatio} onChange={(event) => update("aspectRatio", event.target.value)} style={{ width: "100%", padding: 12, borderRadius: 14, border: "1px solid var(--line)" }}>
            {ratios.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span className="muted">Style</span>
          <select value={request.style} onChange={(event) => update("style", event.target.value)} style={{ width: "100%", padding: 12, borderRadius: 14, border: "1px solid var(--line)" }}>
            {styles.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span className="muted">Brand pack</span>
          <select value={request.brandPack} onChange={(event) => update("brandPack", event.target.value)} style={{ width: "100%", padding: 12, borderRadius: 14, border: "1px solid var(--line)" }}>
            {brandPacks.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>
      <div className="button-row">
        <button className="button" type="button" onClick={createJob}>Create Visual Job</button>
        <button className="button secondary" type="button" onClick={startVoice}>Speak request</button>
      </div>
      {message && <p className={status === "error" ? "" : "muted"}>{message}</p>}
    </section>
  );
}
