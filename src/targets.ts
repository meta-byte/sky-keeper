export type Target = {
  id: string;
  name: string;
  speed: number;
  origin: string;
  signature: string;
};

export const targets: Target[] = [
  { id: "mig-29", name: "MiG-29", speed: 820, origin: "Belka", signature: "SG-14 / LOW RCS" },
  { id: "b-2", name: "B-2 Spirit", speed: 540, origin: "Osea", signature: "TRK-02 / FLYING WING" },
  { id: "f-22", name: "F-22A Raptor", speed: 910, origin: "Osea", signature: "SG-07 / CLEAN NOSE" },
  { id: "su-37", name: "Su-37 Terminator", speed: 870, origin: "Yuktobania", signature: "TRK-19 / CANARD" },
  { id: "falken", name: "ADF-01 Falken", speed: 980, origin: "Belka", signature: "SG-01 / FORWARD CANARD" },
  { id: "f-15c", name: "F-15C Eagle", speed: 780, origin: "Ustio", signature: "TRK-11 / TWIN TAIL" },
  { id: "f-14d", name: "F-14D Super Tomcat", speed: 790, origin: "Osea", signature: "TRK-14 / SWING WING" },
  { id: "f-16c", name: "F-16C Fighting Falcon", speed: 800, origin: "Osea", signature: "SG-16 / SINGLE TAIL" },
  { id: "fa-18f", name: "F/A-18F Super Hornet", speed: 760, origin: "Osea", signature: "TRK-18 / TWIN TAIL" },
  { id: "yf-23", name: "YF-23 Black Widow II", speed: 920, origin: "Osea", signature: "SG-23 / DIAMOND PLANFORM" },
  { id: "f-15e", name: "F-15E Strike Eagle", speed: 750, origin: "Osea", signature: "TRK-15 / TWIN TAIL" },
  { id: "a-10c", name: "A-10C Thunderbolt II", speed: 390, origin: "Osea", signature: "TRK-10 / STRAIGHT WING" },
  { id: "f-4e", name: "F-4E Phantom II", speed: 680, origin: "Belka", signature: "TRK-04 / SMOKE TRAIL" },
  { id: "su-33", name: "Su-33 Flanker-D", speed: 720, origin: "Yuktobania", signature: "TRK-33 / CANARD" },
  { id: "su-47", name: "Su-47 Berkut", speed: 790, origin: "Yuktobania", signature: "SG-47 / FORWARD SWEEP" },
  { id: "su-35", name: "Su-35 Super Flanker", speed: 860, origin: "Yuktobania", signature: "TRK-35 / TWIN TAIL" },
  { id: "mig-31", name: "MiG-31B Foxhound", speed: 900, origin: "Yuktobania", signature: "TRK-31 / WIDE NOSE" },
  { id: "mig-21", name: "MiG-21bis", speed: 640, origin: "Belka", signature: "TRK-21 / SMALL DELTA" },
  { id: "x-02", name: "X-02 Wyvern", speed: 940, origin: "Erusea", signature: "SG-02 / SWITCHBLADE" },
  { id: "x-02s", name: "X-02S Strike Wyvern", speed: 960, origin: "Erusea", signature: "SG-02S / SWITCHBLADE" },
  { id: "morgan", name: "ADFX-01 Morgan", speed: 960, origin: "Belka", signature: "SG-00 / HEAVY NOSE" },
  { id: "raven", name: "ADF-11F Raven", speed: 990, origin: "Erusea", signature: "SG-11 / SMALL RCS" },
  { id: "nosferatu", name: "CFA-44 Nosferatu", speed: 930, origin: "Estovakia", signature: "SG-44 / TWIN BOOM" },
  { id: "typhoon", name: "Typhoon", speed: 840, origin: "Erusea", signature: "TRK-20 / CANARD DELTA" },
  { id: "rafale", name: "Rafale M", speed: 820, origin: "Erusea", signature: "TRK-21 / CLOSE CANARD" },
  { id: "mirage", name: "Mirage 2000-5", speed: 800, origin: "Sapin", signature: "TRK-2K / DELTA" },
  { id: "f-117", name: "F-117A Nighthawk", speed: 540, origin: "Erusea", signature: "SG-17 / FACET RETURN" },
  { id: "xfa-27", name: "XFA-27", speed: 950, origin: "Usea", signature: "SG-27 / CRANKED ARROW" },
  { id: "f-35c", name: "F-35C Lightning II", speed: 780, origin: "Osea", signature: "SG-35 / LOW RCS" },
  { id: "shinden", name: "ASF-X Shinden II", speed: 880, origin: "Osea", signature: "TRK-X / FORWARD CANARD" },
  { id: "tornado", name: "Tornado GR.4", speed: 700, origin: "Emmeria", signature: "TRK-GR4 / SWING WING" },
  { id: "f-104", name: "F-104C Starfighter", speed: 860, origin: "Erusea", signature: "TRK-104 / LONG NOSE" },
];

export function pickTarget(excludeId?: string): Target {
  const pool = excludeId ? targets.filter((target) => target.id !== excludeId) : targets;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index] ?? targets[0];
}
