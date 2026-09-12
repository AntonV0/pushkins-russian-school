"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./header.module.css";

function LanguageFlag({ language }: { language: "en" | "ru" }) {
  return (
    <svg width="20" height="14" viewBox="0 0 60 40" aria-hidden="true" focusable="false" className="shrink-0 overflow-hidden rounded-[1px] ring-1 ring-black/10">
      {language === "en" ? (
        <svg width="60" height="40" viewBox="0 0 60 30" preserveAspectRatio="none">
          <path fill="#012169" d="M0 0h60v30H0z" />
          <path stroke="#fff" strokeWidth="6" d="m0 0 60 30M60 0 0 30" />
          <path fill="#c8102e" d="M0 0v2.24L25.53 15H30ZM60 0h-4.47L30 12.76V15ZM60 30v-2.24L34.47 15H30ZM0 30h4.47L30 17.24V15Z" />
          <path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60" />
          <path stroke="#c8102e" strokeWidth="6" d="M30 0v30M0 15h60" />
        </svg>
      ) : (
        <>
          <path fill="#fff" d="M0 0h60v40H0z" />
          <path fill="#0039a6" d="M0 13.333h60v13.334H0z" />
          <path fill="#d52b1e" d="M0 26.667h60V40H0z" />
        </>
      )}
    </svg>
  );
}

export function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  return (
    <div
      ref={root}
      className={styles.languageWrap}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.stopPropagation();
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        className={styles.languageTrigger}
        aria-label="Language: English. Choose language"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <LanguageFlag language="en" /> EN
        <ChevronDown size={12} aria-hidden="true" className={styles.languageChevron} />
      </button>
      {open ? (
        <div id={panelId} className={styles.languagePanel} role="group" aria-label="Website language">
          <button type="button" aria-current="true" onClick={() => { setOpen(false); trigger.current?.focus(); }}>
            <span className="inline-flex items-center gap-2" lang="en"><LanguageFlag language="en" />English</span><Check size={16} aria-hidden="true" />
          </button>
          <button type="button" disabled>
            <span className="inline-flex items-center gap-2" lang="ru"><LanguageFlag language="ru" />Русский</span><span className={styles.languageStatus}>Coming soon</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
