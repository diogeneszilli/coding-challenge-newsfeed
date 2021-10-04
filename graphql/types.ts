export type Feed = {
    id: number;
    tableId: number;
    type: "user" | "project" | "announcement"
    fellowship: "founders" | "angels" | "writers" | "all";
    name: string;
    description: string;
    image_url: string;
    created_ts: Date;
  }

export type QueryVars = {
    limit: number;
    offset: number;
  }

export type QueryDataFounder = {
    foundersFeed: Feed[];
  }

export type QueryDataAngel = {
    angelsFeed: Feed[];
  }

export type QueryDataWriter = {
    writersFeed: Feed[];
  }