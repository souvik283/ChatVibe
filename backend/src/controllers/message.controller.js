import cloudinary from "../lib/cloudinary.js";
import messageModel from "../models/message.model.js";
import userModel from "../models/User.js";
import mongoose from "mongoose";

export async function getAllContactsHandler(req, res) {
  try {
    const loggedUserId = req.user._id;

    const contactUsers = await userModel
      .find({
        _id: { $ne: loggedUserId },
      })
      .select("name profileImg");

    return res.status(200).json({
      contactUsers: contactUsers
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
}

export async function getMessageByUserId(req, res) {
  try {
    const userId = req.user._id;
    const { id: userToChatId } = req.query;
    // console.log(userToChatId);

    const message = await messageModel.find({
      $or: [
        { senderId: userId, recieverId: userToChatId },
        { senderId: userToChatId, recieverId: userId },
      ],
    });

    if (message.length == 0) {
      return res.status(200).json({
        message: "No message found",
      });
    }

    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
}

export async function sendMessageToUser(req, res) {
  try {
    const { text, image } = req.body;

    if (!text && !image) {
      return res.status(400).json({
        message: "Text or image are required to send the message",
      });
    }

    const senderId = req.user._id;
    const recieverId  = req.params.id;

    if (senderId.equals(recieverId)) {
        return res.status(400).json({
            message: "Cannot send message to yourself"
        })
    }

    if (!mongoose.Types.ObjectId.isValid(recieverId)) {
    return res.status(400).json({
        message: "Invalid receiver ID"
    });
}

    const recieverExists = await userModel.exists({
        _id: recieverId
    })

    if (!recieverExists) {
        return res.status(404).json({
            message: "Reciever not found"
        })
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await messageModel.create({
      senderId,
      recieverId,
      text,
      image: imageUrl,
    });

    return res.status(201).json({
      message: "Message sent successfully",
    });
  } catch (error) {
    console.log(error);
    
    return res.status(501).json({
      message: "Internal Server Error",
    });
  }
}

export async function getChatsHandler(req, res) {
  try {
    const loggedUserId = req.user._id;

    const messages = await messageModel.find({
      $or: [{ senderId: loggedUserId }, { recieverId: loggedUserId }],
    });

    const chatPartnerId = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedUserId.toString()
            ? msg.recieverId.toString()
            : msg.senderId.toString(),
        ),
      ),
    ];

    const chatPartners = await userModel.find({
      _id: { $in: chatPartnerId },
    }).select("name profileImg")

    return res.status(201).json({
      chatPartners: chatPartners,
    });
  } catch (error) {
    console.log(error);

    return res.status(501).json({
      message: "Internal Server Error",
    });
  }
}
