import { Request, Response } from "express";
import userModel from "../models/user_model";
import bcrypt from 'bcrypt';
import { AuthResquest } from "../common";
import url from 'url';
import { getImageUrl } from "../routes/utils";
export class UsersController {
  async getById(req: Request, res: Response) {
    const report = await userModel.findById(req.params.id).select('-password -__v -refreshTokens').lean();
    res.send({
      ...report,
      imageUrl: getImageUrl(report.imageUrl)
    });
  }

  async updateUser(req: AuthResquest, res: Response) {
    const { password, fullname, imageUrl } = req.body;
    const userId = req.user?._id; // Extracted from JWT token after authMiddleware

    if (!userId) {
      return res.status(403).send("User ID not found in request.");
    }

    // Fields to update, ensuring email is not updated
    let updateFields: any = {};
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(password, salt);
    }
    if (fullname) updateFields.fullname = fullname;
    if (imageUrl) updateFields.imageUrl = imageUrl;

    try {
      // Ensure user is updating their own details
      const updatedUser = await userModel.findByIdAndUpdate(userId, updateFields, { new: true });

      if (!updatedUser) {
        return res.status(404).send("User not found.");
      }

      // Return updated user details, excluding sensitive fields like password
      return res.status(200).send({
        _id: updatedUser._id,
        email: updatedUser.email,
        fullname: updatedUser.fullname,
        imageUrl: updatedUser.imageUrl,
      });
    } catch (err) {
      return res.status(500).send("An error occurred while updating the user.");
    }
  }

}
