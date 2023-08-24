import { MockedRequest, ResponseResolver, restContext } from "msw";

export const mockStocktakingCurrentList: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      locations: [
        {
          id: 19523,
          m_location_id: 10171,
          m_location_name: "D-10-下",
          total_count: 10,
          unscanned_count: 0,
          mismatching_count: 0,
          status: 0,
        },
        {
          id: 19607,
          m_location_id: 10255,
          m_location_name: "D-11-上",
          total_count: 38,
          unscanned_count: 0,
          mismatching_count: 0,
          status: 0,
        },
        {
          id: 19457,
          m_location_id: 10105,
          m_location_name: "D-11-下",
          total_count: 20,
          unscanned_count: 0,
          mismatching_count: 0,
          status: 0,
        },
        {
          id: 19633,
          m_location_id: 10281,
          m_location_name: "D-12-上",
          total_count: 26,
          unscanned_count: 0,
          mismatching_count: 0,
          status: 0,
        },
        {
          id: 19438,
          m_location_id: 10086,
          m_location_name: "D-12-下",
          total_count: 24,
          unscanned_count: 0,
          mismatching_count: 0,
          status: 0,
        },
        {
          id: 19609,
          m_location_id: 10257,
          m_location_name: "E-01-上",
          total_count: 44,
          unscanned_count: 0,
          mismatching_count: 0,
          status: 0,
        },
        {
          id: 19443,
          m_location_id: 10091,
          m_location_name: "E-01-下",
          total_count: 22,
          unscanned_count: 0,
          mismatching_count: 0,
          status: 0,
        },
        {
          id: 19603,
          m_location_id: 10251,
          m_location_name: "E-02-上",
          total_count: 44,
          unscanned_count: 0,
          mismatching_count: 0,
          status: 0,
        },
        {
          id: 19463,
          m_location_id: 10111,
          m_location_name: "E-02-下",
          total_count: 21,
          unscanned_count: 0,
          mismatching_count: 0,
          status: 0,
        },
      ],
    })
  );
};

export const mockStocktakingCurrentNull: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      locations: null,
    })
  );
};

export const mockStocktakingCurrentChecked: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      locations: [
        {
          id: 19523,
          m_location_id: 10171,
          m_location_name: "D-10-下",
          total_count: 10,
          unscanned_count: 0,
          mismatching_count: 0,
          status: 2,
        },
      ],
    })
  );
};

export const mockStocktakingCurrentUnsccaned: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      locations: [
        {
          id: 19523,
          m_location_id: 10171,
          m_location_name: "D-10-下",
          total_count: 10,
          unscanned_count: 20,
          mismatching_count: 0,
          status: 0,
        },
      ],
    })
  );
};
export const mockStocktakingCurrentMismatchingAndUnscanned: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      locations: [
        {
          id: 19523,
          m_location_id: 10171,
          m_location_name: "D-10-下",
          total_count: 10,
          unscanned_count: 20,
          mismatching_count: 2,
          status: 0,
        },
      ],
    })
  );
};

export const mockStocktakingCreate: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      locations: [
        {
          id: 10354,
          m_location_id: 10111,
          m_location_name: "E-02-下",
          total_count: 21,
          unscanned_count: 0,
          mismatching_count: 0,
          status: 0,
        },
      ],
    })
  );
};
