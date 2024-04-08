const ListIt = require("../index.js");
const listit = new ListIt({
    autoAlign : true,
    headerUnderline: true,
});
const PLANETS = [
    ["NAME", "Mass(10^24kg)", "Dia(km)", "Dens(kg/m3)",
                        "Grav(m/s2)", "EscV(km/s)", "Rot(hours)" ],
    ["MERCURY", 0.33,   4879,   5427,   3.7,    4.3,    1407.6  ],
    ["VENUS",   4.87,   12104,  5243,   8.9,    10.4,   -5832.5 ],
    ["EARTH",   5.97,   12756,  5514,   9.8,    11.2,   23.9    ],
    ["MOON",    0.0073, 3475,   3340,   1.6,    2.4,    655.7   ],
    ["MARS",    0.642,  6792,   3933,   3.7,    5.0,    24.6    ],
    ["JUPITER", 1898,   142984, 1326,   23.1,   59.5,   9.9     ],
    ["SATURN",  568,    120536, 687,    9.0,    35.5,   10.7    ],
    ["URANUS",  86.8,   51118,  1271,   8.7,    21.3,   -17.2   ],
    ["NEPTUNE", 102,    49528,  1638,   11.0,   23.5,   16.1    ],
    ["PLUTO",   0.0146, 2370,   2095,   0.7,    1.3,    -153.3  ]
];

console.log(listit
    .setHeaderRow(PLANETS.shift())
    .d(PLANETS).toString()
);
