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
    const event = await req.json();
    const eventType = event?.event ?? "";
    const transaction = event?.data?.transaction ?? event?.data;

    if (!transaction) {
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const status = transaction?.status ?? "PENDING";
    const txId = String(transaction?.id ?? "");
    const reference = String(transaction?.reference ?? "");

    const orderStatus = status === "APPROVED" ? "paid" : "pending";
    const paymentStatus = status.toLowerCase();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error } = await supabase
      .from("orders")
      .update({
        status: orderStatus,
        wompi_transaction_id: txId,
        wompi_payment_status: paymentStatus,
      })
      .eq("id", reference);

    if (error) {
      console.error("Webhook DB update error:", error.message);
    }

    return new Response(JSON.stringify({ received: true, event: eventType }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
