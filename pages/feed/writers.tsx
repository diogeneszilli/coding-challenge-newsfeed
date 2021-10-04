import {useQuery, gql} from '@apollo/client'
import Layout from 'components/Layout'
import FeedCard from 'components/FeedCard'
import FeedLayout from 'components/FeedLayout'
import { QueryDataWriter, QueryVars } from '../../graphql/types'

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

const limit = 10;
let offset = 0;

export default function WritersFeedPage() {
  const {data, error, loading, fetchMore} = useQuery<QueryDataWriter, QueryVars>(
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
          <FeedLayout key={feed.id}>
            <FeedCard feed={feed} />
          </FeedLayout>
        )
      })}
    </Layout>
  )
}