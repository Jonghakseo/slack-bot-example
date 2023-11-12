import {Manifest} from "deno-slack-sdk/mod.ts";
import ModifyStatusByCommuteMessageWorkflow from "./workflows/modify_status_by_commute_message_workflow.ts";
import ModifyStatusByLunchMessageWorkflow from "./workflows/modify_status_by_lunch_message_workflow.ts";
import ModifyStatusByRestMessageWorkflow from "./workflows/modify_status_by_rest_message_workflow.ts";

export default Manifest({
  name: "auto-status-mod-bot",
  description: "A Slack app that automatically updates user status based on posted messages",
  icon: "assets/default_new_app_icon.png",
  workflows: [ModifyStatusByCommuteMessageWorkflow, ModifyStatusByLunchMessageWorkflow, ModifyStatusByRestMessageWorkflow],
  outgoingDomains: [],
  datastores: [],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "channels:history",
    "users:read",
  ],
});
