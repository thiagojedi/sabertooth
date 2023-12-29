import { getFetcher } from "../../../common/helpers/request.ts";

const fetcher = getFetcher()!;

const request = (url: string): Promise<Status> => fetcher(url, "POST");

export const favouriteStatus = (statusId: string) =>
  request(`/api/v1/statuses/${statusId}/favourite`);

export const unFavouriteStatus = (statusId: string) =>
  request(`/api/v1/statuses/${statusId}/unfavourite`);

export const boostStatus = (statusId: string) =>
  request(`/api/v1/statuses/${statusId}/reblog`);

export const unBoostStatus = (statusId: string) =>
  request(`/api/v1/statuses/${statusId}/unreblog`);

export const voteOnPoll = (pollId: string, answers: string[]): Promise<Poll> =>
  fetcher(`/api/v1/polls/${pollId}/votes`, "POST", {
    choices: answers.join(","),
  });
