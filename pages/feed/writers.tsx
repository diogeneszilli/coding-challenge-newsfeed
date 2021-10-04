import {useQuery, gql} from '@apollo/client'
import Layout from 'components/Layout'
import FeedCard from 'components/FeedCard'
import Feed from 'components/Feed'

const WRITERS_FEED_QUERY = gql`
  query writersFeed($limit: Int!, $offset: Int!) {
    writersFeed(limit: $limit, offset: $offset) {
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
  writersFeed: Feed[];
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

export default function WritersFeedPage() {
  const {data, error, loading, fetchMore} = useQuery<QueryData, QueryVars>(
    WRITERS_FEED_QUERY, {variables: {limit, offset}}
  );
  
  if (!data?.writersFeed || loading || error) {
    return null
  }

  window.onscroll = () => {
    const hasMore = data?.writersFeed.length % 10 === 0;
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
      {data?.writersFeed.map(feed => {
        return (
          <Feed key={feed.id}>
            <FeedCard feed={feed} />
          </Feed>
        )
      })}
    </Layout>
  )
}