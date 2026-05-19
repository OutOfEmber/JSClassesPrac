class Starship {
  static #totalShips = 0;
  #name;
  #fuel;
  #hullIntegrity;
  #missionLog;
  #isEngineOnline;

  constructor(name, fuel = 100) {
    this.#name = name;
    this.#fuel = fuel;
    this.#hullIntegrity = 100;
    this.#missionLog = [];
    this.#isEngineOnline = false;
    Starship.#totalShips++;
  }

  static getFleetCount() {
    return Starship.#totalShips;
  }

  launch() {
    if (this.#isEngineOnline) {
      throw new Error("Двигатель уже запущен");
    }

    if (this.#fuel >= 20) {
      this.#fuel -= 10;
      this.#isEngineOnline = true;
      this.#missionLog.push("Миссия началась");
    } else {
      throw new Error("Недостаточно топлива для старта");
    }
  }

  damage(amount) {
    this.#hullIntegrity = Math.max(0, this.#hullIntegrity - amount);
    this.#missionLog.push(`Получены повреждения: -${amount}%`);
  }

  chargeEngine(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error("Количество топлива должно быть положительным");
    }

    if (this.#fuel + amount > 100) {
      const actualAdded = 100 - this.#fuel;
      this.#fuel = 100;
      this.#missionLog.push(`Заправка: +${actualAdded} топлива (избыток сгорел)`);
    } else {
      this.#fuel += amount;
      this.#missionLog.push(`Заправка: +${amount} топлива`);
    }
  }

  getStatus() {
    return `Корабль [${this.#name}] | Топливо: [${this.#fuel}]% | Корпус: [${this.#hullIntegrity}]%`;
  }
  getLogs() {
    return this.#missionLog;
  }
}

try {
  const starship1 = new Starship("DeathStar", 25);
  console.log("Старт:", starship1.getStatus()); 
  starship1.launch();
  console.log("После запуска:", starship1.getStatus());
  //starship1.launch();
  starship1.damage(30);
  starship1.damage(80);
  console.log("После повреждений:", starship1.getStatus());
  starship1.chargeEngine(50);
  console.log("Частичная заправка:", starship1.getStatus());
  starship1.chargeEngine(50);
  console.log("Заправка до максимума:", starship1.getStatus());
  // starship1.chargeEngine(-10);
  const starship2 = new Starship("Mandalorec");
  starship2.launch()
  starship2.damage(10);
  starship2.damage(10);
  console.log("После повредлений:",starship2.getStatus())

  console.log("Всего кораблей во флоте:", Starship.getFleetCount());
  console.log("\nЛог миссии Звезды смерти:", starship1.getLogs());
  console.log("\nЛог миссии Мандалорца:", starship2.getLogs());

  const starship3 = new Starship("Beda",5); 
  starship3.launch()

} catch (error) {
  console.error("Произошла ошибка:", error.message);
}