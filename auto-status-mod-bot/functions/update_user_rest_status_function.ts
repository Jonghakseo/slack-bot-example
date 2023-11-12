import {DefineFunction, Schema, SlackFunction} from "deno-slack-sdk/mod.ts";
import {setRestStatus} from "./internal/set_profile.ts";


export const UpdateUserRestStatusDefinition = DefineFunction({
  callback_id: "update_user_rest_status_function",
  title: "Update user rest status",
  source_file: "functions/update_user_rest_status_function.ts",
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
  UpdateUserRestStatusDefinition,
  async ({inputs, client, env}) => {
    const adminToken = env["SLACK_ADMIN_TOKEN"];

    const hour = Number(inputs.message.match(/(\d+)hour/)?.[1] ?? 0);
    const minute = Number(inputs.message.match(/(\d+)minute/)?.[1] ?? 0);

    if (hour === 0 && minute === 0) {
      return {outputs: {}};
    }

    const res = await setRestStatus({client, adminToken, userId: inputs.user, minute: hour * 60 + minute});

    if (!res.ok) {
      console.log(res);
    }
    return {outputs: {}};
  }
);
