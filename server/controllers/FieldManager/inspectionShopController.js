const multer = require("multer");
const path = require("path");
const InspectionShop = require("../../models/FieldManager/inspectionShopDetails");

// Configure Multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure the 'uploads/' folder exists
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now(); // Unique timestamp
    const extension = path.extname(file.originalname); // Extract file extension
    const uniqueFilename = `${timestamp}${extension}`; // Construct filename
    cb(null, uniqueFilename);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only JPEG, JPG, and PNG files are allowed!"), false); // Reject other file types
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  fileFilter: fileFilter,
}).single("photo"); // Ensure the field name in the form is 'photo'

// Controller function to create an inspection shop

// Controller to create InspectionShop
exports.createInspectionShop = (req, res) => {
  console.log("Creating Inspection Shop Details...");

  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer Error:", err.message);
      return res.status(400).json({ error: err.message });
    }

    try {
      const {
        fieldManagerId,
        PanShopOwner,
        shop_name,
        shop_address,
        shop_contact_number,
        shop_owner_name,
        Issues_Reported,
        Feedback_Provided,
        shop_Location,
        reviewsDetails,
        remarks,
      } = req.body;

      // Validate required fields
      if (!shop_name || !shop_address || !shop_contact_number) {
        return res.status(400).json({
          error:
            "shop_name, shop_address, and shop_contact_number are required.",
        });
      }

      // Parse shop_Location if provided
      let shopLocation = [];
      if (shop_Location) {
        const location = shop_Location
          .split(",")
          .map((coord) => parseFloat(coord.trim()));

        if (location.length !== 2 || isNaN(location[0]) || isNaN(location[1])) {
          return res.status(400).json({
            error:
              'Invalid shop_Location format. Expected "latitude, longitude".',
          });
        }

        shopLocation = [
          {
            latitude: location[0],
            longitude: location[1],
            timestamp: new Date(),
          },
        ];
      }

      // Parse reviewsDetails if provided
      let parsedReviewsDetails = [];
      if (reviewsDetails) {
        try {
          parsedReviewsDetails = JSON.parse(reviewsDetails).map((review) => {
            if (!review.rating) {
              throw new Error("Each review must contain a rating.");
            }

            return {
              fragrance: {
                rating: review.fragrance?.rating || null,
              },
              tasteAndFlavor: {
                rating: review.tasteAndFlavor?.rating || null,
              },
              productSimilarity: review.productSimilarity || null,
              reviews: {
                rating: review.reviews?.rating || null,
              },
              title: review.title || "Inspection Report", // Default title
            };
          });
        } catch (parseError) {
          return res.status(400).json({
            error: "Invalid reviewsDetails format. Must be a valid JSON array.",
          });
        }
      }

      // Create the document
      const newInspectionShop = new InspectionShop({
        fieldManagerId: fieldManagerId || null,
        PanShopOwner: PanShopOwner || null,
        shop_name,
        shop_address,
        shop_contact_number,
        shop_owner_name: shop_owner_name || null,
        Issues_Reported: Issues_Reported || null,
        Feedback_Provided: Feedback_Provided || null,
        Photos_Uploaded: req.file ? req.file.path : null,
        shop_Location: shopLocation,
        reviewsDetails: parsedReviewsDetails,
        remarks: remarks || "", // Default remarks if not provided
        status: "pending", // Default status
      });

      // Save to database
      const savedShop = await newInspectionShop.save();

      res.status(201).json({
        message: "Inspection Shop Details Created Successfully!",
        data: savedShop,
      });
    } catch (error) {
      console.error("Error creating inspection shop:", error.message);
      res.status(500).json({ error: error.message });
    }
  });
};

exports.getInspectionShop = async (req, res) => {
  console.log("Fetching Inspection Shop Details...");
  try {
    const inspectionShop = await InspectionShop.find().populate(
      "fieldManagerId"
    );

    if (!inspectionShop || inspectionShop.length === 0) {
      return res
        .status(404)
        .json({ message: "No inspection shop details found." });
    }

    res.status(200).json(inspectionShop);
  } catch (error) {
    console.error("Database Error:", error.message);
    res.status(500).json({
      error: "An error occurred while fetching inspection shop details.",
      details: error.message, // Optional: Include detailed error message for debugging
    });
  }
};

