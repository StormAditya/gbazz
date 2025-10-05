const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User.js");

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			const user = await User.findById(decoded.id).select("-password");

			if (!user) {
				return res.status(401).json({
					message: "Not authorized, user no longer exists",
				});
			}

			req.user = user;
			next();
		} catch (error) {
			console.error("Auth error:", error);
			return res.status(401).json({
				message: "Not authorized, token failed",
			});
		}
	} else {
		return res.status(401).json({ message: "Not authorized, no token" });
	}
});

module.exports = { protect };
