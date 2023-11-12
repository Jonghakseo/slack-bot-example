import {Trigger} from "deno-slack-sdk/types.ts";
import {TriggerContextData, TriggerEventTypes, TriggerTypes} from "deno-slack-api/mod.ts";
import {FilterType} from "deno-slack-api/typed-method-types/workflows/triggers/trigger-filter.ts";
import ModifyStatusByLunchMessageWorkflow from "../workflows/modify_status_by_lunch_message_workflow.ts";

const triggerFilter: FilterType = {
  version: 1,
  root: {
    operator: "AND",
    inputs: [
      {statement: "{{data.text}} CONTAINS eat"},
      {statement: "{{data.text}} CONTAINS lunch"},
      {
        operator: "NOT",
        inputs: [
          {
            // Filter out posts by apps
            statement: "{{data.user_id}} == null",
          }
        ]
      },
      {
        // Filter out thread replies
        statement: "{{data.thread_ts}} == null",
      }
    ]
  }
}

const CommuteMessageTrigger: Trigger<typeof ModifyStatusByLunchMessageWorkflow.definition> = {
  type: TriggerTypes.Event,
  name: "Lunch message trigger",
  description: "Triggers when a lunch message is posted",
  workflow: `#/workflows/${ModifyStatusByLunchMessageWorkflow.definition.callback_id}`,
  event: {
    event_type: TriggerEventTypes.MessagePosted,
    channel_ids: [''], // TODO
    filter: triggerFilter,
  },
  inputs: {
    message: {
      value: TriggerContextData.Event.MessagePosted.text,
    },
    user: {
      value: TriggerContextData.Event.MessagePosted.user_id,
    },
  },
};

export default CommuteMessageTrigger;
