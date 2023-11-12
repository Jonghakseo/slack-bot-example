import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import {UpdateUserLunchStatusDefinition} from "../functions/update_user_lunch_status_function.ts";

const ModifyStatusByLunchMessageWorkflow = DefineWorkflow({
  callback_id: "modify_status_by_lunch_message_workflow",
  title: "Modify status by lunch message",
  description: "Modify status by lunch message",
  input_parameters: {
    properties: {
      message: {
        type: Schema.types.string,
      },
      user: {
        type: Schema.slack.types.user_id,
      },
    },
    required: ["user", "message"],
  },
});

ModifyStatusByLunchMessageWorkflow.addStep(UpdateUserLunchStatusDefinition, {
  user: ModifyStatusByLunchMessageWorkflow.inputs.user,
  message: ModifyStatusByLunchMessageWorkflow.inputs.message,
});


export default ModifyStatusByLunchMessageWorkflow;
