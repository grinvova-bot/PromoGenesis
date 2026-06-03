const stores = [
  {
    name: "ЦМИ «Кубатура»",
    address: "ул. Фучика 9, секция 2в.527",
    hours: "ежедневно 10:00–22:00",
    phone: "+7 (812) 244-31-50",
    phoneHref: "tel:+78122443150",
    email: "Kubatura@alt-x.ru",
  },
  {
    name: "Строймаркет «Василеостровский»",
    address: "В.О., ул. Железноводская 3, секция 144",
    hours: "ежедневно 10:00–20:00",
    phone: "+7 (812) 241-70-91",
    phoneHref: "tel:+78122417091",
    email: "robinzon@alt-x.ru",
  },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-bg-footer">
      <div className="page-container flex flex-col gap-12 pb-10 pt-16">
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          <div className="flex max-w-[360px] flex-col gap-5">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[16px] font-bold tracking-[-0.02em] text-text-primary">
                TEX-COLOR
              </span>
              <span className="font-display text-[16px] font-medium tracking-[0.04em] text-accent">
                GENESIS
              </span>
            </div>
            <p className="text-[14px] leading-[1.6] text-text-secondary">
              Официальный партнёр АЛЬТ-Икс: краски · декоры · колеровка.
              Профессиональные краски tex-color Genesis в Санкт-Петербурге.
            </p>
            <a
              href="tel:+78005511047"
              className="font-display text-[20px] font-bold text-text-primary transition-colors hover:text-accent"
            >
              +7 (800) 55 11 047
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            {stores.map((s) => (
              <div key={s.name} className="flex max-w-[260px] flex-col gap-2">
                <h3 className="text-[14px] font-semibold text-text-primary">{s.name}</h3>
                <p className="text-[13px] leading-[1.6] text-text-secondary">
                  {s.address}
                  <br />
                  {s.hours}
                </p>
                <a
                  href={s.phoneHref}
                  className="text-[14px] font-medium text-text-primary transition-colors hover:text-accent"
                >
                  {s.phone}
                </a>
                <a
                  href={`mailto:${s.email}`}
                  className="text-[13px] text-accent transition-opacity hover:opacity-80"
                >
                  {s.email}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-accent/[0.12]" />

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-[13px] text-text-tertiary">
            © 2025 АЛЬТ-Икс — краски · декоры · колеровка
          </p>
          <a
            href="https://promo.alt-x.ru/pdd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-text-tertiary transition-colors hover:text-text-primary"
          >
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}
