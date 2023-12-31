import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";

import styles from "./styles.module.css";

export const MediaCarousel: FunctionalComponent<{
  media: MediaAttachment[];
}> = (props) => {
  const [imagePreview, setImagePreview] = useState<MediaAttachment>();

  return (
    <div className={styles.carousel}>
      {props.media.map((media) => {
        if (media.type === "image") {
          const text = media.description ?? "media without description";
          return (
            <img
              key={media.id}
              onClick={() => setImagePreview(media)}
              className={[
                styles.image,
                media.description ? "" : styles.noDescription,
              ].join(" ")}
              src={media.preview_url}
              alt={text}
              title={text}
            />
          );
        }

        if (media.type === "video" || media.type === "gifv") {
          return (
            <video
              key={media.id}
              controls
              allowFullScreen
              className={[
                styles.video,
                media.description ? "" : styles.noDescription,
              ].join(" ")}
              src={media.url}
              poster={media.preview_url}
            >
              {media.description}
              {media.remote_url && (
                <a href={media.remote_url}>Download Video</a>
              )}
            </video>
          );
        }

        if (media.type === "audio") {
          return (
            <audio key={media.id} controls src={media.url}>
              {media.description}
              {media.remote_url && (
                <a href={media.remote_url}>Download Audio</a>
              )}
            </audio>
          );
        }
      })}
      {imagePreview && (
        <div
          onClick={() => setImagePreview(undefined)}
          className={styles.backdrop}
        >
          <img
            alt={imagePreview.description ?? "image"}
            src={imagePreview.preview_url}
          />
        </div>
      )}
    </div>
  );
};
