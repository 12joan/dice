const adjectives = [
  'Friendly',
  'Happy',
  'Excited',
  'Calm',
  'Brave',
  'Scary',
  'Wild',
  'Funny',
  'Clever',
  'Silly',
  'Weird',
  'Strange',
  'Cool',
  'Awesome',
  'Amazing',
  'Red',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Purple',
  'Pink',
  'Grey',
  'Brown',
];

const nouns = [
  'Dog',
  'Cat',
  'Bird',
  'Fish',
  'Mouse',
  'Lion',
  'Tiger',
  'Bear',
  'Wolf',
  'Fox',
  'Snake',
  'Horse',
  'Cow',
  'Pig',
  'Sheep',
  'Duck',
  'Chicken',
  'Goat',
  'Deer',
  'Rabbit',
  'Frog',
  'Spider',
  'Monkey',
  'Elephant',
  'Giraffe',
  'Zebra',
  'Kangaroo',
  'Koala',
  'Panda',
  'Penguin',
  'Owl',
  'Eagle',
  'Shark',
  'Dolphin',
  'Whale',
  'Octopus',
  'Squid',
  'Crab',
  'Lobster',
  'Starfish',
  'Butterfly',
];

export const generateRandomName = (): string => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective} ${noun}`;
};
