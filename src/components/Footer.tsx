export default function Footer() {
  return (
    <footer className="bg-dark-navy">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-8 py-16 lg:px-20">
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          <div className="max-w-[300px]">
            <div className="mb-4 flex items-center gap-2">
              <span className="font-serif text-[20px] font-semibold tracking-[2px] text-off-white">TEX-COLOR</span>
              <span className="text-[10px] font-medium tracking-[4px] text-crimson">GENESIS</span>
            </div>
            <p className="mb-4 text-[13px] leading-[1.6] text-steel-blue">Официальный партнёр АЛЬТ-Икс:<br />краски, декоры, колеровка</p>
            <a href="tel:+78005511047" className="text-[16px] font-medium text-off-white transition-colors hover:text-crimson">+7(800) 55 11 047</a>
          </div>
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div>
              <h4 className="mb-2 text-[14px] font-semibold text-off-white">ЦМИ &laquo;Кубатура&raquo;</h4>
              <p className="mb-1 text-[13px] leading-[1.6] text-steel-blue">ул. Фучика 9, секция 2в.527<br />с 10:00 до 22:00</p>
              <a href="tel:+78122443150" className="text-[13px] font-medium text-off-white hover:text-crimson">+7 (812) 244-31-50</a>
            </div>
            <div>
              <h4 className="mb-2 text-[14px] font-semibold text-off-white">Строймаркет &laquo;Василеостровский&raquo;</h4>
              <p className="mb-1 text-[13px] leading-[1.6] text-steel-blue">В.О., ул. Железноводская 3, секция 144<br />с 10:00 до 20:00</p>
              <a href="tel:+78122417091" className="text-[13px] font-medium text-off-white hover:text-crimson">+7 (812) 241-70-91</a>
            </div>
          </div>
        </div>
        <div className="h-[1px] w-full bg-border-subtle" />
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-[12px] text-steel-blue/50">&copy; 2026 TEX-COLOR GENESIS. Все права защищены.</p>
          <a href="https://promo.alt-x.ru/pdd" target="_blank" rel="noopener noreferrer" className="text-[12px] text-steel-blue/50 transition-colors hover:text-off-white">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}
