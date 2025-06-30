export const galleryFetch = async () => {
    const res = await fetch('http://127.0.0.1:8000/gallery').then( res => res.json());
    return res;
}

export default galleryFetch;