import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const resendApiKey = Deno.env.get("RESEND_API_KEY") ?? "";

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json().catch(() => ({}));
    console.log("Webhook payload received:", JSON.stringify(body, null, 2));

    // Extract status and verify if it's paid
    const paymentStatus = (
      body.payment?.status || 
      body.status || 
      body.data?.status || 
      ""
    ).trim().toLowerCase();

    if (paymentStatus && paymentStatus !== "paid" && paymentStatus !== "approved" && paymentStatus !== "completed") {
      console.log(`Payment status is '${paymentStatus}'. Skipping access creation and email.`);
      return new Response(
        JSON.stringify({
          success: true,
          message: `Payment status is '${paymentStatus}'. Skipping access creation.`,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Extract email and name using multi-gateway fallback
    const email = (
      body.Customer?.email || 
      body.customer?.email || 
      body.data?.buyer?.email || 
      body.buyer?.email || 
      body.email || 
      ""
    ).trim().toLowerCase();

    const rawName = (
      body.Customer?.name || 
      body.customer?.name || 
      body.data?.buyer?.name || 
      body.buyer?.name || 
      body.name || 
      body.customer?.first_name || 
      "Aluna(o)"
    ).trim();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email not found in payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Generate random 6-digit numeric password
    const password = Math.floor(100000 + Math.random() * 900000).toString();

    // Insert or update member in database
    const { data: member, error: dbError } = await supabase
      .from("members")
      .upsert(
        { email, name: rawName, password },
        { onConflict: "email" }
      )
      .select()
      .single();

    if (dbError) {
      console.error("Database error inserting member:", dbError);
      return new Response(JSON.stringify({ error: "Database error", details: dbError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Member registered successfully: ${email} with password: ${password}`);

    // Send email via Resend if API Key is configured
    let emailSent = false;
    let resendMessage = "";

    if (resendApiKey) {
      console.log("Sending access email via Resend...");
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Suporte X-Bolo <suporte@bologourmetlucrativo.hyzencompra.shop>",
          to: email,
          subject: "Seu acesso ao X-Bolo Gourmet Lucrativo chegou! 🎂",
          html: `
            <div style="font-family: sans-serif; color: #4E2A1E; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E5DED3; border-radius: 12px;">
              <h2 style="color: #4E2A1E; text-align: center;">Seja muito bem-vinda(o) ao X-Bolo Gourmet Lucrativo! 🎂✨</h2>
              <p>Olá <strong>${rawName}</strong>,</p>
              <p>Sua compra foi aprovada com sucesso! Aqui estão as suas credenciais para acessar a nossa Área de Membros exclusiva:</p>
              
              <div style="background-color: #F5F1EA; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center; border: 1px solid #E5DED3;">
                <p style="margin: 5px 0;"><strong>Link de Acesso:</strong> <a href="https://bologourmetlucrativo.netlify.app/login" style="color: #4E2A1E; font-weight: bold;">Acessar Área de Membros</a></p>
                <p style="margin: 5px 0;"><strong>Seu E-mail:</strong> <code>${email}</code></p>
                <p style="margin: 5px 0;"><strong>Sua Senha de Acesso:</strong> <code style="font-size: 18px; color: #F4C95D; background-color: #4E2A1E; padding: 3px 8px; border-radius: 4px; font-weight: bold;">${password}</code></p>
              </div>

              <p>Ao fazer o login, você já terá acesso completo a todos os módulos, receitas detalhadas e o gerador de certificado automático.</p>
              <p>Qualquer dúvida, responda diretamente a este e-mail.</p>
              <hr style="border: 0; border-top: 1px solid #E5DED3; margin: 25px 0;" />
              <p style="font-size: 12px; color: #4E2A1E; text-align: center; opacity: 0.6;">Suporte X-Bolo Gourmet Lucrativo</p>
            </div>
          `,
        }),
      });

      if (resendRes.ok) {
        emailSent = true;
        console.log("Email sent successfully!");
      } else {
        const resendErr = await resendRes.text();
        console.error("Resend API error:", resendErr);
        resendMessage = `Resend error: ${resendErr}`;
      }
    } else {
      console.warn("RESEND_API_KEY secret not found in Supabase. Email sending skipped.");
      resendMessage = "RESEND_API_KEY secret missing";
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Webhook processed",
        member: { email, name: rawName },
        email_sent: emailSent,
        resend_status: resendMessage,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Webhook exception:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
