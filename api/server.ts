import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";
import { getStanRegionCodeList, tooDescription } from "./tools/region.js";

const handler = createMcpHandler((server) => {
  server.tool("Get_Standard_Region_Code_List", tooDescription, { location: z.string(), pageNo: z.number().min(1).default(1) },
  async ({ location, pageNo }) => {
    const result = await getStanRegionCodeList(location, pageNo);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null) }],
    };
  });
});

export { handler as GET, handler as POST, handler as DELETE };
