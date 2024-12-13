// import { AbstractNotificationService } from "@medusajs/medusa";
// import { EntityManager } from "typeorm";
// import nodemailer from "nodemailer";
// import EmailTemplates from "email-templates";

// import { NotificationService, Logger, OrderService } from "medusa-interfaces";

// interface EmailConfig {
// 	templateDir: string;
// 	fromAddress: string;
// 	smtpHost: string;
// 	secure: boolean;
// 	smtpPort: number;
// 	smtpUser: string;
// 	smtpPassword: string;
// }

// class EmailSenderService extends AbstractNotificationService {
// 	static identifier = "email-sender";

// 	protected manager_: EntityManager;
// 	protected transactionManager_: EntityManager;

// 	protected orderService: OrderService;
// 	protected cartService: any;
// 	protected lineItemService: any;
// 	protected logger: Logger;
// 	protected emailConfig: EmailConfig;

// 	constructor(container: any, _options: EmailConfig) {
// 		super(container);

// 		this.orderService = container.orderService;
// 		this.cartService = container.cartService;
// 		this.lineItemService = container.lineItemService;
// 		this.emailConfig = _options;

// 		if (!this.emailConfig.templateDir) {
// 			this.emailConfig.templateDir = "data/email-templates";
// 		}
// 	}

// 	async sendNotification(
// 		event: string,
// 		data: unknown,
// 		attachmentGenerator: unknown
// 	): Promise<{
// 		to: string;
// 		status: string;
// 		data: Record<string, unknown>;
// 	}> {
// 		if (event.includes("order.")) {
// 			// retrieve order
// 			// @ts-ignore
// 			const order = await this.orderService.retrieve(data.id || "", {
// 				relations: [
// 					"refunds",
// 					"items",
// 					"customer",
// 					"billing_address",
// 					"shipping_address",
// 					"discounts",
// 					"discounts.rule",
// 					"shipping_methods",
// 					"shipping_methods.shipping_option",
// 					"payments",
// 					"fulfillments",
// 					"fulfillments.tracking_links",
// 					"returns",
// 					"gift_cards",
// 					"gift_card_transactions",
// 				],
// 			});
// 			this.logger.info(`Order: ${JSON.stringify(order)}`);

// 			let totalValue = order.items.reduce((value, item) => {
// 				return value + item.unit_price * item.quantity;
// 			}, 0);
// 			for (const option of order.shipping_methods) {
// 				totalValue += option.shipping_option.amount;
// 			}
// 			await this.sendEmail(order.email, event, {
// 				event,
// 				order,
// 				cart: await this.cartService.retrieve(order.cart_id || ""),
// 				id: data.id,
// 				total_value: (totalValue / 100).toFixed(2),
// 			});

// 			return {
// 				to: order.email,
// 				data: data,
// 				status: "sent",
// 			};
// 		}

// 		if (event.includes("invite.")) {
// 		}
// 		return {
// 			to: null,
// 			data: {},
// 			status: "sent",
// 		};
// 	}
// 	resendNotification(
// 		notification: unknown,
// 		config: unknown,
// 		attachmentGenerator: unknown
// 	): Promise<{
// 		to: string;
// 		status: string;
// 		data: Record<string, unknown>;
// 	}> {
// 		throw new Error("Method not implemented.");
// 	}

// 	sendEmail(toAddresss: string, templateName: string, data: any) {
// 		const transport = nodemailer.createTransport({
// 			host: this.emailConfig.smtpHost,
// 			port: this.emailConfig.smtpPort,
// 			secure: this.emailConfig.secure,
// 			auth: {
// 				user: this.emailConfig.smtpUser,
// 				pass: this.emailConfig.smtpPassword,
// 			},
// 		});
// 	}
// }
