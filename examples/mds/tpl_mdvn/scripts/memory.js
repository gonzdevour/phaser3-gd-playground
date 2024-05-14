//mdvn data monitor
var memory = {
  date: 19490225,
  coin: 10,
  charA: {
    hp: 100,
    mp: 100,
  },
};

var monitorProps = [
  { $key: "date", step: 1 },
  { $key: "coin", max: 100, min: 10, step: 1 },
  {
    $type: "folder",
    title: "CharA",
    $properties: [
      { $key: "charA.hp", int: true },
      { $key: "charA.mp", int: true },
    ],
  },
];

export { memory, monitorProps };
