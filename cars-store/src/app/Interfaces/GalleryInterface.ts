export interface GalleryInterface {
    success: boolean;
    count:   number;
    gallery: Gallery[];
}

export interface Gallery {
    name:   string;
    images: string[];
}
