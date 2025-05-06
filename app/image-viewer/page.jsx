"use client";

import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";

const BACKGROUND_TREE_SPRITE =
  "https://www.phbalcony.com/data/project/2025/01/sprite_background_tree_img/d22b5dc6ee554b0b99897033d3cdb707";

const MAIN_EXTERNAL_BUILDING_PICTURE =
  "https://www.phbalcony.com/data/project/2020/11/intro_vid/8699caafc75b40f9b051f990a3988779";

const EXTERNAL_BUILDING_VIEW_SPRITE =
  "blob:https://www.phbalcony.com/f8607b07-3e52-4e74-9bc8-158ccffc4645";

const UNIT_GROUP_SPRITE =
  "https://www.phbalcony.com/data/project/2025/01/sprite_unit_group_img/e9ae9f1a56e747d1b3d5e2c62587624a";

const TOP_VIEW_SPRITE =
  "https://www.phbalcony.com/data/project/2025/01/sprite_topview_img/31b356e8d7694da79645b64c30179788";

const IMAGE_PATHS = [
  "ebb265a507d14740b2f9b34249fd72e2",
  "8ad5b652aad448469f0df83ef8464ce0",
  "58b92ddab4054d5eb5e79d20fcac9cf0",
  "c72ae595bb4240ebaba85daf36951ea1",
  "97d55d7a75e74b1da468fdc00e1ca61f",
  "0e8f9a8b474449d8bb3353485fbceddf",
  "3f146884118a4b578c9c1fa97ab58732",
  "f15fdcc3f540428fbad7c90e77e7160f",
  "461e3fbf99144d1aa0dca65fa6f0271f",
  "a2cd2e4082b247cab4056a23cf16f576",
  "b3f09a5b225d4806ad13aa7c895d5709",
  "820eabb4f1404957b443fbbd5f5bb34b",
  "08211292b18643f6a6e08a122f90c9c2",
  "edc086b50ea849eda11cc62eec4115b7",
  "7c7aeed1382c4d9dac0eea86d65e0820",
  "c275aaaba2eb481e99788c44ccc58410",
  "575bb990c63b4394b82e7c1c256bc1e4",
  "d0e8de258b814343ae8f6fd601ca193c",
  "9876974509084745a1f01a6791dca8b0",
  "a4dfdfdab6d0465cbbec795984d12f1a",
  "5c81f7b9e37e4d01b6fde410b18f926f",
  "a4146809c157478ca36ed5e2606ecb85",
  "b3397bc1175141c1bcd0739c98b12c02",
  "f3271b40de9d414882acce970fb5be0c",
  "d97dd939df8b4fa0adf66e76fbe7721c",
  "c2cc2331dab142ca8e0fdf2578803b08",
  "93c957467c9043ad89bfaf8fa9890b39",
  "f53fb15fe8aa46dba69f36724da6d0e4",
  "194e8e85a6aa46e0826e53947f3064cf",
];

const HOME_SVG =
  "https://www.phbalcony.com/data/project/2022/04/home_svg/c0a0b8a19b3f4f6982ad8440edba25b8";

const INTRO_VID =
  "https://www.phbalcony.com/data/project/2020/11/intro_vid/8699caafc75b40f9b051f990a3988779";

const SEC_A_VID_FORWARD =
  "https://www.phbalcony.com/data/project/2020/11/sec_a_vid_forward/7e0d5971e0a9495f863324d0ddf270c4";

const SEC_C_VID_REVERSE =
  "https://www.phbalcony.com/data/project/2020/11/sec_c_vid_reverse/880492f740e1411aae145deac8a793be";

const SEC_TOP_VID =
  "https://www.phbalcony.com/data/project/2020/11/sec_top_vid/f299d9df50fa4fa480059f190388907e";

const BASE_URL =
  "https://www.phbalcony.com/data/imagegallery/2025/01/sprite_gallery_img/";

export default function ImageMasonryViewer() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(images);

  useEffect(() => {
    let isMounted = true;
    const fetchImages = async () => {
      try {
        const blobs = await Promise.all(
          IMAGE_PATHS.map(async (id) => {
            const res = await fetch(`${BASE_URL}${id}`);
            if (!res.ok) throw new Error(`Failed to fetch image: ${id}`);
            const blob = await res.blob();
            return { id, url: URL.createObjectURL(blob) };
          })
        );
        if (isMounted) {
          setImages(blobs);
          setLoading(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading images");
        setLoading(false);
      }
    };
    fetchImages();
    return () => {
      isMounted = false;
      blobsCleanup(images);
    };
  }, []);

  // Cleanup object URLs
  function blobsCleanup(imgs) {
    imgs.forEach((img) => {
      if (img.url) URL.revokeObjectURL(img.url);
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="min-h-screen p-4 bg-stone-900">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto gap-4"
        columnClassName="masonry-column"
      >
        {images.map((img) => (
          <div key={img.id} className="mb-4 rounded-lg overflow-hidden shadow">
            <img
              src={img.url}
              alt={img.id}
              className="w-full h-auto object-contain bg-white"
              loading="lazy"
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
}
