import {useQuery, gql} from '@apollo/client'
import Layout from 'components/Layout'
import FeedCard from 'components/FeedCard'
import Feed from 'components/Feed'

const FOUNDERS_FEED_QUERY = gql`
  query foundersFeed {
    foundersFeed {
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

type Feed = {
  id: number;
  type: "user" | "project" | "announcement"
  fellowship: "founders" | "angels" | "writers" | "all";
  name: string;
  description: string;
  image_url: string;
  created_ts: Date;
}

export default function FoundersFeedPage() {
  const {data, error, loading} = useQuery<QueryData>(FOUNDERS_FEED_QUERY)
  const foundersFeed = data?.foundersFeed;

  if (!foundersFeed || loading || error) {
    return null
  }

  return (
    <Layout>
      {foundersFeed.map((item, index) => {
        return (
          <Feed>
            <FeedCard key={index} feed={item} />
          </Feed>
        )
      })}
    </Layout>
  )
}