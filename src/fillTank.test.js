'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  let customer;

  beforeEach(() => {
    customer = {
      money: 3000, // залишок грошей на рахунку клієнта
      vehicle: {
        maxTankCapacity: 40, // Об'єм бака
        fuelRemains: 8, // Залишок палива у баку
      },
    };
  });

  it('should fill full tank if amount is not specified', () => {
    fillTank(customer, 10);

    expect(customer.money).toBe(3000 - 10 * (40 - 8));
    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.maxTankCapacity);
  });

  it('should fill full tank if amount is bigger than maxTankCapacity', () => {
    fillTank(customer, 10, 50);

    expect(customer.money).toBe(3000 - 10 * (40 - 8));
    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.maxTankCapacity);
  });

  it('should fill tank only to amount for which customer can pay', () => {
    customer.money = 300;

    fillTank(customer, 10);

    expect(customer.money).toBe(0);
    expect(customer.vehicle.fuelRemains).toBe(38);
  });

  it('should not fill tank if the poured amount is less than 2 liters', () => {
    customer.vehicle.fuelRemains = 39;

    fillTank(customer, 10);

    expect(customer.money).toBe(3000);
    expect(customer.vehicle.fuelRemains).toBe(39);
  });

  it('should round poured amount down to the tenth', () => {
    // Tank needs 10 liters, but only 9.97 can be paid
    customer.money = 99; // price = 10 per liter
    fillTank(customer, 10);

    // poured = 9.9 (rounded down from 9.97)
    expect(customer.vehicle.fuelRemains).toBeCloseTo(17.9);
    expect(customer.money).toBeCloseTo(0);
  });

  it('should round price to nearest hundredth', () => {
    fillTank(customer, 9.999, 32); // 32 liters * 9.999 = 319.968
    // Rounded to 319.97
    expect(customer.money).toBeCloseTo(3000 - 319.97, 2);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should not exceed maxTankCapacity when amount exactly matches', () => {
    fillTank(customer, 10, 32);

    expect(customer.money).toBe(3000 - 320);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should fill partial amount when amount fits and customer can pay', () => {
    fillTank(customer, 10, 5);

    expect(customer.money).toBe(3000 - 50);
    expect(customer.vehicle.fuelRemains).toBe(13);
  });

  it('should not change anything if customer has no money', () => {
    customer.money = 0;
    fillTank(customer, 10, 10);

    expect(customer.money).toBe(0);
    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  // eslint-disable-next-line max-len
  it('should not fill if requested amount is less than 2 liters even if tank is empty', () => {
    customer.vehicle.fuelRemains = 0;
    fillTank(customer, 10, 1.9);

    expect(customer.money).toBe(3000);
    expect(customer.vehicle.fuelRemains).toBe(0);
  });
});
