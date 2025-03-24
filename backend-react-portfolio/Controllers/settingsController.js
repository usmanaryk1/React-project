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

// CREATE SETTINGS
const createSettings = async (req, res) => {
  try {
    const { title, subtitle } = req.body;

    // Check if section already exists
    let existingData = await Settings_Model.findOne({ title });
    if (existingData) {
      return res.status(400).json({ error: "Same data already exists" });
    }

    const newSetting = new Settings_Model({ title, subtitle });
    await newSetting.save();
    return res.status(201).json(newSetting);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create setting" });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const updatedSetting = await Settings_Model.findByIdAndUpdate(
      req.params.id,
      { title, subtitle },
      { new: true }
    );

    if (!updatedSetting) {
      return res.status(404).json({ error: "Setting not found" });
    }

    return res.status(200).json(updatedSetting);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update setting" });
  }
};

module.exports = { getSettings, createSettings, updateSettings };
