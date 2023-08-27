import { MockedRequest, ResponseResolver, restContext } from "msw";

export const stocktakingAllItems: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      id: 21107,
      m_location_id: 10171,
      m_location_name: "D-10-下",
      all_items: [
        {
          id: 470442,
          size: "M",
          item_image_url:
            "https://stg.leeap.jp/files/preregistered_item/157/15789/thumb_IMG_2383.JPG",
          m_cate_small: { id: 163, name: "半袖無地シャツ" },
          m_location: { id: 163, name: "半袖無地シャツ" },
        },
        {
          id: 474539,
          size: "M",
          item_image_url:
            "https://stg.leeap.jp/files/preregistered_item/2/252/thumb_IMG_0010.JPG",
          m_cate_small: { id: 163, name: "半袖無地シャツ" },
          m_location: { id: 163, name: "半袖無地シャツ" },
        },
        {
          id: 475237,
          size: "M",
          item_image_url:
            "https://stg.leeap.jp/files/preregistered_item/164/16433/thumb_IMG_0018.JPG",
          m_cate_small: { id: 163, name: "半袖無地シャツ" },
          m_location: { id: 163, name: "半袖無地シャツ" },
        },
        {
          id: 480475,
          size: "M",
          item_image_url:
            "https://stg.leeap.jp/files/preregistered_item/166/16637/thumb_IMG_3232.JPG",
          m_cate_small: { id: 163, name: "半袖無地シャツ" },
          m_location: { id: 163, name: "半袖無地シャツ" },
        },
      ],
      unscanned_items: null,
      matched_items: null,
      mismatching_items: null,
      status: 0,
    })
  );
};

export const stocktakingCurrentMismatchingAndUnscanned: ResponseResolver<
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

export const completeScan: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json({}));
};