// Controller to fetch shop location by ID
exports.getShopLocationById = async (req, res) => {
  try {
    const shopId = req.params.id;

    // Fetch the shop by ID, selecting only the `shop_Location` field
    const shop = await InspectionShop.findById(shopId).select("shop_Location");

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Return the shop location data
    res.status(200).json(shop.shop_Location);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to update Inspection Shop details (excluding shop_Location)
exports.updateInspectionShop = async (req, res) => {
  console.log("Updating Inspection Shop Details...",req.body);

  // Handle file uploads (if files are passed)
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer Error:", err.message);
      return res.status(400).json({ error: err.message });
    }

    try {
      const { id } = req.params; // Get ID from request params

      // Find the existing InspectionShop document
      const existingShop = await InspectionShop.findById(id);
      if (!existingShop) {
        return res.status(404).json({ error: "Inspection Shop not found." });
      }

      // Extract the fields to update from req.body
      const {
        fieldManagerId,
        PanShopOwner,
        shop_name,
        shop_address,
        shop_contact_number,
        shop_owner_name,
        shopStatus,
        Issues_Reported,
        Feedback_Provided,
      } = req.body;
      console.log( fieldManagerId,
        PanShopOwner,
        shop_name,)
      // Handle Photos_Uploaded (if files are uploaded)
      let uploadedPhotos = existingShop.Photos_Uploaded; // Preserve existing photos
      //if (req.files && req.files.length > 0) {
        uploadedPhotos = req.file ? req.file.path : null
      //}

      // Update the fields (excluding shop_Location)
      existingShop.fieldManagerId =
        fieldManagerId || existingShop.fieldManagerId;
      existingShop.PanShopOwner = PanShopOwner || existingShop.PanShopOwner;
      existingShop.shop_name = shop_name || existingShop.shop_name;
      existingShop.shop_address = shop_address || existingShop.shop_address;
      existingShop.shop_contact_number =
        shop_contact_number || existingShop.shop_contact_number;
      existingShop.shop_owner_name =
        shop_owner_name || existingShop.shop_owner_name;
      existingShop.shopStatus = shopStatus || existingShop.shopStatus;
      existingShop.Issues_Reported =
        Issues_Reported || existingShop.Issues_Reported;
      existingShop.Feedback_Provided =
        Feedback_Provided || existingShop.Feedback_Provided;
      existingShop.Photos_Uploaded = uploadedPhotos;

      // Save the updated document
      await existingShop.save();

      return res.status(200).json({
        message: "Inspection Shop Details Updated Successfully!",
        data: existingShop,
      });
    } catch (error) {
      console.error("Error:", error.message);
      return res
        .status(500)
        .json({ error: "Error updating inspection shop details." });
    }
  });
};

exports.deleteInspectionShop = async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from request params

    // Find the InspectionShop document by ID
    const existingShop = await InspectionShop.findById(id);
    if (!existingShop) {
      return res.status(404).json({ error: "Inspection Shop not found." });
    }

    // Delete the document
    await existingShop.deleteOne();

    // Return success response
    return res.status(200).json({
      message: "Inspection Shop deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting Inspection Shop:", error.message);
    return res.status(500).json({ error: "Error deleting inspection shop." });
  }
};
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status, remarks } = req.body;

  try {
    // Find the document by id and update the status and remarks
    const updatedStatus = await InspectionShop.findByIdAndUpdate(
      id, // Find by the provided id
      { status, remarks }, // Update the status and remarks
      { new: true, runValidators: true } // 'new: true' returns the updated document, 'runValidators' ensures validation
    );

    // If no document is found with the given id
    if (!updatedStatus) {
      return res.status(404).json({ message: "Status not found" });
    }

    // Return the updated document
    return res.status(200).json(updatedStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
