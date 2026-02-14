import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { jsonResponse, safeJson } from "../_shared/response.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const payload = await safeJson(req);
  return jsonResponse({
    ok: true,
    function: "export-data",
    received: payload,
    message: "Stub response. Implement server-side logic here.",
  });
});
