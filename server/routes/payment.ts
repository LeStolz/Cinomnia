import express from "express";
import { RequestInfo, RequestInit } from "node-fetch";

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));
export const payments = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const paypal = require("@paypal/checkout-server-sdk");
const Environment =
  process.env.NODE_ENV === "production"
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment;
const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
);

// const storeItems = new Map([
//   [1, { price: 100, name: "Learn React Today" }],
//   [2, { price: 200, name: "Learn CSS Today" }],
// ]);

payments.get("/", (req, res) => {
  res.render("index", {
    paypalClientId: process.env.PAYPAL_CLIENT_ID,
  });
});

payments.post("/create-order", async (req, res) => {
  let { storeItems } = req.body;
  storeItems = new Map(storeItems);
  const request = new paypal.orders.OrdersCreateRequest();
  const total = req.body.items.reduce(
    (sum: number, item: { id: number; quantity: number }) => {
      const storeItem = storeItems.get(item.id);
      if (storeItem) {
        return sum + storeItem.price * item.quantity;
      }
      return sum;
    },
    0
  );
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: total,
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: total,
            },
          },
        },
        items: req.body.items
          .map((item: { id: number; quantity: number }) => {
            const storeItem = storeItems.get(item.id);
            if (storeItem) {
              return {
                name: storeItem.name,
                unit_amount: {
                  currency_code: "USD",
                  value: storeItem.price,
                },
                quantity: item.quantity,
              };
            }
            return null;
          })
          .filter((item: any) => item !== null),
      },
    ],
  });

  try {
    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});
