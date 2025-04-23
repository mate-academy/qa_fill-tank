'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should fill full tank if amount is not given', () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    const fuelPrice = 72;

    fillTank(customer, fuelPrice);
    expect(customer.money).toBe(3000 - (32 * 72));
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should not fill fuel if account balance is 0', () => {
    const customer = {
      money: 0, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 2, // Remaining fuel in the tank
      },
    };

    const fuelPrice = 72;

    fillTank(customer, fuelPrice);
    expect(customer.money).toBe(0);
    expect(customer.vehicle.fuelRemains).toBe(2);
  });

  it('should fill only that tank can accomodate even if amount is more', () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    const fuelPrice = 72;
    const fuelQuantity = 40;

    fillTank(customer, fuelPrice, fuelQuantity);
    expect(customer.money).toBe(3000 - (40 - 8) * 72);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should always fill only for the money that client has', () => {
    const customer = {
      money: 2000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    const fuelPrice = 72;
    const fuelQuantity = 40;

    fillTank(customer, fuelPrice, fuelQuantity);

    expect(customer.money).toBeCloseTo(2000 - (27.7 * 72));

    expect(customer.vehicle.fuelRemains)
      .toBe(35.7);
  });

  it('If amount is less than 2 Litre do not pour', () => {
    const customer = {
      money: 2000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 39, // Remaining fuel in the tank
      },
    };

    const fuelPrice = 72;
    const fuelQuantity = 4;

    fillTank(customer, fuelPrice, fuelQuantity);

    expect(customer.money).toBe(2000);
    expect(customer.vehicle.fuelRemains).toBe(39);
  });
});
