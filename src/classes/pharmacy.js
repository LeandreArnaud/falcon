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

    if (drug.name === "Herbal Tea") {
      this.increaseBenefit(drug, 1);
    } else if (drug.name === "Fervex") {
      this.increaseBenefit(drug, 1);
      if (drug.expiresIn < 11) this.increaseBenefit(drug, 1);
      if (drug.expiresIn < 6) this.increaseBenefit(drug, 1);
    } else {
      this.decreaseBenefit(drug, 1);
    }
  }

  updateExpiration(drug) {
    if (drug.name !== "Magic Pill") {
      drug.expiresIn -= 1;
    }
  }

  handleExpiredDrug(drug) {
    if (drug.expiresIn >= 0) return;

    if (drug.name === "Herbal Tea") {
      this.increaseBenefit(drug, 1);
    } else if (drug.name === "Fervex") {
      drug.benefit = 0;
    } else if (drug.name !== "Magic Pill") {
      this.decreaseBenefit(drug, 1);
    }
  }

  increaseBenefit(drug, value) {
    drug.benefit = Math.min(drug.benefit + value, 50);
  }

  decreaseBenefit(drug, value) {
    drug.benefit = Math.max(drug.benefit - value, 0);
  }
}
