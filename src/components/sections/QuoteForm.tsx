"use client";

import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { quoteOptions, whatsappUrl } from "@/lib/site";
import { Button, WhatsAppButton } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";

/** Formulário de orçamento: monta a mensagem e abre o WhatsApp. */
export function QuoteForm({
  id,
  withDetails = true,
  className = "p-6 sm:p-7",
}: {
  id?: string;
  withDetails?: boolean;
  className?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [need, setNeed] = useState(quoteOptions[0]);
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");
  const titleId = id ? `${id}-titulo` : undefined;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, "").length < 10) {
      setError("Informe seu nome e um WhatsApp com DDD.");
      return;
    }
    setError("");
    const msg = [
      `Olá! Meu nome é ${name.trim()}.`,
      `WhatsApp: ${phone.trim()}`,
      `Preciso de: ${need}`,
      details.trim() && `Detalhes: ${details.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappUrl(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <form id={id} onSubmit={onSubmit} noValidate aria-labelledby={titleId} className={`card ${className}`}>
      <p id={titleId} className="font-display text-xl font-bold">
        Peça seu orçamento
      </p>
      <p className="mt-1.5 text-sm text-muted">
        A gente responde em poucos minutos, no horário comercial. Sem pedido mínimo.
      </p>

      <div className="mt-5 space-y-3">
        <FormField label="Seu nome">
          <input
            required
            autoComplete="name"
            className="field"
            placeholder="Como podemos te chamar"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormField>
        <FormField label="WhatsApp">
          <input
            required
            inputMode="tel"
            autoComplete="tel"
            className="field"
            placeholder="(11) 99999-9999"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormField>
        <FormField label="O que você precisa">
          <select className="field" value={need} onChange={(e) => setNeed(e.target.value)}>
            {quoteOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </FormField>
        {withDetails && (
          <FormField
            label={
              <>
                Detalhes <span className="tracking-normal normal-case">(opcional)</span>
              </>
            }
          >
            <textarea
              rows={2}
              className="field resize-none"
              placeholder="Ex.: 50 camisetas com estampa de 25 cm, para sexta"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </FormField>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-brand">
          {error}
        </p>
      )}

      <Button type="submit" className="mt-5 w-full">
        <Send className="h-4 w-4" />
        Quero meu orçamento
      </Button>

      <div className="mt-3 flex items-center gap-3">
        <span className="h-px flex-1 bg-line" />
        <span className="font-mono text-[0.65rem] tracking-[0.14em] text-faint uppercase">ou</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <WhatsAppButton href={whatsappUrl()} className="mt-3 w-full">
        Chamar agora no WhatsApp
      </WhatsAppButton>

      <p className="mt-3 text-center font-mono text-[0.63rem] leading-relaxed text-faint">
        Usamos seus dados só para responder este orçamento.
      </p>
    </form>
  );
}
