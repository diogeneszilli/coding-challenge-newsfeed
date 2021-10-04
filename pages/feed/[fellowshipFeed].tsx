import {useQuery, gql} from '@apollo/client'
import { useRouter } from 'next/router'
import Layout from 'components/Layout'
import FeedCard from 'components/FeedCard'
import FeedLayout from 'components/FeedLayout'
import HomeLink from 'components/HomeLink'
import { Feed, QueryVarsPagination } from 'graphql/types/feed'

const limit = 10;
let offset = 0;

export default function FeedPage() {
  const {query} = useRouter();
  const feedName = query.fellowshipFeed;

  const FEED_QUERY = gql`
  query ${feedName}($limit: Int!, $offset: Int!) {
    ${feedName}(limit: $limit, offset: $offset) {
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
    [feedName: string]: Feed[]
  }

  const { data, error, loading, fetchMore } = useQuery<QueryData, QueryVarsPagination>(
    FEED_QUERY, { variables: { limit, offset }}
  )

  if (!data?.[`${feedName}`] || loading || error) {
    return null
  }

  window.onscroll = () => {
    const hasMore = data?.[`${feedName}`].length % 10 === 0;
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
      <HomeLink />
      {data?.[`${feedName}`].map(feed => {
        return (
          <FeedLayout key={feed.id}>
            <FeedCard feed={feed} />
          </FeedLayout>
        )
      })}
    </Layout>
  )
}