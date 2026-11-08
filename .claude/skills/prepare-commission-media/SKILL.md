---
name: prepare-commission-media
description: Turn user-supplied photos and phone reels (jpg/heic/mp4) into web-ready, privacy-safe Jamcraft assets (WebP images, 720p faststart MP4 + poster) under jamcraft-app/public/assets/. Use when adding a commission, case study, or any photo/video the user uploads or wants pulled from Instagram/TikTok.
---

# Prepare commission media

## 1. Get the source files
- Instagram/TikTok redirect the sandbox to a login wall (302) or 429. Do not burn searches on it.
- Try: Gmail (`from:mail.instagram.com`, client name) for handles; itch.io pages for links/copy.
- Then ask the user to upload the clip. Uploads land in `/root/.claude/uploads/<session>/`.

## 2. Look before you encode
```bash
ffprobe -v error -show_entries format=duration,size:stream=codec_name,width,height -of compact IN.mp4
ffmpeg -v error -y -i IN.mp4 -vf "fps=0.5,scale=270:-2,tile=5x1" -frames:v 1 contact.jpg   # Read it
```

## 3. Encode (strip metadata — phone video can carry GPS)
```bash
A=jamcraft-app/public/assets/commissions
ffmpeg -v error -y -i IN.mp4 -map_metadata -1 -vf "scale=720:-2,fps=30" -c:v libx264 -crf 27 \
  -preset slow -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k $A/NAME-reel.mp4      # ~1.5MB / 10s
ffmpeg -v error -y -ss 4 -i IN.mp4 -frames:v 1 -vf scale=720:-2 -c:v libwebp -quality 72 $A/NAME-reel-poster.webp
python3 -I -c "from PIL import Image; im=Image.open('IN.jpg').convert('RGB'); im.thumbnail((1200,1200)); im.save('$A/NAME.webp','WEBP',quality=72); print(im.size)"
```
Pillow's WebP save drops EXIF. Record the printed size as the hero `width`/`height`.

## 4. Wire it up
- Data: `src/commissions/data/commissions-data.ts` (paths `/assets/commissions/...`).
- Alt text and captions must not start with `Word:` (`data-urls.test.ts` reads that as a URL scheme).
- Video: `controls playsInline preload="none"`, poster, no autoplay. CSP `default-src 'self'` already allows it.
- Verify with `validate-jamcraft-site`: play the video under the real headers (`v.play()` → `currentTime > 0`).
