"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "genesis-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        setVisible(localStorage.getItem(STORAGE_KEY) !== "accepted");
      } catch {
        setVisible(true);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] px-4 pb-4 sm:px-6 sm:pb-6">
      <div
        role="dialog"
        aria-label="Уведомление о cookies"
        className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-border-card/50 bg-bg-card/95 p-5 shadow-[0_20px_60px_-24px_#00000080] backdrop-blur md:flex-row md:items-center md:justify-between"
      >
        <p className="text-[13px] leading-[1.55] text-text-secondary sm:text-[14px]">
          Мы используем cookies и сервисы аналитики, чтобы улучшать сайт и
          понимать, какие разделы полезны посетителям. Продолжая пользоваться
          сайтом, вы соглашаетесь с{" "}
          <a
            href="https://promo.alt-x.ru/pdd"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            политикой конфиденциальности
          </a>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="btn btn-primary shrink-0 justify-center px-5 py-3 text-[14px]"
        >
          Понятно
        </button>
      </div>
    </div>
  );
}
