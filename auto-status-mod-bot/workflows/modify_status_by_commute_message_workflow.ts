import {DefineWorkflow, Schema} from "deno-slack-sdk/mod.ts";
import {UpdateUserCommuteStatusDefinition} from "../functions/update_user_commute_status_function.ts";

const ModifyStatusByCommuteMessageWorkflow = DefineWorkflow({
  callback_id: "modify_status_by_commute_message_workflow",
  title: "Modify status by commute message",
  description: "Modify status by commute message",
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

ModifyStatusByCommuteMessageWorkflow.addStep(UpdateUserCommuteStatusDefinition, {
  user: ModifyStatusByCommuteMessageWorkflow.inputs.user,
  message: ModifyStatusByCommuteMessageWorkflow.inputs.message,
});


export default ModifyStatusByCommuteMessageWorkflow;
