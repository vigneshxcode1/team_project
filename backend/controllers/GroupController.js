import mongoose from "mongoose";
import StudyGroupmodel from "../Model/Studygroup.js";

export const creategroup = async (req, res) => {
  const {
    name,
    desc,
    subject,
    topic,
    exampreparation,
    StudyStyle,
    MaxMember,
    isVirtual,
    location,
    members,
  } = req.body;
  try {
    const newgroup = new StudyGroupmodel({
      name,
      desc,
      subject,
      topic,
      exampreparation,
      StudyStyle,
      MaxMember,
      isVirtual,
      location,
      members,
    });

    await newgroup.save();
    res.status(201).json({
      message: "Study group created successfully",
      group: newgroup,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getallgroup = async (req, res) => {
  try {
    const group = await StudyGroupmodel.find().populate("members");
    const groups = group.length;
    res
      .status(201)
      .json({ message: "Study group created successfully", groups, group });
  } catch (err) {
    console.log(err);
  }
};

export const getGroupsBySubject = async (req, res) => {
  const { subject } = req.params;

  try {
    const groups = await StudyGroupmodel.find({ subject }).populate("members");
    const grouplen = groups.length;

    res.status(200).json({ grouplen, groups });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getGroupsBytopic = async (req, res) => {
  const { topic } = req.params;

  try {
    const groups = await StudyGroupmodel.find({ topic }).populate("members");
    const grouplen = groups.length;

    res.status(200).json({ grouplen, groups });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getGroupsByexampreparation = async (req, res) => {
  const {  exampreparation } = req.params;

  try {
    const groups = await StudyGroupmodel.find({ exampreparation }).populate("members");
    const grouplen = groups.length;

    res.status(200).json({ grouplen, groups });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const joingroup = async (req, res) => {
  const { id } = req.params;



  try {
    const group = await StudyGroupmodel.findById(id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (group.members.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "You are already a member of this group" });
    }

    group.members.push(req.user.id);
    await group.save();

    const updatedGroup = await StudyGroupmodel.findById(id).populate("members");

    res.status(200).json({
      message: "Successfully joined the group",
      group: updatedGroup,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to join the group" });
  }
};

export const getallmyjoingroup = async (req, res) => {
  try {
    const { ip } = req.params;

    const groups = await StudyGroupmodel.find({ ip }).populate("members");

    if (groups.length === 0) {
      return res
        .status(404)
        .json({ message: "You have not joined any groups" });
    }

    res.status(200).json({ message: "Groups fetched successfully", groups });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch groups" });
  }
};



export const leavegroup = async (req, res) => {


  const { id } = req.params;

  try {
    const group = await StudyGroupmodel.findById(id);

  if (!group) {
    return res.status(404).json({ message: "Group not found" });
  }

  const ismember = await group.members.includes(req.user.id);

  if (!ismember) {
    return res
      .status(400)
      .json({ message: "You are not a member of this group" });
  }

  group.members = group.members.filter(
    (memberid) => memberid.toString() != req.user.id.toString()
  );

  await group.save()

  const updatedGroup = await StudyGroupmodel.findById(id).populate("members")

  res.status(200).json({
    message: "leaved group",
    success: true,
    updatedGroup
  });
  } catch (err) {
    console.log(err)
  }
  
};
