const ListIt = require("../index.js");
const list = new ListIt({
    headerBold: true,
    headerColor: "green",
    headerUnderline: true,
});
const PLANETS = [
    { name: "MERCURY", mass: 0.33, dia: 4879, dens: 5427, grav: 3.7, escV: 4.3, rot: 1407.6 },
    { name: "VENUS", mass: 4.87, dia: 12104, dens: 5243, grav: 8.9, escV: 10.4, rot: -5832.5 },
    { name: "EARTH", mass: 5.97, dia: 12756, dens: 5514, grav: 9.8, escV: 11.2, rot: 23.9 },
    { name: "MOON", mass: 0.0073, dia: 3475, dens: 3340, grav: 1.6, escV: 2.4, rot: 655.7 },
    { name: "MARS", mass: 0.642, dia: 6792, dens: 3933, grav: 3.7, escV: 5.0, rot: 24.6 },
    { name: "JUPITER", mass: 1898, dia: 142984, dens: 1326, grav: 23.1, escV: 59.5, rot: 9.9 },
    { name: "SATURN", mass: 568, dia: 120536,dens: 687, grav: 9.0, escV: 35.5, rot: 10.7 },
    { name: "URANUS", mass: 86.8, dia: 51118, dens: 1271, grav: 8.7, escV: 21.3, rot: -17.2 },
    { name: "NEPTUNE", mass: 102, dia: 49528, dens: 1638, grav: 11.0, escV: 23.5, rot: 16.1 },
    { name: "PLUTO", mass: 0.0146, dia: 2370, dens: 2095, grav: 0.7, escV: 1.3, rot: -153.3 }
];
console.log( list.d( PLANETS ).toString() );
