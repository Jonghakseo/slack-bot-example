import {DefineFunction, Schema, SlackFunction} from "deno-slack-sdk/mod.ts";
import {setLunchStatus} from "./internal/set_profile.ts";


export const UpdateUserLunchStatusDefinition = DefineFunction({
  callback_id: "update_user_lunch_status_function",
  title: "Update user lunch status",
  source_file: "functions/update_user_lunch_status_function.ts",
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
  UpdateUserLunchStatusDefinition,
  async ({inputs, client, env}) => {
    const adminToken = env["SLACK_ADMIN_TOKEN"];
    const res = await setLunchStatus({client, adminToken, userId: inputs.user});

    if (!res.ok) {
      console.log(res);
    }
    return {outputs: {}};
  }
);
