import {Trigger} from "deno-slack-sdk/types.ts";
import {TriggerContextData, TriggerEventTypes, TriggerTypes} from "deno-slack-api/mod.ts";
import ModifyStatusByCommuteMessageWorkflow from "../workflows/modify_status_by_commute_message_workflow.ts";
import {FilterType} from "deno-slack-api/typed-method-types/workflows/triggers/trigger-filter.ts";

const triggerFilter: FilterType = {
  version: 1,
  root: {
    operator: "AND",
    inputs: [
      {
        operator: "OR",
        inputs: [
          {statement: "{{data.text}} CONTAINS online"},
          {statement: "{{data.text}} CONTAINS office"},
          {statement: "{{data.text}} CONTAINS go to work"},
          {statement: "{{data.text}} CONTAINS leave work"},
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

const CommuteMessageTrigger: Trigger<typeof ModifyStatusByCommuteMessageWorkflow.definition> = {
  type: TriggerTypes.Event,
  name: "Commute message trigger",
  description: "Triggers when a commute message is posted",
  workflow: `#/workflows/${ModifyStatusByCommuteMessageWorkflow.definition.callback_id}`,
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
