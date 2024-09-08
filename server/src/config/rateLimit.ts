import rateLimit from "express-rate-limit";

export const appLimiter = rateLimit({
	windowMs: 30 * 60 * 1000, // 30 minutes
	limit: 30, // Limit each IP to 30 requests per `window` (here, per 30 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

export const authLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60 minutes
	limit: 20, // Limit each IP to 20 requests per `window` (here, per 60 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});