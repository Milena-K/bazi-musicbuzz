// interfaces for:
// album
// creation / song / episode
// podcast
// user / artist / listener
// playlist
// podcast category
// reaction
// comment
// country / continent
// genre
// record label
// ----------------

interface Album {
    title: string,
    date: Date,
    createdBy: number,
    recordLabelId: number
}


/*
{
  "user_name": "string",
  "user_email": "user@example.com",
  "user_type": "artist",
  "user_id": 0,
  "user_image": "string",
  "user_country": "string"
}

*/
interface Buzzer {
    user_name: string,
    user_email: string,
    user_password?: string,
    user_id?: number,
    user_image: string,
    user_country: string,
    user_type?: "artist" | "listener"
}

interface Listener extends Buzzer {
}

interface Artist extends Buzzer {
    information: string,
}

interface Creation {
    date: Date,
    duration: number,
    createdBy: number,
}

interface EpisodeRes {
    podcast_id: number
    episode_description: string
    episode_title: string
    episode_file: string
    episode_number: number
    episode_duration: number
    episode_id: number
}

interface SongRes {
    album_id: number,
    rlabel_id: number,
    lyrics: string,
    song_title: string,
    song_file: string,
    song_duration: number,
    song_date: string,
    genres: string[],
    song_id: number
}

interface AlbumRes {
    album_title: string,
    al_created_by: number,
    rlabel_id: number,
    album_id: number
}

interface PodcastRes {
    podcast_id: number,
    podcast_title: string,
    category_id: number,
    created_by: number
}

interface PlaylistRes {
    playlist_name: string,
    playlist_description: string,
    playlist_id: number,
    created_by: number
}

interface EpisodeRes {
    podcast_id: number,
    episode_description: string,
    episode_title: string,
    episode_file: string,
    episode_number: number,
    episode_duration: number,
    episode_id: number
}

type PlaylistInfo = {
    id: number,
    name: string
}

interface Song extends Creation {
    albumId: number,
    recordLabel: number,
    lyrics: string,
    title: string,
    filePath: string
}

interface Episode extends Creation {
    podcastId: number,
    description: string,
    title: string,
    filePath: string,
    number: number,
}

interface Podcast {
    id?: number,
    title: string,
    categoryId: number,
    createdBy: number,
}

interface Playlist {
    id: number,
    name: string,
    description: string,
    createdBy: number
}

interface Category {
    category_id: number,
    category_name: string,
}

interface Reaction {
    id: number,
    name: string,
    img: string
}

interface Comment {
    id: number,
    date: Date,
    rating: number,
    text: string,
    commentedOn: number,
    commentedBy: number,
}

interface Country {
    code: string,
    iso3: string,
    name: string,
    fullName: string,
    number: string,
    continentCode: string,
}

interface Continent {
    code: string,
    name: string
}

interface Genre {
    genre_id: number,
    genre_name: string,
}

interface RecordLabel {
    id: number,
    name: string
}

type resType = {
    title: string,
    genre?: string,
    category?: string,
    podcast?: string,
    createdBy: number,
    recordLabel?: number,
}

