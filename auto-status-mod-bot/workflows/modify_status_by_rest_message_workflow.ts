import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import {UpdateUserRestStatusDefinition} from "../functions/update_user_rest_status_function.ts";

const ModifyStatusByRestMessageWorkflow = DefineWorkflow({
  callback_id: "modify_status_by_rest_message_workflow",
  title: "Modify status by rest message",
  description: "Modify status by rest message",
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

ModifyStatusByRestMessageWorkflow.addStep(UpdateUserRestStatusDefinition, {
  user: ModifyStatusByRestMessageWorkflow.inputs.user,
  message: ModifyStatusByRestMessageWorkflow.inputs.message,
});


export default ModifyStatusByRestMessageWorkflow;
