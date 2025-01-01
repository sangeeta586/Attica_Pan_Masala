const VendorNotIntrested = require("../../models/FieldManager/VendorNotIntrested");

exports.createVendorNotIntrested = async (req, res) => {
  try {
    const {
      fieldManagerId,
      shopName,
      ownerName,
      contactNumber,
      reasonForNotRegistering,
      otherReasonDetails,
      vendorNotIntrested_Location,
    } = req.body;

    if (!ownerName || !contactNumber || !reasonForNotRegistering) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (
      reasonForNotRegistering !== "other" &&
      otherReasonDetails &&
      otherReasonDetails.trim() !== ""
    ) {
      return res
        .status(400)
        .json({ message: "Other reason details are not allowed." });
    }

    if (
      vendorNotIntrested_Location &&
      !Array.isArray(vendorNotIntrested_Location)
    ) {
      return res
        .status(400)
        .json({ message: "Location data must be an array" });
    }

    const vendor = new VendorNotIntrested({
      fieldManagerId: fieldManagerId || null,
      shopName: shopName || null,
      ownerName,
      contactNumber,
      reasonForNotRegistering,
      otherReasonDetails:
        reasonForNotRegistering === "other" ? otherReasonDetails : null,
      vendorNotIntrested_Location: vendorNotIntrested_Location || [],
    });

    await vendor.save();

    res.status(201).json({
      message: "Vendor record created successfully",
      vendor,
    });
  } catch (error) {
    console.error("Error creating vendor record:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllVendorNotIntrested = async (req, res) => {
  try {
    const vendors = await VendorNotIntrested.find();
    res.status(200).json(vendors);
  } catch (error) {
    console.error("Error getting vendor records:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateVendorNotIntrested = async (req, res) => {
  try {
    const {
      shopName,
      ownerName,
      contactNumber,
      reasonForNotRegistering,
      otherReasonDetails,
    } = req.body;

    const updatedVendor = await VendorNotIntrested.findByIdAndUpdate(
      req.params.id,
      {
        shopName,
        ownerName,
        contactNumber,
        reasonForNotRegistering,
        otherReasonDetails,
      },
      { new: true }
    );

    if (!updatedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res
      .status(200)
      .json({ message: "Vendor record updated successfully", updatedVendor });
  } catch (error) {
    console.error("Error updating vendor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a vendor record by ID
exports.deleteVendorNotIntrested = async (req, res) => {
  try {
    const deletedVendor = await VendorNotIntrested.findByIdAndDelete(
      req.params.id
    );

    if (!deletedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({ message: "Vendor record deleted successfully" });
  } catch (error) {
    console.error("Error deleting vendor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
