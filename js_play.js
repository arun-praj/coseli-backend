class KhaltiClient {
	uri = "https://a.khalti.com/api/v2/";
	async initiate() {
		res = await fetch(this.uri + "/epayment/initiate/", {
			method: "POST",
			body: JSON.stringify({
				return_url: "https://coselinepal.com",
				website_url: "https://coselinepal.com",
				amount: 100,
				purchase_order_id: "1234",
				purchase_order_name: "1234",
			}),
		});
		return await res.data();
	}
}

c = new KhaltiClient();

async function test() {
	res = c.initiate();

	console.log(res);
}
test();
