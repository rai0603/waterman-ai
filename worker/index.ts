import { EmailMessage } from "cloudflare:email";
import { SITE_URL } from "../src/lib/site";
import { handleContact } from "./handle-contact";
import { buildInquiryEmail } from "./inquiry-email";

const FROM = "inquiry@waterman-sports.cc";
const TO = "rai0603@gmail.com";

type Env = {
  ASSETS: Fetcher;
  INQUIRY_EMAIL: SendEmail;
  CONTACT_RATE_LIMITER: { limit: (options: { key: string }) => Promise<{ success: boolean }> };
};

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname !== "/api/contact") return env.ASSETS.fetch(request);

    return handleContact(request, {
      allowedOrigin: SITE_URL,
      isAllowed: async (key) => (await env.CONTACT_RATE_LIMITER.limit({ key })).success,
      send: async (inquiry) => {
        const raw = buildInquiryEmail(inquiry, { from: FROM, to: TO, messageId: crypto.randomUUID() });
        await env.INQUIRY_EMAIL.send(new EmailMessage(FROM, TO, raw));
      },
    });
  },
} satisfies ExportedHandler<Env>;
