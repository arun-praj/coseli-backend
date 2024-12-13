import {
	AbstractPaymentProcessor,
	PaymentProcessorSessionResponse,
	PaymentProcessorContext,
	PaymentProcessorError,
	PaymentSessionStatus,
	PaymentProviderService,
} from "@medusajs/medusa";

// @@ Medusa doc: https://docs.medusajs.com/v1/references/medusa/interfaces/medusa.PaymentProcessor#updatepayment
// @@ khalti API:

// @ Life cycle of Custom payment provider
// 1. initatePayment - Initiate the payment by calling the Khalti API saying we are ready to start a transation. Called when you click on payment provider on frontend

// 2. updatePayment - If during your checkout process you go back and add a new product you need to send a request to Khalti saying that your payment amount has changed
// Called automatically after initialPayment

// 3.

class KhaltiClient {
	uri = "https://a.khalti.com/api/v2";
	async initiate(context) {
		const myHeaders = new Headers();
		myHeaders.append(
			"Authorization",
			`Key ${process.env.KHALTI_SECRET_KEY}`
		);
		myHeaders.append("Content-Type", "application/json");
		try {
			const res = await fetch(this.uri + "/epayment/initiate/", {
				method: "POST",
				headers: myHeaders,
				body: JSON.stringify({
					return_url:
						"https://coselinepal.com/np/checkout?step=review",
					website_url: "https://coselinepal.com",
					amount: 10000,
					purchase_order_id: "1234",
					purchase_order_name: "1234",
				}),
			});
			return await res.json();
		} catch (e) {
			return {
				error: e.message,
			};
		}
	}
	async update(context) {}
	async authorize(paymentSessionDataID: number) {}
	async delete(paymentSessionDataID: number) {}
}

class KhaltiPaymentService extends AbstractPaymentProcessor {
	// methods here...
	static identifier = "khalti-payment";
	client: any = "";
	protected paymentProviderService: PaymentProviderService;
	constructor(container, options) {
		super(container);
		// this.client = new Client(options);
		this.client = new KhaltiClient();
	}

	async initiatePayment(
		context: PaymentProcessorContext
	): Promise<PaymentProcessorError | PaymentProcessorSessionResponse> {
		// communicating with a third-party service.

		// 1. Merchant requests Khalti to initiate the online payment.
		// 2. Khalti returns pidx and payment_url
		// 3. The user must be redirected to payment_url (How?)
		const clientPayment = await this.client.initiate(context);

		return {
			session_data: {
				id: clientPayment.pidx,
				payment_url: clientPayment.payment_url,
			},
		};
	}

	async updatePayment(
		context: PaymentProcessorContext
	): Promise<void | PaymentProcessorError | PaymentProcessorSessionResponse> {
		// assuming client is an initialized client
		// communicating with a third-party service.
		const paymentId = context.paymentSessionData.id;
		if (context.amount * 100 != context.paymentSessionData.amount) {
			await this.client.update(paymentId, context);
		}

		return {
			session_data: context.paymentSessionData,
		};
	}

	async authorizePayment(
		paymentSessionData: Record<string, unknown>,
		context: Record<string, unknown>
	): Promise<
		| PaymentProcessorError
		| {
				status: PaymentSessionStatus;
				data: Record<string, unknown>;
		  }
	> {
		// once the payment is done update necessary things in here
		// This is called when the cart is completed and before the order is created.

		try {
			await this.client.authorize(paymentSessionData.id);

			return {
				status: PaymentSessionStatus.AUTHORIZED,
				data: {
					id: paymentSessionData.id,
				},
			};
		} catch (e) {
			return {
				error: e.message,
			};
		}
	}

	async capturePayment(
		paymentSessionData: Record<string, unknown>
	): Promise<Record<string, unknown> | PaymentProcessorError> {
		// Usually initiated manually by store operator from the admin
		// But if we are using khalti, this should be triggered automatically when transction  is successfull.
		const paymentId = paymentSessionData.id;
		const captureData = this.client.catch(paymentId);

		return {
			id: paymentId,
			...captureData,
		};
	}

	async cancelPayment(
		paymentSessionData: Record<string, unknown>
	): Promise<Record<string, unknown> | PaymentProcessorError> {
		const paymentId = paymentSessionData.id;

		// assuming client is an initialized client
		// communicating with a third-party service.
		const cancelData = this.client.cancel(paymentId);

		return {
			id: paymentId,
			...cancelData,
		};
	}

	async deletePayment(
		paymentSessionData: Record<string, unknown>
	): Promise<Record<string, unknown> | PaymentProcessorError> {
		const paymentId = paymentSessionData.id;
		// assuming client is an initialized client
		// communicating with a third-party service.
		this.client.delete(paymentId);

		return {};
	}

	async getPaymentStatus(
		paymentSessionData: Record<string, unknown>
	): Promise<PaymentSessionStatus> {
		const paymentId = paymentSessionData.id;

		// assuming client is an initialized client
		// communicating with a third-party service.
		return (await this.client.getStatus(paymentId)) as PaymentSessionStatus;
	}

	async refundPayment(
		paymentSessionData: Record<string, unknown>,
		refundAmount: number
	): Promise<Record<string, unknown> | PaymentProcessorError> {
		const paymentId = paymentSessionData.id;

		// assuming client is an initialized client
		// communicating with a third-party service.
		const refundData = this.client.refund(paymentId, refundAmount);

		return {
			id: paymentId,
			...refundData,
		};
	}
	async retrievePayment(
		paymentSessionData: Record<string, unknown>
	): Promise<Record<string, unknown> | PaymentProcessorError> {
		const paymentId = paymentSessionData.id;

		return await this.client.retrieve(paymentId);
	}

	async updatePaymentData(
		sessionId: string,
		data: Record<string, unknown>
	): Promise<Record<string, unknown> | PaymentProcessorError> {
		const paymentSession =
			await this.paymentProviderService.retrieveSession(sessionId);
		// assuming client is an initialized client
		// communicating with a third-party service.
		const clientPayment = await this.client.update(
			paymentSession.data.id,
			data
		);

		return {
			id: clientPayment.id,
		};
	}
	//   protected buildError(
	//     message: string,
	//     e: PaymentProcessorError | Error
	//   ): PaymentProcessorError {
	//     return {
	//       error: message,
	//       code: "code" in e ? e.code : "",
	//       detail: isPaymentProcessorError(e)
	//         ? `${e.error}${EOL}${e.detail ?? ""}`
	//         : "detail" in e
	//         ? e.detail
	//         : e.message ?? "",
	//     }
}

export default KhaltiPaymentService;
