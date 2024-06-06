const Astrologer = require("../models/astrologer");

async function distributeUsers(users) {
  const astrologers = await Astrologer.find();
  const topAstrologers = astrologers.filter((a) => a.isTop);
  const regularAstrologers = astrologers.filter((a) => !a.isTop);

  const totalTopAstrologers = topAstrologers.length;
  const totalRegularAstrologers = regularAstrologers.length;

  const userDistribution = users.map((user) => {
    let selectedAstrologer;

    if (totalTopAstrologers && Math.random() < 0.5) {
      selectedAstrologer =
        topAstrologers[Math.floor(Math.random() * totalTopAstrologers)];
    } else if (totalRegularAstrologers) {
      selectedAstrologer =
        regularAstrologers[Math.floor(Math.random() * totalRegularAstrologers)];
    }

    if (selectedAstrologer) {
      selectedAstrologer.connections += 1;
    }

    return selectedAstrologer;
  });

  await Promise.all(astrologers.map((a) => a.save()));

  return userDistribution;
}

module.exports = {
  distributeUsers,
};
