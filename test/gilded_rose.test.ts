import { Shop, Item } from "../src/gilded_rose";

describe("Gilded Rose", function() {
  describe("name != 'Aged Brie' && .name != 'Backstage passes to a TAFKAL80ETC concert'", () => {
    it("should subtract 1 from quality if quality > 0 and name != 'Sulfuras, Hand of Ragnaros'", () => {
      const gildedRose = new Shop([ new Item("foo", 0, 1) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it("should not subtract 1 from quality if quality > 0 and name == 'Sulfuras, Hand of Ragnaros'", () => {
      const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 0, 1) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(1);
    });

    it("should not subtract 1 from quality if quality <= 0", () => {
      const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });

  describe("name == 'Aged Brie' || .name == 'Backstage passes to a TAFKAL80ETC concert'", () => {
    describe("name == 'Backstage passes to a TAFKAL80ETC concert'", () => {
      it('should add 3 to quality if sellIn < 6', () => {
        const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 1) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(4);
      });

      it('should add 2 to quality if sellIn < 6 and initial quality == 48', () => {
        const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 48) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(50);
      });

      it('should add 1 to quality if sellIn < 6 and initial quality == 49', () => {
        const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(50);
      });

      it("should add 2 to quality if 6 > sellIn < 11 and quality < 50", () => {
        const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 1) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(3);
      });

      it("should add 1 to quality if 6 > sellIn < 11 and initial quality == 49", () => {
        const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(50);
      });

      it("should add 1 to quality if sellIn >= 11 and quality < 50", () => {
        const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 11, 1) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(2);
      });
    });

    describe("name == 'Aged Brie'", () => {
      it("should add 1 to quality if quality < 50 even if sellIn < 11", () => {
        const gildedRose = new Shop([ new Item("Aged Brie", 10, 1) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(2);
      });
    });

    it("should not add to quality if quality >= 50", () => {
      const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });
  });

  it("should subtract 1 from sellIn if name != 'Sulfuras, Hand of Ragnaros'", () => {
    const gildedRose = new Shop([ new Item("foo", 1, 1) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
  });

  it('should not subtract 1 from sellIn if name == "Sulfuras, Hand of Ragnaros"', () => {
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 1, 1) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(1);
  });

  describe("sellIn < 0", () => {
    describe("name != 'Aged Brie'", () => {
      describe("name != 'Backstage passes to a TAFKAL80ETC concert'", () => {
        it("should subtract 1 from quality if quality > 0 and name != 'Sulfuras, Hand of Ragnaros'", () => {
          const gildedRose = new Shop([ new Item("foo", -1, 1) ]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toBe(0);
        });

        it("should not subtract 1 from quality if quality > 0 and name == 'Sulfuras, Hand of Ragnaros'", () => {
          const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", -1, 1) ]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toBe(1);
        });

        it("should not subtract 1 from quality if quality <= 0", () => {
          const gildedRose = new Shop([ new Item("foo", -1, 0) ]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toBe(0);
        });
      });

      it("should subtract all quality if name == 'Backstage passes to a TAFKAL80ETC concert'", () => {
        const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", -1, 50) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(0);
      });
    });
    describe("else", () => {
      it("should add 1 to quality if quality < 50", () => {
        const gildedRose = new Shop([ new Item("Aged Brie", -1, 49) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(50);
      });

      it("should not add to quality if quality >= 50", () => {
        const gildedRose = new Shop([ new Item("Aged Brie", -1, 50) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(50);
      });
    });
  });

  it("should add 2 to quality if name == 'Aged Brie' and sellIn < 0", () => {
    const gildedRose = new Shop([ new Item("Aged Brie", -1, 1) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  });

  it('should subtract 2 from quality if sellIn <= 0 and not aged brie nor backdoor and quality >= 2', () => {
    const gildedRose = new Shop([ new Item("foo", 0, 2) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('should subtract 1 from quality if sellIn <= 0 and not aged brie nor backdoor and quality == 1', () => {
    const gildedRose = new Shop([ new Item("foo", 0, 1) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('should subtract 1 from quality if sellIn > 0 and not aged brie nor backdoor and quality >= 2', () => {
    const gildedRose = new Shop([ new Item("foo", 1, 2) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
  });
});
