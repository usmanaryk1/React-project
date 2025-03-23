const Settings_Model = require("../models/SettingsSchema");

const getSettings = async (req, res) => {
  try {
    const settings = await Settings_Model.find();
    if (!settings) {
      return res.status(404).json({ message: "No settings found" });
    }

    return res.status(200).json(settings);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

const updateSettings = async (req, res) => {
  const sectionTitle = req.params.title;
  try {
    const updatedSetting = await SectionSetting.findOneAndUpdate(
      { sectionTitle },
      req.body,
      { new: true, upsert: true }
    );

    return res.status(200).json(updatedSetting);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update." });
  }
};

module.exports = { getSettings, updateSettings };
