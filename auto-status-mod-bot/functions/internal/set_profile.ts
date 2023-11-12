import {BaseResponse, SlackAPIClient} from "deno-slack-api/types.ts";

type SetStatus<Additional = unknown> = (args: { client: SlackAPIClient, adminToken: string, userId: string } & Additional) => Promise<BaseResponse>;

export const setWorkingInHouseStatus: SetStatus = ({client, adminToken, userId}) => {
  return client.users.profile.set({
    user: userId,
    token: adminToken,
    "profile": {
      "status_text": "working in house",
      "status_emoji": ":house_with_garden:",
      "status_expiration": 0
    }
  });
}

export const setWorkingInOfficeStatus: SetStatus = ({client, adminToken, userId}) => {
  return client.users.profile.set({
    user: userId,
    token: adminToken,
    "profile": {
      "status_text": "working in office",
      "status_emoji": ":office:",
      "status_expiration": 0
    }
  });
}

export const resetStatus: SetStatus = ({client, adminToken, userId}) => {
  return client.users.profile.set({
    user: userId,
    token: adminToken,
    "profile": {
      "status_text": "",
      "status_emoji": "",
      "status_expiration": 0
    }
  });
}

export const setLunchStatus: SetStatus = ({client, adminToken, userId}) => {
  const now = Math.floor(Date.now() / 1000)
  const oneHourLater = now + 60 * 60

  return client.users.profile.set({
    user: userId,
    token: adminToken,
    "profile": {
      "status_text": "lunch",
      "status_emoji": ":rice:",
      "status_expiration": oneHourLater
    }
  });
}

export const setRestStatus: SetStatus<{ minute: number }> = ({client, adminToken, userId, minute}) => {
  const now = Math.floor(Date.now() / 1000)
  const oneHourLater = now + minute * 60

  return client.users.profile.set({
    user: userId,
    token: adminToken,
    "profile": {
      "status_text": "in rest",
      "status_emoji": ":coffee:",
      "status_expiration": oneHourLater
    }
  });
}
