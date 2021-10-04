import {useQuery, gql} from '@apollo/client'
import Layout from 'components/Layout'
import FeedCard from 'components/FeedCard'
import Feed from 'components/Feed'

const FOUNDERS_FEED_QUERY = gql`
  query foundersFeed($limit: Int!, $offset: Int!) {
    foundersFeed(limit: $limit, offset: $offset) {
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
  foundersFeed: Feed[];
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

export default function FoundersFeedPage() {
  const {data, error, loading, fetchMore} = useQuery<QueryData, QueryVars>(
    FOUNDERS_FEED_QUERY, { variables: {limit, offset}}
  )

  if (!data?.foundersFeed || loading || error) {
    return null
  }

  window.onscroll = () => {
    const hasMore = data?.foundersFeed.length % 10 === 0;
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
      {data?.foundersFeed.map(feed => {
        return (
          <Feed key={feed.id}>
            <FeedCard feed={feed} />
          </Feed>
        )
      })}
    </Layout>
  )
}