import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { AuthResquest } from "../common";
import { getImageUrl } from "../routes/utils";
import { UsersModel } from "../models/users";
export class UsersController {
  async getById(req: Request, res: Response) {
    try {
      const report = await UsersModel.findById(req.params.id)
        .select("-password -__v -refreshTokens")
        .lean();
      res.send({
        ...report,
        imageUrl: getImageUrl(report.imageUrl),
      });
    } catch (e) {
      res.sendStatus(500);
    }
  }

  async updateUser(req: AuthResquest, res: Response) {
    const { password, fullname, imageUrl } = req.body;
    const userId = req.user?._id; // Extracted from JWT token after authMiddleware

    if (!userId) {
      return res.status(403).send("User ID not found in request.");
    }

    // Fields to update, ensuring email is not updated
    const updateFields: any = {};
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(password, salt);
    }
    if (fullname) updateFields.fullname = fullname;
    if (imageUrl) updateFields.imageUrl = imageUrl;

    try {
      // Ensure user is updating their own details
      const updatedUser = await UsersModel.findByIdAndUpdate(
        userId,
        updateFields,
        { new: true }
      );

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
