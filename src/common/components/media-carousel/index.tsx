import { FunctionalComponent } from "preact";

import styles from "./styles.module.css";

export const MediaCarousel: FunctionalComponent<{
  media: MediaAttachment[];
}> = (props) => {
  return (
    <div className={styles.carousel}>
      {props.media.map((media) => {
        if (media.type === "image") {
          const text = media.description ?? "media without description";
          return (
            <img
              className={[
                styles.image,
                media.description ? "" : styles["no-description"],
              ].join(" ")}
              src={media.preview_url}
              alt={text}
              title={text}
            />
          );
        } else if (media.type === "video") {
          return (
            <video
              controls
              allowFullScreen
              className={[
                styles.video,
                media.description ? "" : styles["no-description"],
              ].join(" ")}
              src={media.url}
              poster={media.preview_url}
            >
              {media.description}
              {media.remote_url && (
                <a href={media.remote_url} alt={""}>
                  Download Video
                </a>
              )}
            </video>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};
