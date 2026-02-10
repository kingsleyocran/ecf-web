// pages/api/subscribe.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, firstName, lastName } = req.body;

  if (!email || !email.includes("@") || !firstName || !lastName) {
    return res.status(400).json({ error: "Email, first name, and last name are required" });
  }

  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const SENDGRID_LIST_ID = process.env.SENDGRID_LIST_ID;

  if (!SENDGRID_API_KEY || !SENDGRID_LIST_ID) {
    console.error("SendGrid configuration missing");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    // Add contact to SendGrid Marketing Contacts list
    const response = await fetch(
      `https://api.sendgrid.com/v3/marketing/contacts`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          list_ids: [SENDGRID_LIST_ID],
          contacts: [
            {
              email: email.trim(),
              first_name: firstName.trim(),
              last_name: lastName.trim(),
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("SendGrid API error:", errorData);
      
      // Handle duplicate email error gracefully
      if (response.status === 400 && errorData.errors) {
        const duplicateError = errorData.errors.find(
          (err: any) => err.message?.includes("already exists")
        );
        if (duplicateError) {
          // Update existing contact instead
          const updateResponse = await fetch(
            `https://api.sendgrid.com/v3/marketing/contacts`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${SENDGRID_API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                list_ids: [SENDGRID_LIST_ID],
                contacts: [
                  {
                    email: email,
                    first_name: firstName,
                    last_name: lastName,
                  },
                ],
              }),
            }
          );

          if (updateResponse.ok) {
            return res.status(200).json({ message: "Successfully subscribed!" });
          }
        }
      }

      return res
        .status(500)
        .json({ error: errorData.errors?.[0]?.message || "Error subscribing" });
    }

    return res.status(201).json({ message: "Successfully subscribed!" });
  } catch (error: any) {
    console.error("SendGrid subscription error:", error);
    return res.status(500).json({ error: "Error subscribing to newsletter" });
  }
}
