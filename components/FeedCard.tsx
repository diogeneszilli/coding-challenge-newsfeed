import styled from 'styled-components'
import Card from './Card'
import Markdown from './Markdown'
import Link from 'next/link';
import { Feed } from '../graphql/types/feed'

type Props = {
  feed: Feed;
}

function renderImage(image_url: string) {
  if (image_url) {
    return (
      <ColumnLeft>
        <Avatar src={image_url}/>
      </ColumnLeft>
    );
  }
}

function renderFellowship(fellowship: string) {
  if (fellowship === 'founders') {
    return 'Founder';
  }
  if (fellowship === 'angels') {
    return 'Angel';
  }
  if (fellowship === 'writers') {
    return 'Writer';
  }
}

function renderTitle(feed: Feed) {
  if (feed.type === 'user') {
    return (
      <div>
        <h2>New {renderFellowship(feed.fellowship)}</h2>
        <h3>
          <Link href={`/users/${feed.tableId}`}>{feed.name}</Link>
        </h3>
      </div>
    )
  }
  if (feed.type === 'project') {
    return (
      <div>
        <h2>New {feed.type.charAt(0).toUpperCase() + feed.type.slice(1)}</h2>
        <h3>
          <Link href={`/projects/${feed.tableId}`}>{feed.name}</Link>
        </h3>
      </div>
    );
  }
  return (
    <div>
      <h2>New {feed.type.charAt(0).toUpperCase() + feed.type.slice(1)}</h2>
      <h3>{feed.name}</h3>
    </div>
  );
}

export default function FeedCard({feed}: Props) {
  return (
    <Card>
      <Columns>
        {renderImage(feed.image_url)}
        <ColumnRight>
          {renderTitle(feed)}
          <Markdown>{feed.description}</Markdown>
          <h4>{feed.created_ts}</h4>
        </ColumnRight>
      </Columns>
    </Card>
  )
}

const Avatar = styled.img`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 21rem;
`

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 7rem;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 1.5rem;
`

const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 14rem;
`
