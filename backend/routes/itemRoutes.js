const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Item = require("../models/Item");
const { protect } = require("../middleware/authMiddleware");

// @desc    Fetch all items
// @route   GET /api/items
// @access  Public
router.get(
	"/",
	asyncHandler(async (req, res) => {
		const keyword = req.query.keyword
			? {
					name: {
						$regex: req.query.keyword,
						$options: "i",
					},
			  }
			: {};

		const items = await Item.find({ ...keyword }).populate("user", "name");
		res.json(items);
	})
);

// @desc    Get logged in user items
// @route   GET /api/items/myitems
// @access  Private
router.get(
	"/myitems",
	protect,
	asyncHandler(async (req, res) => {
		const items = await Item.find({ user: req.user._id });
		res.json(items);
	})
);

// @desc    Fetch single item
// @route   GET /api/items/:id
// @access  Public
router.get(
	"/:id",
	asyncHandler(async (req, res) => {
		const item = await Item.findById(req.params.id).populate(
			"user",
			"name addresses"
		);

		if (item) {
			res.json(item);
		} else {
			res.status(404);
			throw new Error("Item not found");
		}
	})
);

// @desc    Create an item
// @route   POST /api/items
// @access  Private
router.post(
	"/",
	protect,
	asyncHandler(async (req, res) => {
		const { name, description, image, price } = req.body;

		const item = new Item({
			name,
			price,
			user: req.user._id,
			image,
			description,
		});

		const createdItem = await item.save();
		res.status(201).json(createdItem);
	})
);

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Private
router.delete(
	"/:id",
	protect,
	asyncHandler(async (req, res) => {
		const item = await Item.findById(req.params.id);

		if (item) {
			if (item.user.toString() !== req.user._id.toString()) {
				res.status(401);
				throw new Error("Not authorized");
			}
			await item.deleteOne();
			res.json({ message: "Item removed" });
		} else {
			res.status(404);
			throw new Error("Item not found");
		}
	})
);

module.exports = router;
