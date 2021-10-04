import {useQuery, gql} from '@apollo/client'
import Layout from 'components/Layout'
import FeedCard from 'components/FeedCard'
import FeedLayout from 'components/FeedLayout'
import { QueryDataFounder, QueryVarsPagination } from '../../graphql/types/feed'


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

const limit = 10;
let offset = 0;

export default function FoundersFeedPage() {
  const {data, error, loading, fetchMore} = useQuery<QueryDataFounder, QueryVarsPagination>(
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
          <FeedLayout key={feed.id}>
            <FeedCard feed={feed} />
          </FeedLayout>
        )
      })}
    </Layout>
  )
}