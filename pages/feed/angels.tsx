import {useQuery, gql} from '@apollo/client'
import Layout from 'components/Layout'
import FeedCard from 'components/FeedCard'
import Feed from 'components/Feed'

const ANGELS_FEED_QUERY = gql`
  query angelsFeed {
    angelsFeed {
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

type Feed = {
  id: number;
  type: "user" | "project" | "announcement"
  fellowship: "founders" | "angels" | "writers" | "all";
  name: string;
  description: string;
  image_url: string;
  created_ts: Date;
}

export default function AngelsFeedPage() {
  const {data, error, loading} = useQuery<QueryData>(ANGELS_FEED_QUERY)
  const angelsFeed = data?.angelsFeed;

  if (!angelsFeed || loading || error) {
    return null
  }

  return (
    <Layout>
      {angelsFeed.map((item, index) => {
        return (
          <Feed>
            <FeedCard key={index} feed={item} />
          </Feed>
        )
      })}
    </Layout>
  )
}