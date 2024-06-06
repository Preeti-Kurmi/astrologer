const Astrologer = require('../models/astrologer');
const { distributeUsers } = require('../services/flowDistributionService');

exports.getAstrologers = async (req, res) => {
    const astrologers = await Astrologer.find();
    res.json(astrologers);
};

exports.toggleTopAstrologer = async (req, res) => {
    const { id } = req.params;
    const astrologer = await Astrologer.findById(id);
    astrologer.isTop = !astrologer.isTop;
    await astrologer.save();
    res.json(astrologer);
};

exports.distributeFlow = async (req, res) => {
    const users = req.body.users; // assuming an array of user objects
    const distribution = await distributeUsers(users);
    res.json(distribution);
};
