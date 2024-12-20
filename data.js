// notNull {
//   object: 'order',
//   id: 'order_01JCTVE36QG8YJ74X41WA5WC4S',
//   created_at: 2024-11-16T16:03:29.059Z,
//   updated_at: 2024-11-16T16:03:29.059Z,
//   status: 'pending',
//   fulfillment_status: 'not_fulfilled',
//   payment_status: 'awaiting',
//   display_id: 15,
//   cart_id: 'cart_01JCTVDT33P39539F97M1WRGJR',
//   customer_id: 'cus_01JBTT7VVSRAZ9EVBT181WJP83',
//   email: 'arunkp1122@gmail.com',
//   billing_address_id: 'addr_01JCTVDZCFN6P3MBKGWFPMD6VN',
//   shipping_address_id: 'addr_01JCTVDT33QM38XNJMJRYHRBE4',
//   region_id: 'reg_01JCNS04H28533F0DMWG2F8WK7',
//   currency_code: 'npr',
//   metadata: {},
//   sales_channel_id: 'sc_01JBTRXATVY3YYPEP1558B2P1V',
//   beforeInsert: [Function (anonymous)],
//   beforeUpdate: [Function (anonymous)],
//   afterLoad: [Function (anonymous)],
//   billing_address: Address {
//     id: 'addr_01JCTVDZCFN6P3MBKGWFPMD6VN',
//     created_at: 2024-11-16T16:03:25.177Z,
//     updated_at: 2024-11-16T16:03:25.177Z,
//     deleted_at: null,
//     customer_id: null,
//     company: '',
//     first_name: 'Arun',
//     last_name: 'Prajapati',
//     address_1: 'Dugure road 4, House No 15',
//     address_2: '',
//     city: 'Bhaktapur',
//     country_code: 'np',
//     province: '9',
//     postal_code: '44800',
//     phone: '9860465326',
//     metadata: null
//   },
//   claims: [],
//   customer: Customer {
//     id: 'cus_01JBTT7VVSRAZ9EVBT181WJP83',
//     created_at: 2024-11-04T05:26:54.582Z,
//     updated_at: 2024-11-16T14:28:43.328Z,
//     deleted_at: null,
//     email: 'arunkp1122@gmail.com',
//     first_name: 'Arun',
//     last_name: 'Prajapati',
//     billing_address_id: 'addr_01JCTP0JP19Z1JX6GMC4TJFPJR',
//     phone: '9860465326',
//     has_account: true,
//     metadata: null
//   },
//   discounts: [],
//   fulfillments: [],
//   gift_card_transactions: [],
//   gift_cards: [],
//   items: [
//     LineItem {
//       id: 'item_01JCTVDT4TNC8EAFHB8B3ZWQ9B',
//       created_at: 2024-11-16T16:03:19.823Z,
//       updated_at: 2024-11-16T16:03:29.059Z,
//       cart_id: 'cart_01JCTVDT33P39539F97M1WRGJR',
//       order_id: 'order_01JCTVE36QG8YJ74X41WA5WC4S',
//       swap_id: null,
//       claim_order_id: null,
//       original_item_id: null,
//       order_edit_id: null,
//       title: 'Tan Suede',
//       description: '40',
//       thumbnail: 'https://coseli-media.arunprajapati.com.np/Chelsea Boots (Black Softy Leather, Black Suede, Tan Suede) 9.png',
//       is_return: false,
//       is_giftcard: false,
//       should_merge: true,
//       allow_discounts: true,
//       has_shipping: false,
//       unit_price: 699900,
//       variant_id: 'variant_01JCQPB90TTBVYW210A0FW15H0',
//       quantity: 1,
//       fulfilled_quantity: null,
//       returned_quantity: null,
//       shipped_quantity: null,
//       metadata: {},
//       adjustments: [],
//       tax_lines: [Array],
//       variant: [ProductVariant],
//       subtotal: 699900,
//       discount_total: 0,
//       total: 790887,
//       original_total: 790887,
//       original_tax_total: 90987,
//       tax_total: 90987,
//       raw_discount_total: 0,
//       totals: [Object],
//       discounted_price: '7908.87 NPR',
//       price: '7908.87 NPR'
//     }
//   ],
//   payments: [
//     Payment {
//       id: 'pay_01JCTVE34KZ3SDJZMSJC04CTD3',
//       created_at: 2024-11-16T16:03:29.007Z,
//       updated_at: 2024-11-16T16:03:29.059Z,
//       swap_id: null,
//       cart_id: 'cart_01JCTVDT33P39539F97M1WRGJR',
//       order_id: 'order_01JCTVE36QG8YJ74X41WA5WC4S',
//       amount: 799927,
//       currency_code: 'npr',
//       amount_refunded: 0,
//       provider_id: 'manual',
//       data: [Object],
//       captured_at: null,
//       canceled_at: null,
//       metadata: null,
//       idempotency_key: null
//     }
//   ],
//   refunds: [],
//   region: Region {
//     id: 'reg_01JCNS04H28533F0DMWG2F8WK7',
//     created_at: 2024-11-14T16:44:42.397Z,
//     updated_at: 2024-11-14T16:48:30.193Z,
//     deleted_at: null,
//     name: 'Nepal',
//     currency_code: 'npr',
//     tax_rate: 13,
//     tax_code: null,
//     gift_cards_taxable: false,
//     automatic_taxes: false,
//     tax_provider_id: null,
//     metadata: null
//   },
//   returns: [],
//   shipping_address: Address {
//     id: 'addr_01JCTVDT33QM38XNJMJRYHRBE4',
//     created_at: 2024-11-16T16:03:19.776Z,
//     updated_at: 2024-11-16T16:03:25.177Z,
//     deleted_at: null,
//     customer_id: null,
//     company: '',
//     first_name: 'Arun',
//     last_name: 'Prajapati',
//     address_1: 'Dugure road 4, House No 15',
//     address_2: '',
//     city: 'Bhaktapur',
//     country_code: 'np',
//     province: '9',
//     postal_code: '44800',
//     phone: '9860465326',
//     metadata: null
//   },
//   shipping_methods: [
//     ShippingMethod {
//       id: 'sm_01JCTVE0PM0BGYX3NZ3XTBYW8Z',
//       shipping_option_id: 'so_01JCNS1H6N18B97GXHKWWPW7DJ',
//       order_id: 'order_01JCTVE36QG8YJ74X41WA5WC4S',
//       claim_order_id: null,
//       cart_id: 'cart_01JCTVDT33P39539F97M1WRGJR',
//       swap_id: null,
//       return_id: null,
//       price: 8000,
//       data: {},
//       shipping_option: [ShippingOption],
//       tax_lines: [Array]
//     }
//   ],
//   swaps: [],
//   shipping_total: '80.00 NPR',
//   discount_total: '0.00 NPR',
//   tax_total: '920.27 NPR',
//   gift_card_total: '0.00 NPR',
//   subtotal: '7908.87 NPR',
//   total: '7999.27 NPR',
//   date: 'Sat Nov 16 2024',
//   subtotal_ex_tax: '6999.00 NPR'
// }
