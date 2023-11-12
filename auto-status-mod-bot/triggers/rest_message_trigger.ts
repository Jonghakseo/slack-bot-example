import {Trigger} from "deno-slack-sdk/types.ts";
import {TriggerContextData, TriggerEventTypes, TriggerTypes} from "deno-slack-api/mod.ts";
import {FilterType} from "deno-slack-api/typed-method-types/workflows/triggers/trigger-filter.ts";
import ModifyStatusByRestMessageWorkflow from "../workflows/modify_status_by_rest_message_workflow.ts";

const triggerFilter: FilterType = {
  version: 1,
  root: {
    operator: "AND",
    inputs: [
      {
        operator: "AND", inputs: [
          {statement: "{{data.text}} CONTAINS in rest"},
          {statement: "{{data.text}} CONTAINS time"},
        ]
      },
      {
        operator: "OR", inputs: [
          {statement: "{{data.text}} CONTAINS minute"},
          {statement: "{{data.text}} CONTAINS hour"},
        ]
      },
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

const CommuteMessageTrigger: Trigger<typeof ModifyStatusByRestMessageWorkflow.definition> = {
  type: TriggerTypes.Event,
  name: "Rest message trigger",
  description: "Triggers when a rest message is posted",
  workflow: `#/workflows/${ModifyStatusByRestMessageWorkflow.definition.callback_id}`,
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
