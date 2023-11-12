import {DefineFunction, Schema, SlackFunction} from "deno-slack-sdk/mod.ts";
import {resetStatus, setWorkingInHouseStatus, setWorkingInOfficeStatus} from "./internal/set_profile.ts";


export const UpdateUserCommuteStatusDefinition = DefineFunction({
  callback_id: "update_user_commute_status_function",
  title: "Update user commute status",
  source_file: "functions/update_user_commute_status_function.ts",
  input_parameters: {
    properties: {
      message: {
        type: Schema.types.string,
        description: "Message to be posted",
      },
      user: {
        type: Schema.slack.types.user_id,
        description: "The user invoking the workflow",
      },
    },
    required: ["message", "user"],
  }
});

export default SlackFunction(
  UpdateUserCommuteStatusDefinition,
  async ({inputs, client, env}) => {
    const emptyOutput = {outputs: {}};
    const adminToken = env["SLACK_ADMIN_TOKEN"];

    const setStatus = (() => {
      if (inputs.message.includes("online")) {
        return setWorkingInHouseStatus;
      }
      if (inputs.message.includes("office") || inputs.message.includes("go to work")) {
        return setWorkingInOfficeStatus;
      }
      if (inputs.message.includes("leave work")) {
        return resetStatus;
      }
      throw new Error("Invalid message");
    })()

    const res = await setStatus({client, adminToken, userId: inputs.user});
    if (!res.ok) {
      console.log(res);
    }

    return emptyOutput
  }
);
