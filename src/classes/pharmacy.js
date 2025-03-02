export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    this.drugs.forEach((drug) => {
      this.updateBenefit(drug);
      this.updateExpiration(drug);
      this.handleExpiredDrug(drug);
    });

    return this.drugs;
  }

  updateBenefit(drug) {
    if (drug.name === "Magic Pill") return;

    switch (drug.name) {
      case "Herbal Tea":
        this.increaseBenefit(drug);
        break;
      case "Fervex":
        this.increaseBenefit(drug);
        if (drug.expiresIn < 11) this.increaseBenefit(drug);
        if (drug.expiresIn < 6) this.increaseBenefit(drug);
        break;
      case "Dafalgan":
        this.decreaseBenefit(drug, 2);
        break;
      default:
        this.decreaseBenefit(drug);
        break;
    }
  }

  updateExpiration(drug) {
    if (drug.name !== "Magic Pill") {
      drug.expiresIn -= 1;
    }
  }

  handleExpiredDrug(drug) {
    if (drug.expiresIn >= 0) return;

    switch (drug.name) {
      case "Herbal Tea":
        this.increaseBenefit(drug);
        break;
      case "Fervex":
        drug.benefit = 0;
        break;
      case "Dafalgan":
        this.decreaseBenefit(drug, 2);
        break;
      default:
        this.decreaseBenefit(drug);
        break;
    }
  }

  increaseBenefit(drug, value = 1) {
    drug.benefit = Math.min(drug.benefit + value, 50);
  }

  decreaseBenefit(drug, value = 1) {
    drug.benefit = Math.max(drug.benefit - value, 0);
  }
}
