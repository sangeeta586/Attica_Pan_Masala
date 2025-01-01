const ShowCase = require("../../models/FieldManager/ShowCase");
const createShowCase = async (req, res) => {
  try {
    const {
      productId,
      fieldManagerId,
      fragrance,
      tasteAndFlavor,
      productSimilarity,
      locations,
      reviews,
    } = req.body;

    // Validate required fields
    if (!productId || !fragrance || !tasteAndFlavor || !productSimilarity) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    // Helper function to normalize ratings
    const normalizeRating = (rating) => {
      if (Array.isArray(rating)) {
        // Convert all items to objects with a 'rating' field
        return rating.map((r) =>
          typeof r === "number" ? { rating: r } : { rating: r?.rating || 0 }
        );
      }
      return [{ rating: typeof rating === "number" ? rating : 0 }];
    };

    // Normalize fragrance and tasteAndFlavor
    const normalizedFragrance = normalizeRating(fragrance);
    const normalizedTasteAndFlavor = normalizeRating(tasteAndFlavor);

    // Validate ratings for fragrance and tasteAndFlavor
    const isValidRating = (ratings) =>
      ratings.every(
        (rating) =>
          typeof rating.rating === "number" &&
          rating.rating >= 1 &&
          rating.rating <= 10
      );

    if (!isValidRating(normalizedFragrance)) {
      return res
        .status(400)
        .json({ message: "Ratings for fragrance must be between 1 and 10." });
    }
    if (!isValidRating(normalizedTasteAndFlavor)) {
      return res
        .status(400)
        .json({
          message: "Ratings for taste and flavor must be between 1 and 10.",
        });
    }

    // Normalize reviews
    const normalizedReviews = Array.isArray(reviews)
      ? reviews.map((review) => ({
          rating: review?.rating || 0,
          timestamp: review?.timestamp || Date.now(),
        }))
      : [
          {
            rating: typeof reviews === "number" ? reviews : 0,
            timestamp: Date.now(),
          },
        ];

    // Validate reviews
    const isValidReview = (reviews) =>
      reviews.every(
        (review) =>
          typeof review.rating === "number" &&
          review.rating >= 1 &&
          review.rating <= 10
      );

    if (!isValidReview(normalizedReviews)) {
      return res
        .status(400)
        .json({ message: "Ratings for reviews must be between 1 and 10." });
    }

    // Normalize locations
    const normalizedLocations = Array.isArray(locations)
      ? locations.map((location) => ({
          latitude: location.latitude,
          longitude: location.longitude,
          timestamp: location.timestamp || Date.now(),
        }))
      : [];

    // Create the ShowCase object
    const newShowCase = new ShowCase({
      productId,
      fieldManagerId: fieldManagerId || null,
      fragrance: normalizedFragrance,
      tasteAndFlavor: normalizedTasteAndFlavor,
      productSimilarity,
      locations: normalizedLocations,
      reviews: normalizedReviews,
    });

    // Save the ShowCase object
    const savedShowCase = await newShowCase.save();

    // Respond with success
    res.status(201).json({
      message: "ShowCase created successfully.",
      data: savedShowCase,
    });
  } catch (error) {
    console.error("Error creating ShowCase:", error);
    res.status(500).json({
      message: "An error occurred while creating the ShowCase.",
      error: error.message,
    });
  }
};

const findShowCase = async (req, res) => {
  try {
    const showCases = await ShowCase.find().populate("productId").populate("fieldManagerId");
    res.status(200).json({ data: showCases });
  } catch (error) {
    console.error("Error finding ShowCases:", error);
    res.status(500).json({
      message: "An error occurred while finding the ShowCases.",
      error: error.message,
    });
  }
};

// Controller to find a ShowCase by ID
const findShowCaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const showCase = await ShowCase.findById(id).populate("productId");

    if (!showCase) {
      return res.status(404).json({ message: "ShowCase not found." });
    }

    res.status(200).json({ data: showCase });
  } catch (error) {
    console.error("Error finding ShowCase:", error);
    res.status(500).json({
      message: "An error occurred while finding the ShowCase.",
      error: error.message,
    });
  }
};

// Controller to find a ShowCase by ID
const findShowCaseByfieldManagerId = async (req, res) => {
  try {
    const { fieldManagerId } = req.params;
    const showCase = await ShowCase.find({
      fieldManagerId: fieldManagerId,
    }).populate("productId");

    if (!showCase) {
      return res.status(404).json({ message: "ShowCase not found." });
    }

    res.status(200).json({ data: showCase });
  } catch (error) {
    console.error("Error finding ShowCase:", error);
    res.status(500).json({
      message: "An error occurred while finding the ShowCase.",
      error: error.message,
    });
  }
};

// Controller to update a ShowCase by ID
const updateShowCaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedShowCase = await ShowCase.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedShowCase) {
      return res.status(404).json({ message: "ShowCase not found." });
    }

    res.status(200).json({
      message: "ShowCase updated successfully.",
      data: updatedShowCase,
    });
  } catch (error) {
    console.error("Error updating ShowCase:", error);
    res.status(500).json({
      message: "An error occurred while updating the ShowCase.",
      error: error.message,
    });
  }
};

// Controller to delete a ShowCase by ID
const deleteShowCaseById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedShowCase = await ShowCase.findByIdAndDelete(id);

    if (!deletedShowCase) {
      return res.status(404).json({ message: "ShowCase not found." });
    }

    res.status(200).json({
      message: "ShowCase deleted successfully.",
      data: deletedShowCase,
    });
  } catch (error) {
    console.error("Error deleting ShowCase:", error);
    res.status(500).json({
      message: "An error occurred while deleting the ShowCase.",
      error: error.message,
    });
  }
};

module.exports = {
  createShowCase,
  findShowCase,
  findShowCaseById,
  updateShowCaseById,
  deleteShowCaseById,
  findShowCaseByfieldManagerId,
};
