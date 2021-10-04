import {useQuery, gql} from '@apollo/client'
import Layout from 'components/Layout'
import FeedCard from 'components/FeedCard'
import Feed from 'components/Feed'

const ANGELS_FEED_QUERY = gql`
  query angelsFeed($limit: Int!, $offset: Int!) {
    angelsFeed(limit: $limit, offset: $offset) {
      id
      tableId
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
  tableId: number;
  type: "user" | "project" | "announcement"
  fellowship: "founders" | "angels" | "writers" | "all";
  name: string;
  description: string;
  image_url: string;
  created_ts: Date;
}

const limit = 10;
let offset = 0;

export default function AngelsFeedPage() {
  const { data, error, loading, fetchMore } = useQuery<QueryData, QueryVars>(
    ANGELS_FEED_QUERY, { variables: { limit, offset }}
  )

  if (!data?.angelsFeed || loading || error) {
    return null
  }

  window.onscroll = () => {
    const hasMore = data?.angelsFeed.length % 10 === 0;
    if (hasMore) {
      const isBottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
      if(isBottom) {
        offset += 1;
        fetchMore({variables: { limit, offset }});
      }
    }
  }

  return (
    <Layout>
      {data?.angelsFeed.map(feed => {
        return (
          <Feed key={feed.id}>
            <FeedCard feed={feed} />
          </Feed>
        )
      })}
    </Layout>
  )
}