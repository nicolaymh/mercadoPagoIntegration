import mercadopago from "mercadopago";
import { HOST, MERCADOPAGO_API_KEY } from "../config.js";

export const createOrder = async (req, res) => {
   mercadopago.configure({
      access_token: MERCADOPAGO_API_KEY,
   });

   const result = await mercadopago.preferences.create({
      items: [
         {
            title: "Laptop Lenovo",
            unit_price: 10000,
            currency_id: "COP",
            quantity: 1,
         },
      ],

      back_urls: {
         success: `${HOST}/success`,
         failure: `${HOST}/failure`,
         pending: `${HOST}/pending`,
      },

      notification_url: "https://cc48-186-155-112-111.ngrok.io/webhook",
   });

   console.log(result);

   res.send(result.body);
};

export const success = (req, res) => res.send("Success");

export const receiveWebhook = async (req, res) => {
   console.log(req.query);
   const payment = req.query;

   try {
      if (payment.type === "payment") {
         const data = await mercadopago.payment.findById(payment["data.id"]);
         console.log(data);
         //Store in DB..
      }

      res.sendStatus(204);
   } catch (error) {
      console.log(error);
      return res.sendStatus(500).json({ error: error.message });
   }
};
