import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

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

    const { transactionId, reference } = await req.json();

    if (!transactionId && !reference) {
      return new Response(
        JSON.stringify({ error: "transactionId or reference is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const publicKey = Deno.env.get("WOMPI_PUBLIC_KEY");
    if (!publicKey) {
      return new Response(
        JSON.stringify({ error: "Server misconfiguration: missing public key" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Query Wompi API for transaction status
    const wompiEnv = Deno.env.get("WOMPI_ENV") ?? "test";
    const apiUrl =
      wompiEnv === "prod"
        ? "https://api.wompi.co"
        : "https://api.wompi.co";

    const url = transactionId
      ? `${apiUrl}/v1/transactions/${transactionId}`
      : `${apiUrl}/v1/transactions?reference=${encodeURIComponent(reference)}`;

    const wompiRes = await fetch(url, {
      headers: { Authorization: `Bearer ${publicKey}` },
    });

    if (!wompiRes.ok) {
      return new Response(
        JSON.stringify({ error: `Wompi API error: ${wompiRes.status}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const wompiData = await wompiRes.json();
    const transaction = wompiData.data ?? wompiData;

    const status = transaction?.status ?? "PENDING";
    const txId = String(transaction?.id ?? transactionId ?? "");
    const txReference = String(transaction?.reference ?? reference ?? "");

    // Update order in Supabase
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const orderStatus = status === "APPROVED" ? "paid" : "pending";
    const paymentStatus = status.toLowerCase();

    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: orderStatus,
        wompi_transaction_id: txId,
        wompi_payment_status: paymentStatus,
      })
      .eq("id", txReference);

    if (updateError) {
      console.error("Failed to update order:", updateError.message);
    }

    return new Response(
      JSON.stringify({
        status: orderStatus,
        wompiStatus: status,
        transactionId: txId,
        reference: txReference,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
