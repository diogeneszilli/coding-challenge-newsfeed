import db, {FeedRow} from '../../../db'

export default async function writersFeed(): Promise<FeedRow[]> {
  const feed: FeedRow[] = await db.getAll(
    `
    SELECT * FROM (
      SELECT users.id, "user" AS type, users.fellowship, users.name, users.bio AS description, users.avatar_url AS image_url, users.created_ts FROM users
        WHERE users.fellowship = "writers"
      UNION ALL
      SELECT announcements.id, "announcement" AS type, announcements.fellowship, announcements.title AS name, announcements.body AS description, NULL AS image_url, announcements.created_ts FROM announcements
        WHERE announcements.fellowship = "all" OR announcements.fellowship = "writers"
    ) AS result
    ORDER BY result.created_ts DESC;
    `
  )
  return feed;
}
