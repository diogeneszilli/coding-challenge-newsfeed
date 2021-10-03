import {useQuery, gql} from '@apollo/client'
import Layout from 'components/Layout'
import FeedCard from 'components/FeedCard'
import Feed from 'components/Feed'

const ANGELS_FEED_QUERY = gql`
  query angelsFeed($limit: Int!, $offset: Int!) {
    angelsFeed(limit: $limit, offset: $offset) {
      id
      type
      fellowship
      name
      description
      image_url
      created_ts
    }
  }
`

type QueryData = {
  angelsFeed: Feed[];
}

type QueryVars = {
  limit: number;
  offset: number;
}

type Feed = {
  id: number;
  type: "user" | "project" | "announcement"
  fellowship: "founders" | "angels" | "writers" | "all";
  name: string;
  description: string;
  image_url: string;
  created_ts: Date;
}

let feed: any[] = [];
const offset = 0;
const limit = 10;

export default function AngelsFeedPage() {
  const {data, error, loading} = useQuery<QueryData, QueryVars>(
    ANGELS_FEED_QUERY,
    {
      variables: {limit, offset},
    }
  )
  const angelsFeed = data?.angelsFeed || [];
  feed = [...angelsFeed];

  if (!feed || loading || error) {
    return null
  }

  return (
    <Layout>
      {feed.map((item, index) => {
        return (
          <Feed key={index}>
            <FeedCard feed={item} />
          </Feed>
        )
      })}
    </Layout>
  )
}