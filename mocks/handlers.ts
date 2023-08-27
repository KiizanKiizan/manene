import { rest } from "msw";
import { baseUrl } from "../app/model/Base-url";
import {
  stocktakingCurrentList,
  stocktakingCurrentNull,
} from "./api/stocktaking";
import { completeScan } from "./api/stocktaking-location";

export const handlers = [
  rest.post(baseUrl("stocktakings"), stocktakingCurrentList),
  rest.post(baseUrl("stocktakings/complete"), stocktakingCurrentNull),
  rest.post(baseUrl("stocktaking_locations/19523/complete_scan"), completeScan),
];
