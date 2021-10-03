import {useQuery, gql} from '@apollo/client'
import Layout from 'components/Layout'
import FeedCard from 'components/FeedCard'
import Feed from 'components/Feed'

const WRITERS_FEED_QUERY = gql`
  query writersFeed {
    writersFeed {
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
  writersFeed: Feed[];
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

export default function WritersFeedPage() {
  const {data, error, loading} = useQuery<QueryData>(WRITERS_FEED_QUERY)
  const writersFeed = data?.writersFeed;

  if (!writersFeed || loading || error) {
    return null
  }

  return (
    <Layout>
      {writersFeed.map((item, index) => {
        return (
          <Feed>
            <FeedCard key={index} feed={item} />
          </Feed>
        )
      })}
    </Layout>
  )
}