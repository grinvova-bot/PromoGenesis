export type Collection = "quiet" | "mountain";

export type PaletteColor = {
  code: string;
  name: string;
  collection: Collection;
  hex: string;
};

export const paletteColors: PaletteColor[] = [
  { code: "TN100", name: "Тень отражения", collection: "quiet", hex: "#DADBD8" },
  { code: "TG306", name: "Луч на опушке", collection: "mountain", hex: "#DAD9BB" },
  { code: "TG301", name: "Изумрудный вздох", collection: "quiet", hex: "#517C78" },
  { code: "TR403", name: "Шерсть ламы", collection: "mountain", hex: "#AC9E90" },
  { code: "TY502", name: "Тень ущелья", collection: "mountain", hex: "#757064" },
  { code: "TN102", name: "Фон тишины", collection: "quiet", hex: "#E6DED6" },
  { code: "TY500", name: "Верблюжий плед", collection: "mountain", hex: "#D9BB98" },
  { code: "TN101", name: "Кавычки тумана", collection: "quiet", hex: "#DFDCD6" },
  { code: "TN104", name: "Песок времени", collection: "quiet", hex: "#ECE8DE" },
  { code: "TG303", name: "Утро в мае", collection: "mountain", hex: "#C1B97A" },
  { code: "TN106", name: "Полутон ощущения", collection: "quiet", hex: "#D1D2CD" },
  { code: "TB201", name: "Полночное признание", collection: "quiet", hex: "#3D5D70" },
  { code: "TR402", name: "Глубина очага", collection: "mountain", hex: "#7A6157" },
  { code: "TG302", name: "Влажная олива", collection: "mountain", hex: "#98966F" },
  { code: "TN107", name: "Пыль воспоминаний", collection: "quiet", hex: "#E2D8CD" },
  { code: "TN110", name: "Шелк тумана", collection: "mountain", hex: "#DBCCBD" },
  { code: "TN108", name: "Интерлюдия покоя", collection: "quiet", hex: "#D7D0C6" },
  { code: "TG304", name: "Еловый полумрак", collection: "mountain", hex: "#858A74" },
  { code: "TB200", name: "Джинсовая нежность", collection: "quiet", hex: "#647689" },
  { code: "TG307", name: "Эхо росы", collection: "mountain", hex: "#929D8A" },
  { code: "TY501", name: "Таежный мох", collection: "mountain", hex: "#8E7C65" },
  { code: "TN109", name: "Бумажный шепот", collection: "quiet", hex: "#F5EFE1" },
  { code: "TG309", name: "Холодный нефрит", collection: "mountain", hex: "#6C8A6F" },
  { code: "TR400", name: "Поцелуй мака", collection: "quiet", hex: "#AC6D68" },
  { code: "TG300", name: "Примечание мудрости", collection: "quiet", hex: "#6A7D79" },
  { code: "TR404", name: "Базальтовый утес", collection: "mountain", hex: "#706962" },
  { code: "TN105", name: "Воздух свободы", collection: "quiet", hex: "#DDE1D7" },
  { code: "TN111", name: "Лунный песок", collection: "mountain", hex: "#CBBEB1" },
  { code: "TN103", name: "Молчание утра", collection: "quiet", hex: "#F1E8D7" },
  { code: "TG308", name: "Молодой папоротник", collection: "mountain", hex: "#B4C2A4" },
  { code: "TR401", name: "Трепет пламени", collection: "quiet", hex: "#815157" },
  { code: "TG310", name: "Изумрудная тень", collection: "mountain", hex: "#69827B" },
];
