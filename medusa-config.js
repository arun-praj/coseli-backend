const dotenv = require("dotenv");

let ENV_FILE_NAME = ".env.production";
switch (process.env.NODE_ENV) {
	case "production":
		ENV_FILE_NAME = ".env.production";
		break;
	case "staging":
		ENV_FILE_NAME = ".env.staging";
		break;
	case "test":
		ENV_FILE_NAME = ".env.test";
		break;
	case "development":
	default:
		ENV_FILE_NAME = ".env";
		break;
}

try {
	dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS =
	process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

const DATABASE_URL =
	process.env.DATABASE_URL || "postgres://localhost/medusa-starter-default";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const plugins = [
	`medusa-fulfillment-manual`,
	`medusa-payment-manual`,
	{
		resolve: `@medusajs/file-local`,
		options: {
			upload_dir: "uploads",
		},
	},
	{
		resolve: "@medusajs/admin",
		/** @type {import('@medusajs/admin').PluginOptions} */
		options: {
			autoRebuild: true,
			serve: true,
			path: "/apple",
			backend: process.env.BACKEND_URL,
			develop: {
				open: process.env.OPEN_BROWSER !== "false",
			},
		},
	},
	{
		resolve: "@rootxpdev/medusa-email-plugin",
		options: {
			templateDir:
				"node_modules/@rootxpdev/medusa-email-plugin/data/emails",
			fromAddress: "prajapati@coselifootwear.com",
			smtpHost: "mail.coselifootwear.com",
			smtpPort: 587,
			smtpUser: "prajapati@coselifootwear.com",
			smtpPassword: "1QjY9Po0g5524mcw5iEXOObHdHDxprZUKf5ufRc",
		},
	},
	{
		resolve: "medusa-file-r2",
		options: {
			account_id: process.env.R2_Account_ID,
			access_key: process.env.R2_ACCESS_KEY_ID,
			secret_key: process.env.R2_SECRET_ACCESS_KEY,
			bucket: process.env.R2_BUCKET_NAME,
			public_url: process.env.R2_S3_API,
		},
	},
	{
		resolve: `medusa-plugin-meilisearch`,
		options: {
			config: {
				host: process.env.MEILISEARCH_HOST,
				apiKey: process.env.MEILISEARCH_API_KEY,
			},
			settings: {
				products: {
					indexSettings: {
						searchableAttributes: [
							"title",
							"description",
							"variant_sku",
						],
						displayedAttributes: [
							"title",
							"description",
							"variant_sku",
							"thumbnail",
							"handle",
						],
					},
					primaryKey: "id",
					transformer: (product) => ({
						id: product.id,
						title: product.title,
						description: product.description,
						variant_sku: product.variant_sku,
						thumbnail: product.thumbnail,
						handle: product.handle,
						// include other attributes as needed
					}),
				},
			},
		},
	},
	{
		resolve: "medusa-plugin-variant-images",
		options: {
			enableUI: true,
		},
	},
	{
		resolve: `@rsc-labs/medusa-store-analytics`,
		options: {
			enableUI: true,
		},
	},
	{
		resolve: `@rsc-labs/medusa-marketing`,
		options: {
			enableUI: true,
		},
		email_transports: [
			{
				name: "smtp",
				configuration: {
					host: "mail.coselifootwear.com",
					port: 465,
					secure: true,
					auth: {
						user: "business@coselifootwear.com",
						pass: "Coseli1992!",
					},
				},
			},
		],
	},
	{
		resolve: `medusa-plugin-mailjet`,
		options: {
			public_key: process.env.MAILJET_PUBLIC_KEY, //required
			private_key: process.env.MAILJET_PRIVATE_KEY, //required
			from: "CoseliNepal no-reply@coselinepal.com", //Name[space]email
			template_error_reporting: "CoseliNepal no-reply@coselinepal.com", //to use mailjet's template error reporting
			customer_created_template: 6477538,
			gift_card_created_template: "[used on gift_card.created]",
			order_placed_template: 6476891,
			order_canceled_template: "[used on order.canceled]",
			order_shipped_template: "[used on order.shipment_created]",
			order_completed_template: 6476891,
			user_password_reset_template: "[used on user.password_reset]",
			customer_password_reset_template:
				"[used on customer.password_reset]",
			localization: {
				"en-EN": {
					// locale key
					customer_created_template: "[used on customer.created]",
					gift_card_created_template: "[used on gift_card.created]",
					order_placed_template: "[used on order.placed]",
					order_canceled_template: "[used on order.canceled]",
					order_shipped_template: "[used on order.shipment_created]",
					order_completed_template: "[used on order.completed]",
					user_password_reset_template:
						"[used on user.password_reset]",
					customer_password_reset_template:
						"[used on customer.password_reset]",
				},
			},
		},
	},
];

const modules = {
	eventBus: {
		resolve: "@medusajs/event-bus-redis",
		options: {
			redisUrl: REDIS_URL,
		},
	},
	cacheService: {
		resolve: "@medusajs/cache-redis",
		options: {
			redisUrl: REDIS_URL,
		},
	},
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
	jwt_secret: process.env.JWT_SECRET || "supersecret",
	cookie_secret: process.env.COOKIE_SECRET || "supersecret",
	store_cors: STORE_CORS,
	database_url: DATABASE_URL,
	admin_cors: ADMIN_CORS,
	database_extra:
		process.env.NODE_ENV !== "development"
			? {
					ssl: {
						rejectUnauthorized: true,
					},
			  }
			: {},
	// Uncomment the following lines to enable REDIS
	redis_url: REDIS_URL,
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
	projectConfig,
	plugins,
	modules,
};
