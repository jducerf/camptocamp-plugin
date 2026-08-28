#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { routeToolDefinitions } from "./tools/routes.js";
import { waypointToolDefinitions } from "./tools/waypoints.js";
import { outingToolDefinitions } from "./tools/outings.js";
const server = new McpServer({
    name: "mcp-camptocamp",
    version: "1.0.0",
});
const allTools = [...routeToolDefinitions, ...waypointToolDefinitions, ...outingToolDefinitions];
for (const tool of allTools) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    server.tool(tool.name, tool.description, tool.inputSchema.shape, async (input) => {
        try {
            const text = await tool.handler(input);
            return { content: [{ type: "text", text }] };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            return {
                content: [{ type: "text", text: `Error: ${message}` }],
                isError: true,
            };
        }
    });
}
const transport = new StdioServerTransport();
await server.connect(transport);
//# sourceMappingURL=index.js.map