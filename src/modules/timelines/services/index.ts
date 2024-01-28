import { getFetcher } from "../../../common/helpers/request.ts";

const fetcher = getFetcher()!;

const request = <T = Status>(url: string, data?: FormData) =>
  fetcher<T>(url, "POST", data);

export const favouriteStatus = (statusId: string) =>
  request(`/api/v1/statuses/${statusId}/favourite`);

export const unFavouriteStatus = (statusId: string) =>
  request(`/api/v1/statuses/${statusId}/unfavourite`);

export const boostStatus = (statusId: string) =>
  request(`/api/v1/statuses/${statusId}/reblog`).then(
    (status) => status.reblog!,
  );

export const unBoostStatus = (statusId: string) =>
  request(`/api/v1/statuses/${statusId}/unreblog`);

export const voteOnPoll = (pollId: string, answers: FormData) =>
  request<Poll>(`/api/v1/polls/${pollId}/votes`, answers);
