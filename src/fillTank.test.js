'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should fill the tank if normal conditions met', () => {
    const user = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    fillTank(user, 5, 10);

    expect(user.vehicle.fuelRemains).toBe(18);
    expect(user.money).toBe(2950);
  });

  it('should fill the tank to full if normal conditions met', () => {
    const user = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 10, // Remaining fuel in the tank
      },
    };

    fillTank(user, 10);

    expect(user.vehicle.fuelRemains).toBe(40);
    expect(user.money).toBe(2700);
  });

  it('should fill the tank not greater than tank can fit', () => {
    const user = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 10, // Remaining fuel in the tank
      },
    };

    fillTank(user, 10, 100);

    expect(user.vehicle.fuelRemains).toBe(40);
    expect(user.money).toBe(2700);
  });

  it('should fill the tank for the amount client can pay', () => {
    const user = {
      money: 100, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 10, // Remaining fuel in the tank
      },
    };

    fillTank(user, 10, 100);

    expect(user.vehicle.fuelRemains).toBe(20);
    expect(user.money).toBe(0);
  });

  it('should round the poured amount by discarding '
    + 'number to the tenth part', () => {
    const user = {
      money: 10000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 29.95, // Remaining fuel in the tank
      },
    };

    fillTank(user, 10, 10.05);

    expect(user.vehicle.fuelRemains).toBe(39.95);
    expect(user.money).toBe(9900);
  });

  it('should not fill if order is below 2 liters', () => {
    const user = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 10, // Remaining fuel in the tank
      },
    };

    fillTank(user, 10, 1.95);

    expect(user.vehicle.fuelRemains).toBe(10);
    expect(user.money).toBe(3000);
  });

  it('should round the price of the purchased fuel '
    + 'to the nearest hundredth part', () => {
    const user = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 37, // Remaining fuel in the tank
      },
    };

    fillTank(user, 10.324568878);

    expect(user.vehicle.fuelRemains).toBe(40);
    expect(user.money).toBe(3000 - Math.round(3 * 10.324568878 * 100) / 100);
  });
});
