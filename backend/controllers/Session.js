import StudyGroupmodel from "../Model/Studygroup.js";
import session from "../Model/Session.js";


export const createSession = async (req, res) => {
  const { groupId, title, date, duration, location } = req.body;

  try {
    const group = await StudyGroupmodel.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const newSession = new session({
      group: groupId,
      title,
      date,
      duration,
      location
    });

    await newSession.save();

    
    group.upcomingSessions.push({ date, location });
    await group.save();

    res.status(201).json({ message: "Session created successfully", session: newSession });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export const getSessions = async (req, res) => {
  const { groupId } = req.params;

  try {
    const sessions = await session.find({ group: groupId });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
