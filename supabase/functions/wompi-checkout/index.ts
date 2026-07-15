import { createHash } from "node:crypto";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface CheckoutRequest {
  reference: string;
  amountInCents: number;
  currency: string;
  customerEmail?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body: CheckoutRequest = await req.json();

    if (!body.reference || !body.amountInCents || !body.currency) {
      return new Response(
        JSON.stringify({
          error: "reference, amountInCents and currency are required",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const integrityKey = Deno.env.get("WOMPI_INTEGRITY_KEY");

    if (!integrityKey) {
      return new Response(
        JSON.stringify({
          error: "Server misconfiguration: missing integrity key",
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Firma oficial para Wompi Widget Checkout:
    // SHA256(reference + amountInCents + currency + integrityKey)
    const signature = createHash("sha256")
      .update(
        `${body.reference}${body.amountInCents}${body.currency}${integrityKey}`
      )
      .digest("hex");

    const publicKey = Deno.env.get("WOMPI_PUBLIC_KEY");

    return new Response(
      JSON.stringify({
        publicKey,
        currency: body.currency,
        amountInCents: body.amountInCents,
        reference: body.reference,
        signature,
        customerEmail: body.customerEmail ?? null,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Internal error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});