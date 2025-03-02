import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  describe("General case", () => {
    it("should decrease the benefit and expiresIn", () => {
      expect(
        new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("test", 1, 2)]);
    });
    it("should degrades Benefit twice as fast, Once the expiration date has passed", () => {
      expect(
        new Pharmacy([new Drug("test", -1, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("test", -2, 1)]);
    });
    it("The Benefit of an item is never negative", () => {
      expect(
        new Pharmacy([new Drug("test", 2, 0)]).updateBenefitValue(),
      ).toEqual([new Drug("test", 1, 0)]);
    });
  });

  describe("Herbal Tea", () => {
    it("should increase the benefit the older it gets", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 2, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", 1, 4)]);
    });
    it("should increase the benefit twice as fast, Once the expiration date has passed", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", -1, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", -2, 5)]);
    });
    it("The Benefit of an item is never more than 50", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 2, 50)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", 1, 50)]);
    });
    it("The Benefit of an item is never more than 50 event when expiration date has passed", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", -1, 50)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", -2, 50)]);
    });
  });
  describe("Magic Pill", () => {
    it("should never expire nor decreases in Benefit", () => {
      expect(
        new Pharmacy([new Drug("Magic Pill", 2, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("Magic Pill", 2, 3)]);
    });
  });
  describe("Fervex", () => {
    it("should increase the benefit by 2 when there are 10 days or less", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 10, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 9, 5)]);
    });
    it("should increase the benefit by 3 when there are 5 days or less", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 5, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 4, 6)]);
    });
    it("should drop the benefit to 0 after the expiration date", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 0, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", -1, 0)]);
    });
  });
  describe("Dafalgan", () => {
    it("should decrease the benefit twice as fast as normal drugs", () => {
      expect(
        new Pharmacy([new Drug("Dafalgan", 2, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("Dafalgan", 1, 1)]);
    });
    it("should decrease the benefit twice as fast as normal drugs, also once the expiration date has passed", () => {
      expect(
        new Pharmacy([new Drug("Dafalgan", -1, 5)]).updateBenefitValue(),
      ).toEqual([new Drug("Dafalgan", -2, 1)]);
    });
  });
});
