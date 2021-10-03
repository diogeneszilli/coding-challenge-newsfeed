import {useQuery, gql} from '@apollo/client'
import Layout from 'components/Layout'
import FeedCard from 'components/FeedCard'
import Feed from 'components/Feed'

const FOUNDERS_FEED_QUERY = gql`
  query foundersFeed($limit: Int!, $offset: Int!) {
    foundersFeed(limit: $limit, offset: $offset) {
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
  foundersFeed: Feed[];
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

export default function FoundersFeedPage() {
  const {data, error, loading} = useQuery<QueryData, QueryVars>(
    FOUNDERS_FEED_QUERY,
    {
      variables: {limit, offset},
    }
  )
  const foundersFeed = data?.foundersFeed || [];
  feed = [...foundersFeed];

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