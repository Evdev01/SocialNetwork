type Contacts = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}

export type ProfileType = {
    userId: number | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string | null
    contacts: Contacts
}

export type PhotosType = {
    small: string | null
    large: string | null
}


export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}





















