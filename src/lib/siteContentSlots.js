// Danh sách vị trí ảnh/video trên trang chủ có thể chỉnh sửa từ trang admin.
// key: field lưu trong Firestore doc siteContent/images (nếu không có thì dùng fallback).
export const SITE_CONTENT_SLOTS = [
  { key: 'hero', label: 'Ảnh banner trang chủ', type: 'image', fallback: '/images/bgr2.jpg' },
  { key: 'logoHeader', label: 'Logo (đầu trang)', type: 'image', fallback: '/images/logoltd1.png' },
  { key: 'logoFooter', label: 'Logo (chân trang)', type: 'image', fallback: '/images/logoltd2.png' },
  { key: 'fanpage', label: 'Ảnh Fanpage (chân trang)', type: 'image', fallback: '/images/fanpageltd.jpg' },
  { key: 'brandStory', label: 'Ảnh giới thiệu (Hành trình)', type: 'image', fallback: '/images/anh1_aoBlue.jpg' },
  { key: 'benefitsTeam', label: 'Ảnh tập thể (Lợi ích)', type: 'image', fallback: '/images/anhTapThe1.jpg' },
  { key: 'showcase1', label: 'Ảnh Showcase 1', type: 'image', fallback: '/images/phongkham7.jpg' },
  { key: 'showcase2', label: 'Ảnh Showcase 2', type: 'image', fallback: '/images/phongkham1.jpg' },
  { key: 'showcase3', label: 'Ảnh Showcase 3', type: 'image', fallback: '/images/phongkham6.jpg' },
  { key: 'showcase4', label: 'Ảnh Showcase 4', type: 'image', fallback: '/images/phongkham3.jpg' },
  { key: 'showcase5', label: 'Ảnh Showcase 5', type: 'image', fallback: '/images/phongkham4.jpg' },
  { key: 'showcaseVideo1', label: 'Video Showcase 1', type: 'video', fallback: '/videos/hienthivd1.mp4' },
  { key: 'showcaseVideoThumb1', label: 'Ảnh thumbnail Video 1', type: 'image', fallback: '/images/thumbnail-video1.jpg' },
  { key: 'showcaseVideo2', label: 'Video Showcase 2', type: 'video', fallback: '/videos/hienthivd2.mp4' },
  { key: 'showcaseVideoThumb2', label: 'Ảnh thumbnail Video 2', type: 'image', fallback: '/images/thumbnail-video2.jpg' },
  { key: 'showcaseVideo3', label: 'Video Showcase 3', type: 'video', fallback: '/videos/hienthivd3.mp4' },
  { key: 'showcaseVideoThumb3', label: 'Ảnh thumbnail Video 3', type: 'image', fallback: '/images/thumbnail-video3.jpg' },
  { key: 'showcaseVideo4', label: 'Video Showcase 4', type: 'video', fallback: '/videos/hienthivd4.mp4' },
  { key: 'showcaseVideoThumb4', label: 'Ảnh thumbnail Video 4', type: 'image', fallback: '/images/thumbnail-video4.jpg' },
];
