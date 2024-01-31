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

interface Buzzer {
    username: string,
    password: string,
    email: string,
    image: string,
    country: string,
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
    id: number,
    name: string,
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
    id: number,
    name: string,
}

interface RecordLabel {
    id: number,
    name: string
}
